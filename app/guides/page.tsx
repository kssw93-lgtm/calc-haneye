import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "계산 가이드",
  description:
    "대출, 퇴직금, 주택 취득세 계산 전에 확인하면 좋은 내용을 안내합니다.",
  path: "/guides",
});

const guides = [
  {
    title: "대출 상환 방식, 무엇이 다를까요?",
    description: "원리금균등·원금균등·만기일시상환의 차이를 비교합니다.",
    href: "/guides/loan-interest-guide",
  },
  {
    title: "퇴직금 계산 전 확인할 5가지",
    description: "입사일부터 평균임금까지, 계산 전에 점검할 항목을 안내합니다.",
    href: "/guides/severance-pay-guide",
  },
  {
    title: "주택 취득세 계산 전 확인할 조건",
    description: "취득 형태, 보유 주택 수, 감면 여부 등 핵심 조건을 안내합니다.",
    href: "/guides/home-acquisition-tax-guide",
  },
  { title: "연봉 실수령액이 달라지는 이유", description: "4대보험, 원천징수, 비과세와 연말정산의 영향을 안내합니다.", href: "/guides/salary-net-pay-guide" },
  { title: "주휴수당 계산 전 확인할 조건", description: "주 15시간과 개근 등 핵심 조건을 안내합니다.", href: "/guides/weekly-holiday-pay-guide" },
  { title: "표준근로계약서 양식 다운로드", description: "고용노동부 공식 HWP 양식과 작성 전 필수 확인사항을 안내합니다.", href: "/guides/employment-contract-template" },
  { title: "알바 근로계약서 작성법", description: "시급, 근무일, 휴게시간과 주휴일 등 꼭 적어야 할 항목을 안내합니다.", href: "/guides/part-time-employment-contract" },
  { title: "급여명세서 보는 법", description: "지급액과 공제액, 실수령액을 순서대로 대조하는 방법을 안내합니다.", href: "/guides/payslip-reading-guide" },
  { title: "주 20시간 주휴수당 계산", description: "주 5일 근무 가정의 시급별 계산 예시와 적용 조건을 설명합니다.", href: "/guides/weekly-holiday-pay-20-hours" },
  { title: "퇴직금 1년 기준", description: "1년 미만과 주 15시간 기준, 평균임금 계산 예시를 설명합니다.", href: "/guides/severance-pay-one-year" },
  { title: "대출 1억 이자 계산", description: "금리 3%·4%·5%의 월 이자를 상환 방식과 함께 비교합니다.", href: "/guides/loan-100-million-interest" },
  { title: "예금 1천만원 이자", description: "연 3% 일반과세 기준 세전·세후 이자를 계산합니다.", href: "/guides/deposit-10-million-interest" },
  { title: "전세 3억원 중개수수료", description: "서울 주택 전세 3억 원의 중개보수 상한을 계산합니다.", href: "/guides/jeonse-brokerage-fee" },
  { title: "보증금 1천·월세 50 중개수수료", description: "월세 거래금액 산정식과 서울 주택 중개보수 예시를 설명합니다.", href: "/guides/monthly-rent-brokerage-fee" },
  { title: "예금과 적금 이자 차이", description: "예금·적금과 단리·복리, 세전·세후 차이를 설명합니다.", href: "/guides/savings-interest-guide" },
  { title: "부동산 중개보수 확인사항", description: "상한요율과 협의 보수, 월세 거래금액 산정을 안내합니다.", href: "/guides/real-estate-brokerage-fee-guide" },
  { title: "보증금과 월세 전환", description: "전환율의 의미와 단순 환산 방법을 안내합니다.", href: "/guides/monthly-rent-conversion-guide" },
];

export default function GuidesPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "계산 가이드" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">계산 가이드</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        계산기를 사용하기 전에 알아두면 좋은 기본 개념과 점검 항목을 안내합니다.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <BookOpen aria-hidden="true" className="h-6 w-6 text-brand" />
              <h2 className="mt-3 text-base font-bold text-ink">{guide.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {guide.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
