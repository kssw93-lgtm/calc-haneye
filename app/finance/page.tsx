import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { getCalculatorsByCategory } from "@/lib/constants/calculatorMetadata";
import { getDisplayDate, getSortedNewsArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "금융 계산기",
  description:
    "대출 이자와 예·적금 이자처럼 돈을 빌리거나 모을 때 필요한 계산기를 확인하세요.",
  path: "/finance",
});

const calculators = getCalculatorsByCategory("finance");
const relatedNews = getSortedNewsArticles()
  .filter((article) => article.category === "금융")
  .slice(0, 3);

export default function FinancePage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "금융 계산기" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">금융 계산기</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        돈을 빌리거나 모을 때 필요한 대출 이자와 예·적금 이자를 한곳에서
        확인하세요.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.slug}
            calculator={calculator}
            showScope
          />
        ))}
      </div>

      <div className="mt-10">
        <CalculationNotice>
          위 계산 결과는 모두 참고용 예상 계산입니다. 실제 금리·세금·상품 조건은
          금융기관 및 최신 공식 안내로 다시 확인하세요.
        </CalculationNotice>
      </div>

      <div className="mt-10 rounded-card border border-hairline bg-white p-6">
        <h2 className="text-lg font-bold text-ink">금융 계산 가이드</h2>
        <Link href="/guides/finance" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
          대출·예적금 이자 계산 방식 비교 보기 →
        </Link>
      </div>

      {relatedNews.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-ink">관련 최신 뉴스</h2>
            <Link href="/news" className="shrink-0 text-sm font-semibold text-brand hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedNews.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="block rounded-card border border-hairline bg-white p-5 shadow-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <time dateTime={getDisplayDate(article)} className="text-xs text-ink-muted">
                  {getDisplayDate(article)}
                </time>
                <h3 className="mt-2 line-clamp-2 text-sm font-bold text-ink">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
