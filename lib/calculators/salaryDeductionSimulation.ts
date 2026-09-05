import { z } from "zod";

const money = z.number().finite().int().min(0).max(10_000_000_000);
export const salaryDeductionSchema = z.object({
  payBasis: z.enum(["annual", "monthly"]),
  grossPay: money.positive(),
  annualBonusIncluded: money,
  annualRetirementIncluded: money,
  nonTaxableMeal: money.max(200_000),
  pension: money,
  health: money,
  longTermCare: money,
  employment: money,
  incomeTaxAt100: money,
  withholdingPercent: z.union([z.literal(80), z.literal(100), z.literal(120)]),
});
export type SalaryDeductionInput = z.infer<typeof salaryDeductionSchema>;

/** Manual amounts only: never substitutes an estimated tax bracket for the official table. */
export function calculateSalaryDeductions(raw: SalaryDeductionInput) {
  const input = salaryDeductionSchema.parse(raw);
  if (input.payBasis === "monthly" && (input.annualBonusIncluded || input.annualRetirementIncluded)) {
    throw new Error("월급 입력 시 연간 상여·퇴직금 포함액은 0으로 입력하세요.");
  }
  const regularAnnual = input.payBasis === "annual"
    ? input.grossPay - input.annualBonusIncluded - input.annualRetirementIncluded
    : input.grossPay * 12;
  if (regularAnnual <= 0) throw new Error("상여·퇴직금 제외 후 정기급여가 0원보다 커야 합니다.");
  const monthlyGross = Math.floor(regularAnnual / 12);
  if (input.nonTaxableMeal > monthlyGross) throw new Error("비과세 식대가 월 세전 급여보다 클 수 없습니다.");
  const insurance = input.pension + input.health + input.longTermCare + input.employment;
  const incomeTax = Math.floor(input.incomeTaxAt100 * input.withholdingPercent / 100 / 10) * 10;
  const localIncomeTax = Math.floor(incomeTax / 100) * 10;
  const totalDeduction = insurance + incomeTax + localIncomeTax;
  if (totalDeduction > monthlyGross) throw new Error("공제 합계가 월 세전 급여보다 큽니다. 입력 단위를 확인하세요.");
  const monthlyNet = monthlyGross - totalDeduction;
  return { monthlyGross, taxableMonthly: monthlyGross - input.nonTaxableMeal,
    insurance, incomeTax, localIncomeTax, totalDeduction, monthlyNet,
    annualNet: monthlyNet * 12 };
}
