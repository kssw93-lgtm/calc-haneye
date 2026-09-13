import { SALARY_CALCULATION_ENABLED } from "@/lib/constants/salaryTaxRates";

export interface SalaryNetPayInput { payBasis: "annual" | "monthly"; grossPay: number; dependents: number; childrenUnder20: number; nonTaxableMeal: number }
export interface SalaryNetPayResult { enabled: false; monthlyGross: number; reason: string }

export function calculateSalaryNetPay(input: SalaryNetPayInput): SalaryNetPayResult {
  if (!Number.isFinite(input.grossPay) || input.grossPay <= 0 || input.dependents < 1 || input.childrenUnder20 < 0 || input.nonTaxableMeal < 0) throw new Error("유효하지 않은 입력값입니다.");
  if (SALARY_CALCULATION_ENABLED) throw new Error("활성화된 급여 계산 구현이 필요합니다.");
  return { enabled: false, monthlyGross: input.payBasis === "annual" ? Math.round(input.grossPay / 12) : Math.round(input.grossPay), reason: "2026년 근로소득 간이세액표와 보험료 상·하한의 공식 대조가 완료되지 않아 실수령액 수치 계산을 제공하지 않습니다." };
}
