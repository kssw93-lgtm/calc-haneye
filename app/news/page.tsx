import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/utils/seo";
import { newsArticles } from "@/lib/news";

export const metadata = pageMetadata({ title: "금융·정책 뉴스", description: "금융, 세금, 부동산, 복지정책의 주요 발표를 출처와 함께 중립적으로 정리합니다.", path: "/news" });

export default function NewsPage() {
  return <Container className="py-10 sm:py-14">
    <h1 className="text-3xl font-bold">금융·정책 뉴스</h1>
    <p className="mt-3 max-w-2xl leading-8 text-ink-soft">공식 발표와 공개 자료를 바탕으로 핵심 사실만 정리합니다. 투자 권유나 상품 추천을 하지 않습니다.</p>
    <div className="mt-8 grid gap-4 lg:grid-cols-2">{newsArticles.map((article) => <article key={article.slug} className="rounded-2xl border border-hairline bg-white p-6 shadow-sm"><div className="flex items-center gap-3 text-sm text-ink-muted"><span className="rounded-full bg-surface-subtle px-3 py-1 font-semibold text-brand">{article.category}</span><time dateTime={article.date}>{article.date}</time></div><h2 className="mt-4 text-xl font-bold"><Link href={`/news/${article.slug}`} className="hover:text-brand">{article.title}</Link></h2><p className="mt-3 leading-7 text-ink-soft">{article.summary}</p><Link className="mt-5 inline-block font-semibold text-brand" href={`/news/${article.slug}`}>자세히 보기 →</Link></article>)}</div>
  </Container>;
}
