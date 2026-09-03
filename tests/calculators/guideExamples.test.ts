import { describe, expect, it } from "vitest";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";
import { calculators } from "@/lib/constants/calculatorMetadata";
describe("추가 가이드 내용·산식 검증", () => {
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
