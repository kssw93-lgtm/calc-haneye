import { type SourceReference } from "./sourceReferences";

export interface BrokerageRateBand { maxExclusive: number; rate: number; cap?: number }

// 서울·경기·인천 공식 주택 요율표의 모든 구간을 대조했습니다.
// 세 지역의 숫자가 같다는 뜻이며, 전국 공통 요율로 일반화하지 않습니다.
export const SEOUL_BROKERAGE_RATES: Record<"sale" | "lease", readonly BrokerageRateBand[]> = {
  sale: [
    { maxExclusive: 50_000_000, rate: 0.006, cap: 250_000 },
    { maxExclusive: 200_000_000, rate: 0.005, cap: 800_000 },
    { maxExclusive: 900_000_000, rate: 0.004 },
    { maxExclusive: 1_200_000_000, rate: 0.005 },
    { maxExclusive: 1_500_000_000, rate: 0.006 },
    { maxExclusive: Number.POSITIVE_INFINITY, rate: 0.007 },
  ],
  lease: [
    { maxExclusive: 50_000_000, rate: 0.005, cap: 200_000 },
    { maxExclusive: 100_000_000, rate: 0.004, cap: 300_000 },
    { maxExclusive: 600_000_000, rate: 0.003 },
    { maxExclusive: 1_200_000_000, rate: 0.004 },
    { maxExclusive: 1_500_000_000, rate: 0.005 },
    { maxExclusive: Number.POSITIVE_INFINITY, rate: 0.006 },
  ],
};

export const BROKERAGE_REFERENCE: SourceReference = {
  effectiveDate: "지역별 공식 안내 참조",
  lastReviewedAt: "2026-09-03",
  sourceName: "서울특별시 부동산 중개보수 안내 (경기·인천 출처는 아래 지역 안내)",
  sourceUrl: "https://land.seoul.go.kr/land/broker/brokerageCommission.do",
  scope: "서울·경기·인천 중개사무소의 주택 매매·교환·전세·월세 중개보수 상한액",
  excludedConditions: ["서울·경기·인천 외 지역", "주택 외 부동산", "오피스텔", "부가가치세 자동 합산"],
  notes: "실제 보수는 상한 이내에서 협의하며 중개사무소 소재지 관할 조례를 확인해야 합니다.",
};
