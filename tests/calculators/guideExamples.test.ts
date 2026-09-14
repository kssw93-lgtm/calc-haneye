import { describe, expect, it } from "vitest";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { getGeneralOneHomeAcquisitionTaxRate } from "@/lib/constants/taxRates";
import { lookupWithholdingTax } from "@/lib/calculators/withholdingTax";
import { calculateLoanInterest } from "@/lib/calculators/loanInterest";
describe("추가 가이드 내용·산식 검증", () => {
  it("가족·자녀 예시가 공식 세액표 조회와 일치한다", () => {
    expect(lookupWithholdingTax(3_000_000, 1, 0)).toBe(74_350);
    expect(lookupWithholdingTax(3_000_000, 2, 0)).toBe(56_850);
    expect(lookupWithholdingTax(3_000_000, 2, 1)).toBe(36_020);
  });
  it("금리 0.5%p 및 관리비 비교 산식을 검산한다", () => {
    const loan = (rate: number) => calculateLoanInterest({principal:100_000_000,annualRatePercent:rate,termMonths:12,repaymentMethod:"bulletPayment"});
    expect(loan(4.5).totalInterest - loan(4).totalInterest).toBe(500_000);
    expect(Math.round(100_000_000 * .005 / 12 * 6.5)).toBe(270_833);
    expect((500_000+150_000)-(550_000+50_000)).toBe(50_000);
    expect(50_000*24).toBe(1_200_000);
    expect(Math.round(10_000_000*.04/12)).toBe(33_333);
    expect(Math.round(50_000-10_000_000*.04/12)).toBe(16_667);
  });
  it("취득세 세 가격 예시를 실제 세율 함수로 검산한다", () => {
    for (const [price, tax] of [[600_000_000,6_000_000],[750_000_000,15_000_000],[900_000_000,27_000_000]] as const) {
      expect(price * getGeneralOneHomeAcquisitionTaxRate(price)).toBe(tax);
    }
    expect(500_000_000-50_000_000-100_000_000).toBe(350_000_000);
  });
  it("원금균등 기간별 예시를 잔액 합계로 독립 검산한다", () => {
    for (const [months,total,first] of [[12,390_000,1_060_000],[24,750_000,560_000]] as const) {
      const principal = 12_000_000;
      expect(Array.from({length:months},(_,i)=>(principal-principal/months*i)*.06/12).reduce((a,b)=>a+b,0)).toBe(total);
      expect(principal/months+principal*.06/12).toBe(first);
    }
  });
  it("slug가 고유하고 계산기 연결이 존재한다", () => {
    expect(new Set(supplementalGuides.map(item => item.slug)).size).toBe(supplementalGuides.length);
    supplementalGuides.forEach(item => {
      expect(calculators.some(calc => calc.slug === item.calculator)).toBe(true);
      expect(item.sections.length).toBeGreaterThanOrEqual(3);
      expect(item.sources.every(source => source.url.startsWith("https://"))).toBe(true);
    });
  });
  it("월세 환산과 역산 예시를 검산한다", () => {
    expect(10_000_000 * .03 / 12).toBe(25_000);
    expect(10_000_000 * .06 / 12).toBe(50_000);
    expect(100_000 * 12 / .04).toBe(30_000_000);
    expect(100_000 * 12 / .06).toBe(20_000_000);
  });
  it("월복리와 중개보수 사례를 검산한다", () => {
    expect(Math.round(10_000_000 * ((1 + .03 / 12) ** 12 - 1))).toBe(304_160);
    expect(500_000_000 * .004).toBe(2_000_000);
    expect(500_000_000 * .003).toBe(1_500_000);
  });
});
