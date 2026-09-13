import { PHASE_2_REVIEW_DATE, type SourceReference } from "./sourceReferences";

export const RENT_CONVERSION_REFERENCE: SourceReference = {
  effectiveDate: "2026-09-02",
  lastReviewedAt: PHASE_2_REVIEW_DATE,
  sourceName: "국가법령정보센터·주택임대차보호법 제7조의2",
  sourceUrl: "https://www.law.go.kr/DRF/lawService.do?ID=326837&OC=unicpla&mobileYn=Y&target=expc&type=HTML",
  scope: "사용자가 직접 입력한 연 전환율을 이용한 단순 환산",
  excludedConditions: ["법정 상한 자동 판정", "관리비", "계약 특약", "세금", "중개보수"],
  notes: "기본 전환율을 제공하지 않으며 실제 계약 및 최신 법정 상한은 별도로 확인해야 합니다.",
};

