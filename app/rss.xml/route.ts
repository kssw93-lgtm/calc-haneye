import { siteDescription, siteName, siteUrl } from "@/lib/constants/site";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";

export const dynamic = "force-static";

const items = [
  ["내집마련 디딤돌대출 확인 순서", "/policies/didimdol-home-loan", "무주택 실수요자의 디딤돌대출 신청 전 확인사항을 안내합니다."],
  ["보금자리론 조건과 확인사항", "/policies/bogeumjari-loan", "고정금리 정책모기지 보금자리론의 신청 전 확인사항을 안내합니다."],
  ["근로장려금 신청자격 확인 순서", "/policies/earned-income-tax-credit", "가구·소득·재산 기준과 정기·반기신청 확인사항을 안내합니다."],
  ["국민내일배움카드 신청과 지원내용", "/policies/national-learning-card", "직업훈련비 지원과 카드 발급·훈련신청 방법을 안내합니다."],
  ["청년전용 버팀목전세자금 확인사항", "/policies/youth-jeonse-loan", "청년 전세자금 정책대출의 신청 전 확인사항을 안내합니다."],
  ["신혼부부 전세자금대출 확인 순서", "/policies/newlywed-jeonse-loan", "신혼부부 전세자금의 대상과 신청 전 확인사항을 안내합니다."],
  ["전세보증금 반환보증 보증료 지원", "/policies/jeonse-guarantee-fee-support", "최대 40만원 보증료 지원과 지자체 예산 확인사항을 안내합니다."],
  ["청년 월세 지원 확인 방법", "/policies/youth-monthly-rent-support", "중앙정부와 지자체 청년 월세지원의 최신 모집 확인 방법을 안내합니다."],
  ["퇴직금 1년 기준", "/guides/severance-pay-one-year", "퇴직금의 계속근로기간 1년과 주 15시간 기준을 설명합니다."],
  ["대출 1억 이자 계산", "/guides/loan-100-million-interest", "1억 원 대출의 금리별 월 이자를 비교합니다."],
  ["예금 1천만원 이자 계산", "/guides/deposit-10-million-interest", "연 3% 일반과세 예금의 세전·세후 이자를 계산합니다."],
  ["전세 3억원 중개수수료", "/guides/jeonse-brokerage-fee", "서울 주택 전세 3억 원의 중개보수 상한을 계산합니다."],
  ["보증금 1천·월세 50 중개수수료", "/guides/monthly-rent-brokerage-fee", "월세 거래금액과 중개보수 상한 계산 과정을 설명합니다."],
  ["알바 근로계약서 작성법: 꼭 확인할 7가지", "/guides/part-time-employment-contract", "아르바이트 근로계약서에 적을 시급, 근무일, 휴게시간과 주휴일을 설명합니다."],
  ["급여명세서 보는 법", "/guides/payslip-reading-guide", "급여명세서의 지급 항목, 공제 항목과 실수령액을 대조하는 방법을 설명합니다."],
  ["주 20시간 주휴수당 계산", "/guides/weekly-holiday-pay-20-hours", "주 20시간·주 5일 근무를 가정한 시급별 주휴수당 예시와 적용 조건을 설명합니다."],
  ["표준근로계약서 양식 다운로드와 작성 방법", "/guides/employment-contract-template", "고용노동부 공식 표준근로계약서 HWP와 계약서 작성 전 필수 확인사항을 안내합니다."],
  ["대출 상환 방식, 무엇이 다를까요?", "/guides/loan-interest-guide", "원리금균등·원금균등·만기일시상환의 월 납입액과 총이자 차이를 설명합니다."],
  ["예금과 적금 이자, 어떻게 달라질까요?", "/guides/savings-interest-guide", "예금·적금의 이자 계산 구조와 단리·복리, 일반과세 기준을 설명합니다."],
  ["연봉 실수령액이 달라지는 이유", "/guides/salary-net-pay-guide", "사회보험료와 원천징수, 비과세 항목 때문에 실수령액이 달라지는 이유를 설명합니다."],
  ["주휴수당, 계산 전에 확인할 조건", "/guides/weekly-holiday-pay-guide", "주 소정근로시간과 개근 등 주휴수당 계산 전 확인할 조건을 설명합니다."],
  ["퇴직금 계산 전 확인할 항목", "/guides/severance-pay-guide", "계속근로기간과 평균임금 등 퇴직금 계산에 필요한 기준을 설명합니다."],
  ["주택 취득세 계산 전 확인할 조건", "/guides/home-acquisition-tax-guide", "주택 수와 취득가액 등 취득세 계산 전에 확인할 조건을 설명합니다."],
  ["부동산 중개보수 계산 전 확인할 점", "/guides/real-estate-brokerage-fee-guide", "서울 주택 중개보수의 거래금액 산정과 상한요율을 설명합니다."],
  ["보증금과 월세를 전환할 때 알아둘 점", "/guides/monthly-rent-conversion-guide", "보증금과 월세 환산식, 법정 전월세전환율 상한을 설명합니다."],
] as const;

const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date("2026-09-05T00:00:00+09:00").toUTCString()}</lastBuildDate>
    ${[...supplementalGuides.map(item => [item.title, `/guides/${item.slug}`, item.intro]), ...items].map(([title, path, description]) => `<item>
      <title>${escapeXml(title)}</title>
      <link>${siteUrl}${path}</link>
      <guid isPermaLink="true">${siteUrl}${path}</guid>
      <description>${escapeXml(description)}</description>
    </item>`).join("\n    ")}
  </channel>
</rss>`;

  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
