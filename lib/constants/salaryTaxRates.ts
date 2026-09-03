import type { SourceReference } from "./sourceReferences";

export const SALARY_REFERENCE: SourceReference = {
  effectiveDate: "2026.2.27 개정 간이세액표",
  lastReviewedAt: "2026-09-03",
  sourceName: "소득세법 시행령 별표2·국세청 근로소득 원천징수 안내",
  sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583",
  scope: "확인한 공제액으로 정기급여를 비교하는 보조 계산",
  excludedConditions: ["월 과세급여 1천만원 이상 자동 조회", "연말정산", "사업장별 고지액", "상여·성과급", "중도 입·퇴사"],
  notes: "간이세액표는 월 과세급여 1천만원 미만·가족 1~11명만 자동 조회합니다. 보험료는 직접 입력합니다. 원천징수 비율은 80/100/120%로 비교하며 지방소득세는 소득세의 10%를 단순 적용합니다.",
};

export const SALARY_CALCULATION_ENABLED = false;
