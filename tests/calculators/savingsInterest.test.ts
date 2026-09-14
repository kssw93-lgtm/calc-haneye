import { describe, expect, it } from "vitest";
import { calculateSavingsInterest } from "@/lib/calculators/savingsInterest";

describe("calculateSavingsInterest", () => {
  it("예금 단리를 계산한다", () => expect(calculateSavingsInterest({ product: "deposit", principal: 10_000_000, annualRatePercent: 3, termMonths: 12, method: "simple", taxType: "general" })).toMatchObject({ totalPrincipal: 10_000_000, grossInterest: 300_000, estimatedTax: 46_200, maturityAmount: 10_253_800 }));
  it("예금 월복리를 계산한다", () => expect(calculateSavingsInterest({ product: "deposit", principal: 1_000_000, annualRatePercent: 6, termMonths: 12, method: "compound", taxType: "general" }).grossInterest).toBeGreaterThan(60_000));
  it("적금 단리를 계산한다", () => expect(calculateSavingsInterest({ product: "installment", principal: 100_000, annualRatePercent: 6, termMonths: 12, method: "simple", taxType: "general" }).totalPrincipal).toBe(1_200_000));
  it("적금 월복리를 계산한다", () => expect(calculateSavingsInterest({ product: "installment", principal: 100_000, annualRatePercent: 6, termMonths: 12, method: "compound", taxType: "general" }).grossInterest).toBeGreaterThan(0));
  it("비과세 선택은 세후 수치를 내지 않는다", () => expect(calculateSavingsInterest({ product: "deposit", principal: 1_000_000, annualRatePercent: 3, termMonths: 12, method: "simple", taxType: "special" }).maturityAmount).toBeNull());
  it("잘못된 입력을 거부한다", () => expect(() => calculateSavingsInterest({ product: "deposit", principal: -1, annualRatePercent: 3, termMonths: 12, method: "simple", taxType: "general" })).toThrow());
});
