import { describe, expect, it } from "vitest";
import { calculateSocialInsurance } from "@/lib/calculators/socialInsurance";

describe("2026년 4대보험 근로자 부담액", () => {
  it("월 300만원의 보험료를 보험별로 계산한다", () => {
    const result = calculateSocialInsurance({ monthlyInsurableWage: 3_000_000, pensionPeriod: "second-half" });
    expect(result.nationalPension).toBe(142_500);
    expect(result.healthInsurance).toBe(107_850);
    expect(result.longTermCare).toBe(14_170);
    expect(result.employmentInsurance).toBe(27_000);
    expect(result.employeeTotal).toBe(291_520);
  });

  it("상반기 국민연금 상한 637만원을 적용한다", () => {
    expect(calculateSocialInsurance({ monthlyInsurableWage: 8_000_000, pensionPeriod: "first-half" }).pensionBase).toBe(6_370_000);
  });

  it("하반기 국민연금 상한 659만원을 적용한다", () => {
    expect(calculateSocialInsurance({ monthlyInsurableWage: 8_000_000, pensionPeriod: "second-half" }).pensionBase).toBe(6_590_000);
  });

  it("0 이하 보수는 거부한다", () => {
    expect(() => calculateSocialInsurance({ monthlyInsurableWage: 0, pensionPeriod: "second-half" })).toThrow();
  });
});
