import { describe, expect, it } from "vitest";
import { calculateMonthlyRentConversion } from "@/lib/calculators/monthlyRentConversion";

describe("calculateMonthlyRentConversion", () => {
  it("보증금 감소를 월세로 환산한다", () => expect(calculateMonthlyRentConversion({ direction: "depositToRent", amount: 10_000_000, annualRatePercent: 6, contractMonths: 12 })).toEqual({ convertedAmount: 50_000, contractTotal: 600_000 }));
  it("월세 감소를 보증금으로 환산한다", () => expect(calculateMonthlyRentConversion({ direction: "rentToDeposit", amount: 50_000, annualRatePercent: 6, contractMonths: 12 }).convertedAmount).toBe(10_000_000));
  it("0% 역산은 수치를 내지 않는다", () => expect(calculateMonthlyRentConversion({ direction: "rentToDeposit", amount: 50_000, annualRatePercent: 0, contractMonths: 12 }).convertedAmount).toBeNull());
  it("잘못된 입력을 거부한다", () => expect(() => calculateMonthlyRentConversion({ direction: "depositToRent", amount: 0, annualRatePercent: 6, contractMonths: 12 })).toThrow());
});
