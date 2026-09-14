import { describe, expect, it } from "vitest";
import { calculateUnemploymentBenefit } from "@/lib/calculators/unemploymentBenefit";
describe("2026 구직급여 모의계산", () => {
  it("8시간 근로자의 2026년 하한액을 적용한다", () => { const value = calculateUnemploymentBenefit({ averageMonthlyWage: 2_000_000, dailyHours: 8, insuredPeriod: "under1", olderOrDisabled: false }); expect(value.dailyBenefit).toBe(66_048); expect(value.benefitDays).toBe(120); });
  it("상한액 68,100원을 적용한다", () => { const value = calculateUnemploymentBenefit({ averageMonthlyWage: 5_000_000, dailyHours: 8, insuredPeriod: "over10", olderOrDisabled: false }); expect(value.dailyBenefit).toBe(68_100); expect(value.benefitDays).toBe(240); });
  it("50세 이상·장애인 지급일수 구간을 적용한다", () => { const value = calculateUnemploymentBenefit({ averageMonthlyWage: 3_000_000, dailyHours: 4, insuredPeriod: "3to5", olderOrDisabled: true }); expect(value.benefitDays).toBe(210); });
  it("잘못된 시간을 거부한다", () => { expect(() => calculateUnemploymentBenefit({ averageMonthlyWage: 3_000_000, dailyHours: 9, insuredPeriod: "1to3", olderOrDisabled: false })).toThrow(); });
});
