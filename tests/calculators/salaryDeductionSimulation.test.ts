import { describe, expect, it } from "vitest";
import { calculateSalaryDeductions, type SalaryDeductionInput } from "@/lib/calculators/salaryDeductionSimulation";
const base: SalaryDeductionInput = { payBasis: "annual", grossPay: 48_000_000, annualBonusIncluded: 0, annualRetirementIncluded: 0, nonTaxableMeal: 200_000, pension: 180_000, health: 140_000, longTermCare: 18_000, employment: 36_000, incomeTaxAt100: 100_000, withholdingPercent: 100 };
describe("공제액 직접 입력 시뮬레이션", () => {
  it("월·연 결과와 공제 합계가 일치한다", () => expect(calculateSalaryDeductions(base)).toMatchObject({ monthlyGross: 4_000_000, insurance: 374_000, incomeTax: 100_000, localIncomeTax: 10_000, monthlyNet: 3_516_000, annualNet: 42_192_000 }));
  it.each([80, 100, 120] as const)("%s%% 세액을 적용한다", (withholdingPercent) => expect(calculateSalaryDeductions({ ...base, withholdingPercent }).incomeTax).toBe(withholdingPercent * 1000));
  it("연봉 속 비정기 지급분을 정기급여에서 분리한다", () => expect(calculateSalaryDeductions({ ...base, annualBonusIncluded: 3_000_000, annualRetirementIncluded: 3_000_000 }).monthlyGross).toBe(3_500_000));
  it("동일한 월급과 연봉 입력이 일치한다", () => expect(calculateSalaryDeductions({ ...base, payBasis: "monthly", grossPay: 4_000_000 })).toEqual(calculateSalaryDeductions(base)));
  it.each([{ grossPay: NaN }, { grossPay: Infinity }, { pension: -1 }, { nonTaxableMeal: 200_001 }, { pension: 5_000_000 }, { grossPay: 1.5 }, { annualBonusIncluded: 48_000_000 }])("잘못된 입력을 거부한다 %j", (change) => expect(() => calculateSalaryDeductions({ ...base, ...change })).toThrow());
  it("월급 입력에서 연간 상여 차감을 막는다", () => expect(() => calculateSalaryDeductions({ ...base, payBasis: "monthly", annualBonusIncluded: 1 })).toThrow());
});
