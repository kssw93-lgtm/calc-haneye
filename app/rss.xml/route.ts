import { siteDescription, siteName, siteUrl } from "@/lib/constants/site";

export const dynamic = "force-static";

const items = [
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
    <lastBuildDate>${new Date("2026-09-02T00:00:00+09:00").toUTCString()}</lastBuildDate>
    ${items.map(([title, path, description]) => `<item>
      <title>${escapeXml(title)}</title>
      <link>${siteUrl}${path}</link>
      <guid isPermaLink="true">${siteUrl}${path}</guid>
      <description>${escapeXml(description)}</description>
    </item>`).join("\n    ")}
  </channel>
</rss>`;

  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
