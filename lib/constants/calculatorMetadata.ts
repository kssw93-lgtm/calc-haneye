export type CalculatorCategory = "finance" | "salary-work" | "property-tax";

export interface CalculatorMeta {
  slug: string;
  href: string;
  guideHref: string;
  category: CalculatorCategory;
  icon: "loan" | "severance" | "acquisition-tax" | "salary" | "weekly-pay" | "savings" | "brokerage" | "rent";
  title: string;
  shortDescription: string;
  supportScope: string;
}

export const calculators: CalculatorMeta[] = [
  {
    slug: "loan-interest",
    href: "/calculators/loan-interest",
    guideHref: "/guides/loan-interest-guide",
    category: "finance",
    icon: "loan",
    title: "대출 이자 계산기",
    shortDescription:
      "대출 원금, 금리, 기간, 상환 방식을 입력해 월 예상 납입액과 총 이자를 확인하세요.",
    supportScope: "원리금균등·원금균등·만기일시상환 기준의 참고용 예상 계산",
  },
  {
    slug: "severance-pay",
    href: "/calculators/severance-pay",
    guideHref: "/guides/severance-pay-guide",
    category: "salary-work",
    icon: "severance",
    title: "퇴직금 계산기",
    shortDescription:
      "입사일, 퇴사일, 최근 3개월 임금 정보를 바탕으로 예상 퇴직금을 확인하세요.",
    supportScope: "평균임금 기준 단순 참고용 예상 계산",
  },
  {
    slug: "home-acquisition-tax",
    href: "/calculators/home-acquisition-tax",
    guideHref: "/guides/home-acquisition-tax-guide",
    category: "property-tax",
    icon: "acquisition-tax",
    title: "주택 취득세 계산기",
    shortDescription:
      "일반 1주택을 유상 취득하는 경우의 기본 취득세를 참고용으로 계산합니다.",
    supportScope: "개인·유상취득·일반 1주택·감면 미적용 조건의 기본 취득세만 지원",
  },
  {
    slug: "salary-net-pay", href: "/calculators/salary-net-pay", guideHref: "/guides/salary-net-pay-guide", category: "salary-work", icon: "salary", title: "연봉 실수령액 계산기", shortDescription: "확인한 월 공제액을 직접 입력해 정기급여 실수령액과 원천징수 비율을 비교하세요.", supportScope: "공제액 직접 입력 · 세액표 및 보험료 자동 산정 미제공",
  },
  {
    slug: "weekly-holiday-pay", href: "/calculators/weekly-holiday-pay", guideHref: "/guides/weekly-holiday-pay-guide", category: "salary-work", icon: "weekly-pay", title: "주휴수당 계산기", shortDescription: "시급, 주 소정근로시간, 근무일수와 개근 여부로 주·월 예상액을 확인하세요.", supportScope: "시간급 근로자의 단순 참고 계산",
  },
  {
    slug: "savings-interest", href: "/calculators/savings-interest", guideHref: "/guides/savings-interest-guide", category: "finance", icon: "savings", title: "예·적금 이자 계산기", shortDescription: "예금·적금의 세전 이자와 일반과세 기준 세후 예상액을 확인하세요.", supportScope: "고정금리·일반과세·월말 납입 가정",
  },
  {
    slug: "real-estate-brokerage-fee", href: "/calculators/real-estate-brokerage-fee", guideHref: "/guides/real-estate-brokerage-fee-guide", category: "property-tax", icon: "brokerage", title: "부동산 중개보수 계산기", shortDescription: "서울 소재 주택 거래의 중개보수 상한액을 참고용으로 확인하세요.", supportScope: "서울·주택·상한요율 기준, 부가세 별도",
  },
  {
    slug: "monthly-rent-conversion", href: "/calculators/monthly-rent-conversion", guideHref: "/guides/monthly-rent-conversion-guide", category: "property-tax", icon: "rent", title: "월세 전환 계산기", shortDescription: "사용자가 입력한 전환율로 보증금과 월세의 단순 환산액을 확인하세요.", supportScope: "사용자 입력 전환율 기반 단순 계산",
  },
];

export function getCalculatorsByCategory(
  category: CalculatorCategory
): CalculatorMeta[] {
  return calculators.filter((item) => item.category === category);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculators.find((item) => item.slug === slug);
}
