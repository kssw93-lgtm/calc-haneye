import { describe, expect, it } from "vitest";
import { calculateSalaryNetPay } from "@/lib/calculators/salaryNetPay";
describe("calculateSalaryNetPay", () => {
  it("공식 기준 검토 전에는 안전하게 비활성 상태를 반환한다", () => expect(calculateSalaryNetPay({ payBasis: "annual", grossPay: 48_000_000, dependents: 1, childrenUnder20: 0, nonTaxableMeal: 0 })).toMatchObject({ enabled: false, monthlyGross: 4_000_000 }));
  it("잘못된 금액을 거부한다", () => expect(() => calculateSalaryNetPay({ payBasis: "annual", grossPay: 0, dependents: 1, childrenUnder20: 0, nonTaxableMeal: 0 })).toThrow());
});
