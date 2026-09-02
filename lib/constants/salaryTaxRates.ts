import { PHASE_2_REVIEW_DATE, type SourceReference } from "./sourceReferences";

export const SALARY_REFERENCE: SourceReference = {
  effectiveDate: "2026-07-01",
  lastReviewedAt: PHASE_2_REVIEW_DATE,
  sourceName: "국민연금공단·국민건강보험공단 2026년 보험료 안내",
  sourceUrl: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do",
  scope: "2026년 사회보험 공제 참고 정보",
  excludedConditions: ["근로소득 간이세액표", "연말정산", "사업장별 고지액", "상여·성과급", "중도 입·퇴사"],
  notes: "소득세·지방소득세 간이세액표를 완전 재현하지 않아 실수령액 수치 계산은 비활성 상태입니다.",
};

export const SALARY_CALCULATION_ENABLED = false;

