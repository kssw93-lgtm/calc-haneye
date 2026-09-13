export type NewsArticle = {
  slug: string;
  title: string;
  category: "금융" | "정책" | "세금·부동산";
  date: string;
  summary: string;
  body: string[];
  sourceName: string;
  sourceUrl: string;
};

export const newsArticles: NewsArticle[] = [
  { slug: "bank-rate-and-household-finance", title: "가계 금융 흐름을 읽을 때 확인할 주요 지표", category: "금융", date: "2026-09-13", summary: "금리와 물가, 가계대출 통계를 함께 확인해야 하는 이유를 정리했습니다.", body: ["금융 관련 통계를 볼 때는 하나의 숫자만으로 상황을 판단하기보다 금리·물가·가계대출처럼 서로 영향을 주고받는 지표를 함께 확인해야 합니다.", "이 글은 공개된 통계의 의미와 확인 순서를 설명하는 정보 안내이며 특정 금융상품이나 투자 행동을 권유하지 않습니다."], sourceName: "한국은행 경제통계시스템", sourceUrl: "https://ecos.bok.or.kr/" },
  { slug: "welfare-policy-checklist", title: "복지정책 발표를 확인할 때 놓치기 쉬운 항목", category: "정책", date: "2026-09-12", summary: "지원 대상과 신청 기간을 확인할 때 공식 공고에서 봐야 할 항목을 정리했습니다.", body: ["복지정책은 발표일과 실제 시행일이 다를 수 있습니다. 대상 기준, 소득·재산 요건, 신청 기간, 담당 기관을 공고문에서 각각 확인해야 합니다.", "정책 내용은 변경될 수 있으므로 신청 전에는 반드시 원문 공고와 담당 기관의 최신 안내를 확인하세요."], sourceName: "정부24 정책정보", sourceUrl: "https://www.gov.kr/" },
  { slug: "housing-tax-notice", title: "주택 관련 세금 공고를 읽는 기본 순서", category: "세금·부동산", date: "2026-09-11", summary: "주택 취득과 보유 과정에서 세금 공고의 적용 시점을 확인하는 방법입니다.", body: ["주택 세금은 거래 유형, 주택 수, 취득 시점과 지역에 따라 적용 기준이 달라질 수 있습니다. 공고의 시행일과 적용 대상을 먼저 확인해야 합니다.", "계산 결과는 참고용 예상치이며 최종 세액은 관할 지방자치단체와 세무 전문가의 확인이 필요합니다."], sourceName: "국가법령정보센터", sourceUrl: "https://www.law.go.kr/" },
];

export function getNewsArticle(slug: string) { return newsArticles.find((article) => article.slug === slug); }
