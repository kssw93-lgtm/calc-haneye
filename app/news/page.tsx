import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { MarketChartGraphic } from "@/components/news/MarketChartGraphic";
import { getLatestNews } from "@/lib/constants/newsMetadata";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "금융 뉴스",
  description:
    "코스피·코스닥, 금리, 환율 등 생활과 맞닿은 오늘의 금융 시황을 정리해서 전해드립니다.",
  path: "/news",
});

const news = getLatestNews();

export default function NewsListPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "금융 뉴스" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">금융 뉴스</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        코스피·코스닥, 금리, 환율처럼 대출·자산 계획에 영향을 주는 시황
        소식을 간단히 정리해서 전해드립니다.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {news.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Card className="h-full p-0 overflow-hidden transition-shadow hover:shadow-md">
              <MarketChartGraphic trend="down" className="rounded-b-none border-0 border-b border-hairline" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <span className="rounded-full bg-danger-light px-2 py-0.5 font-medium text-danger">
                    {item.category}
                  </span>
                  <time dateTime={item.publishedAt}>{item.publishedAt}</time>
                </div>
                <h2 className="mt-2.5 text-base font-bold leading-snug text-ink">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
