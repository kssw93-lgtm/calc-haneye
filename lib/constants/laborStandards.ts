import { PHASE_2_REVIEW_DATE, type SourceReference } from "./sourceReferences";

export const MONTHLY_WEEKS = 4.345;
export const WEEKLY_HOLIDAY_MIN_HOURS = 15;

export const LABOR_STANDARDS_REFERENCE: SourceReference = {
  effectiveDate: "2026-01-01",
  lastReviewedAt: PHASE_2_REVIEW_DATE,
  sourceName: "고용노동부 1350·근로기준법 제18조 및 제55조",
  sourceUrl: "https://1350.moel.go.kr/rtmview.do?id=1000317194&page=2&type=ALL",
  scope: "시간급 근로자의 입력값 기반 단순 주휴수당 예상",
  excludedConditions: ["불규칙 근무", "연장·야간·휴일 가산수당", "감시·단속적 근로자 등 적용 예외"],
  notes: "4주 평균 주 소정근로시간과 개근 여부 등 실제 계약 조건에 따라 달라질 수 있습니다.",
};

