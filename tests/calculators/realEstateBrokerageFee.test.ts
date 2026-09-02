import { describe, expect, it } from "vitest";
import { calculateBrokerageFee } from "@/lib/calculators/realEstateBrokerageFee";

describe("calculateBrokerageFee", () => {
  it("서울 주택 매매 상한을 계산한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "sale", amount: 500_000_000 })).toMatchObject({ supported: true, rate: 0.004, maximumFee: 2_000_000, vatIncluded: false }));
  it("서울 전세 상한을 계산한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "jeonse", amount: 300_000_000 }).maximumFee).toBe(900_000));
  it("월세 거래금액 70배 규칙을 적용한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "monthlyRent", deposit: 10_000_000, monthlyRent: 300_000 }).transactionAmount).toBe(31_000_000));
  it("미지원 지역은 수치를 내지 않는다", () => expect(calculateBrokerageFee({ region: "unsupported", propertyType: "housing", transaction: "sale", amount: 500_000_000 }).supported).toBe(false));
  it("주택 외 부동산은 지원하지 않는다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "other", transaction: "sale", amount: 500_000_000 }).supported).toBe(false));
});
