import { PHASE_2_REVIEW_DATE, type SourceReference } from "./sourceReferences";

export const GENERAL_INTEREST_INCOME_TAX_RATE = 0.154;

export const SAVINGS_INTEREST_REFERENCE: SourceReference = {
  effectiveDate: "2026-09-02",
  lastReviewedAt: PHASE_2_REVIEW_DATE,
  sourceName: "국세청 국세법령정보시스템·소득세법 제129조",
  sourceUrl: "https://taxlaw.nts.go.kr/qt/USEQTA002P.do?ntstDcmId=010000000000146384",
  scope: "일반과세 이자소득세 14%와 지방소득세를 포함한 15.4% 단순 예상",
  excludedConditions: ["비과세종합저축", "세금우대 상품", "중도해지", "우대금리", "금융기관별 일수 계산"],
  notes: "적금은 매월 말 납입 가정이며 실제 상품 약관과 다를 수 있습니다.",
};

