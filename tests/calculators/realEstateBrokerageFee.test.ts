import { describe, expect, it } from "vitest";
import { calculateBrokerageFee } from "@/lib/calculators/realEstateBrokerageFee";

describe("calculateBrokerageFee", () => {
  for (const region of ["seoul", "gyeonggi", "incheon"] as const) {
    it(`${region} 구간 경계·한도액·월세 환산 검증`, () => {
      for (const [amount,rate,fee] of [[49_999_999,.006,250_000],[50_000_000,.005,250_000],[199_999_999,.005,800_000],[200_000_000,.004,800_000],[900_000_000,.005,4_500_000],[1_200_000_000,.006,7_200_000],[1_500_000_000,.007,10_500_000]]) {
        expect(calculateBrokerageFee({region,propertyType:"housing",transaction:"sale",amount})).toMatchObject({rate,maximumFee:fee});
      }
      for (const [amount,rate,fee] of [[49_999_999,.005,200_000],[50_000_000,.004,200_000],[99_999_999,.004,300_000],[100_000_000,.003,300_000],[600_000_000,.004,2_400_000],[1_200_000_000,.005,6_000_000],[1_500_000_000,.006,9_000_000]]) {
        expect(calculateBrokerageFee({region,propertyType:"housing",transaction:"jeonse",amount})).toMatchObject({rate,maximumFee:fee});
      }
      expect(calculateBrokerageFee({region,propertyType:"housing",transaction:"monthlyRent",deposit:5_000_000,monthlyRent:400_000})).toMatchObject({transactionAmount:33_000_000,maximumFee:165_000});
      expect(calculateBrokerageFee({region,propertyType:"housing",transaction:"monthlyRent",deposit:10_000_000,monthlyRent:400_000}).transactionAmount).toBe(50_000_000);
    });
  }
  it("서울 주택 매매 상한을 계산한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "sale", amount: 500_000_000 })).toMatchObject({ supported: true, rate: 0.004, maximumFee: 2_000_000, vatIncluded: false }));
  it("서울 전세 상한을 계산한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "jeonse", amount: 300_000_000 }).maximumFee).toBe(900_000));
  it("월세 거래금액 70배 규칙을 적용한다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "housing", transaction: "monthlyRent", deposit: 10_000_000, monthlyRent: 300_000 }).transactionAmount).toBe(31_000_000));
  it("미지원 지역은 수치를 내지 않는다", () => expect(calculateBrokerageFee({ region: "unsupported", propertyType: "housing", transaction: "sale", amount: 500_000_000 }).supported).toBe(false));
  it("주택 외 부동산은 지원하지 않는다", () => expect(calculateBrokerageFee({ region: "seoul", propertyType: "other", transaction: "sale", amount: 500_000_000 }).supported).toBe(false));
});
