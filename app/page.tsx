import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  House,
  Landmark,
  Lock,
  Receipt,
  ScrollText,
  ShieldCheck,
  WalletCards,
  BriefcaseBusiness,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CalculatorCard } from "@/components/CalculatorCard";
import {
  getCalculatorsByCategory,
} from "@/lib/constants/calculatorMetadata";
import { getDisplayDate, getSortedNewsArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({
  title: "계산한눈에 - 금융·급여·부동산 생활 계산기",
  description:
    "대출 이자, 예·적금, 퇴직금, 주휴수당, 취득세와 주택 계약 비용을 분야별로 확인하는 무료 생활 계산기.",
  path: "/",
});

const financeCalculators = getCalculatorsByCategory("finance");
const salaryWorkCalculators = getCalculatorsByCategory("salary-work");
const propertyTaxCalculators = getCalculatorsByCategory("property-tax");
const popularCalculators = [...financeCalculators, ...salaryWorkCalculators, ...propertyTaxCalculators].slice(0, 6);
const latestNews = getSortedNewsArticles().slice(0, 3);

const trustItems = [
  {
    icon: Lock,
    title: "로그인 없이 바로 계산",
    description: "회원가입이나 로그인 절차 없이 바로 계산기를 이용할 수 있습니다.",
  },
  {
    icon: ShieldCheck,
    title: "계산기 금액은 브라우저에서 처리",
    description: "계산기 입력금액은 서버에 전송하지 않습니다. 복지 검색어는 공공 API로 전송되므로 개인정보를 입력하지 마세요.",
  },
  {
    icon: ScrollText,
    title: "기준과 한계를 함께 안내",
    description: "각 계산기가 다루는 조건과 다루지 않는 조건을 명확히 안내합니다.",
  },
];

const guideCards = [
  { title: "거래내역 CSV로 수입·지출 분석하기", href: "/tools/transactions" },
  { title: "실업급여 예상 금액·지급일수 계산하기", href: "/calculators/unemployment-benefit" },
  { title: "실업급여 계산 전 확인할 기준", href: "/guides/2026-unemployment-benefit" },
  { title: "근로장려금 가구·소득·재산 확인 순서", href: "/policies/earned-income-tax-credit" },
  { title: "주 20시간 근무, 주휴수당은 얼마일까요?", href: "/guides/weekly-holiday-pay-20-hours" },
  { title: "주 15·20·40시간 근무 조건 비교", href: "/guides/weekly-hours-15-20-40-comparison" },
  { title: "하루 4시간씩 주 5일 일할 때 주휴수당", href: "/guides/four-hours-five-days-weekly-pay" },
  { title: "대출 1억원의 금리별 이자 비교", href: "/guides/loan-100-million-interest" },
  { title: "월세와 관리비·보증금을 함께 비교하는 법", href: "/guides/monthly-rent-management-cost-comparison" },
  { title: "6억·7억5천·9억원 주택 취득세 비교", href: "/guides/acquisition-tax-600m-900m" },
  {
    title: "대출 상환 방식 이해하기",
    href: "/guides/loan-interest-guide",
  },
  {
    title: "퇴직금 계산 시 확인할 항목",
    href: "/guides/severance-pay-guide",
  },
  {
    title: "주택 취득세 계산 전 체크할 조건",
    href: "/guides/home-acquisition-tax-guide",
  },
  { title: "주휴수당 계산 전 확인할 조건", href: "/guides/weekly-holiday-pay-guide" },
  { title: "예금과 적금 이자 차이", href: "/guides/savings-interest-guide" },
  { title: "부동산 중개보수 확인사항", href: "/guides/real-estate-brokerage-fee-guide" },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-hairline bg-white">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              복잡한 금융·세금 계산,
              <br />
              필요한 숫자만 빠르게.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              금융, 급여·노동, 세금·부동산 분야에서 지금 필요한 계산기를
              빠르게 찾아보세요.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/calculators/loan-interest" size="lg">
                대출 이자 계산하기
              </Button>
              <Button
                href="/calculators/home-acquisition-tax"
                variant="secondary"
                size="lg"
              >
                취득세 계산하기
              </Button>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
            <HeroIconTile icon={Calculator} label="빠른 계산" className="translate-y-4" />
            <HeroIconTile icon={Landmark} label="대출 이자" />
            <HeroIconTile icon={House} label="취득세" />
            <HeroIconTile
              icon={WalletCards}
              label="퇴직금"
              className="translate-y-4"
            />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-ink">주요 생활 계산기</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularCalculators.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-hairline bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <CategoryBlock
              title="금융 계산기"
              icon={Landmark}
              items={financeCalculators}
            />
            <CategoryBlock
              title="급여·노동 계산기"
              icon={BriefcaseBusiness}
              items={salaryWorkCalculators}
            />
            <CategoryBlock
              title="세금·부동산 계산기"
              icon={Receipt}
              items={propertyTaxCalculators}
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline bg-surface-subtle py-14 sm:py-20">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-ink">최신 금융·정책 뉴스</h2>
            <Link href="/news" className="shrink-0 text-sm font-semibold text-brand hover:underline">
              전체보기 →
            </Link>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            공식 발표와 공개 자료를 바탕으로 정리한 최신 금융 이슈를 확인하세요.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {latestNews.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="block overflow-hidden rounded-card border border-hairline bg-white shadow-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? article.title}
                    width={1200}
                    height={640}
                    unoptimized
                    className="h-32 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="rounded-full bg-surface-subtle px-2.5 py-0.5 font-semibold text-brand">
                      {article.category}
                    </span>
                    <time dateTime={getDisplayDate(article)}>{getDisplayDate(article)}</time>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-base font-bold text-ink">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-ink">필요한 계산만, 부담 없이</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {trustItems.map((item) => (
              <Card key={item.title}>
                <item.icon aria-hidden="true" className="h-6 w-6 text-brand" />
                <h3 className="mt-3 text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-white py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-ink">
            계산 전에 알아두면 좋은 내용
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">내 근무시간, 대출금액, 주택가격에 가까운 사례부터 확인하세요. 각 가이드에서 적용 조건과 계산 예시를 읽고 관련 계산기로 직접 비교할 수 있습니다.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {guideCards.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="block rounded-card border border-hairline bg-white p-5 shadow-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <h3 className="text-base font-bold text-ink">{guide.title}</h3>
                <span className="mt-3 inline-block text-sm font-semibold text-brand">
                  가이드 보기 →
                </span>
              </Link>
            ))}
          </div>
          <Link href="/guides" className="mt-6 inline-block font-semibold text-brand underline">급여·대출·주택 계산 가이드 전체 보기 →</Link>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            지금 필요한 계산부터 시작하세요.
          </h2>
          <div className="mt-6 flex justify-center">
            <Button href="/calculators/loan-interest" size="lg">
              대출 이자 계산기로 이동
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroIconTile({
  icon: Icon,
  label,
  className = "",
}: {
  icon: typeof Calculator;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-card border border-hairline bg-white shadow-card ${className}`}
    >
      <Icon aria-hidden="true" className="h-8 w-8 text-brand" />
      <span className="text-xs font-medium text-ink-soft">{label}</span>
    </div>
  );
}

function CategoryBlock({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Landmark;
  items: ReturnType<typeof getCalculatorsByCategory>;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="h-5 w-5 text-brand" />
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="flex items-center justify-between rounded-lg border border-hairline bg-white px-4 py-3 text-sm font-medium text-ink hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {item.title}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
