import table from "@/lib/constants/withholdingTable2026.json";

/** 소득세법 시행령 별표2, 2026.2.27 개정. 정기 월급 1천만원 미만만 지원. */
export function lookupWithholdingTax(monthlyTaxable: number, familyCount: number, children: number): number {
  if (!Number.isSafeInteger(monthlyTaxable) || monthlyTaxable < 0 || monthlyTaxable >= 10_000_000) {
    throw new Error("세액표 자동 조회는 비과세 제외 월 급여 1천만원 미만만 지원합니다. 그 이상은 공제액 직접 입력을 선택하세요.");
  }
  if (!Number.isInteger(familyCount) || familyCount < 1 || familyCount > 11 || !Number.isInteger(children) || children < 0 || children >= familyCount) {
    throw new Error("공제대상가족은 본인 포함 1~11명이며 자녀 수는 본인을 제외한 가족 수 이하여야 합니다.");
  }
  if (monthlyTaxable < 770_000) return 0;
  const row = table.find(row => monthlyTaxable >= (row[0] ?? Infinity) * 1000 && monthlyTaxable < (row[1] ?? 0) * 1000);
  if (!row) throw new Error("대응하는 세액표 구간을 찾지 못했습니다. 직접 입력으로 확인하세요.");
  const baseTax = row[familyCount + 1];
  if (baseTax === undefined) throw new Error("가족 수에 대응하는 세액을 찾지 못했습니다.");
  const childDeduction = children === 0 ? 0 : children === 1 ? 20_830 : 45_830 + (children - 2) * 33_330;
  return Math.max(0, baseTax - childDeduction);
}
