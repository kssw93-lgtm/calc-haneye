import { describe, expect, it } from "vitest";
import { lookupWithholdingTax } from "@/lib/calculators/withholdingTax";
import table from "@/lib/constants/withholdingTable2026.json";
describe("2026 공식 간이세액표", () => {
  it("646개 급여 구간의 연속성과 11개 가족 열을 검증한다", () => {
    expect(table).toHaveLength(646);
    table.forEach((r, i) => {
      expect(r).toHaveLength(13);
      if (i) expect(table[i-1]![1]).toBe(r[0]);
      for (let f=1; f<=11; f++) {
        expect(lookupWithholdingTax(r[0]!*1000, f, 0)).toBe(r[f+1]);
        expect(lookupWithholdingTax(r[1]!*1000-1, f, 0)).toBe(r[f+1]);
      }
    });
  });
  it("원문 10쪽 표본과 자녀 공제, 음수 방지를 검산한다", () => {
    expect(lookupWithholdingTax(2_030_000,1,0)).toBe(20_490);
    expect(lookupWithholdingTax(2_040_000,2,0)).toBe(15_570);
    expect(lookupWithholdingTax(9_980_000,3,2)).toBe(1_198_650-45_830);
    expect(lookupWithholdingTax(9_980_000,4,3)).toBe(1_168_650-79_160);
    expect(lookupWithholdingTax(2_030_000,2,1)).toBe(0);
    expect(lookupWithholdingTax(760_000,1,0)).toBe(0);
  });
  it("검증 범위 밖 입력을 거부한다", () => {
    for (const [pay,f,c] of [[10_000_000,1,0],[-1,1,0],[3_000_000,0,0],[3_000_000,12,0],[3_000_000,1,1],[3_000_000,2,1.5]]) {
      expect(() => lookupWithholdingTax(pay!,f!,c!)).toThrow();
    }
  });
});
