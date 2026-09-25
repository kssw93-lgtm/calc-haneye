import Image from "next/image";
import Link from "next/link";
import { NewsExpansion } from "@/components/NewsExpansion";
import { CalculatorCTA } from "@/components/guides/CalculatorCTA";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { getArticleOgImage, getDisplayDate, getNewsArticle, newsArticles, getSortedNewsArticles, getRelatedCalculatorHrefs } from "@/lib/news";
import { absoluteUrl, pageMetadata } from "@/lib/utils/seo";
import { siteName } from "@/lib/constants/site";

export function generateStaticParams() { return newsArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getNewsArticle((await params).slug); return article ? pageMetadata({ title: article.title, description: article.summary, path: `/news/${article.slug}`, image: getArticleOgImage(article), imageAlt: article.imageAlt ?? article.title }) : {}; }

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getNewsArticle((await params).slug); if (!article) notFound();
  const sortedArticles = getSortedNewsArticles();
  const index = sortedArticles.findIndex((item) => item.slug === article.slug);
  const previous = sortedArticles[index - 1]; const next = sortedArticles[index + 1];
  const relatedCalculatorHrefs = getRelatedCalculatorHrefs(article);
  const publishedDate = getDisplayDate(article);
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    ...(getArticleOgImage(article) ? { image: [absoluteUrl(getArticleOgImage(article)!)] } : {}),
    datePublished: publishedDate,
    dateModified: article.reviewedAt ?? publishedDate,
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: absoluteUrl("/logo-mark.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/news/${article.slug}`) },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "금융·정책 뉴스", item: absoluteUrl("/news") },
      { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/news/${article.slug}`) },
    ],
  };
  return <Container className="py-10 sm:py-14">{[newsArticleJsonLd, breadcrumbJsonLd].map((jsonLd, jsonLdIndex) => <script key={jsonLdIndex} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />)}<Link href="/news" className="font-semibold text-brand">← 뉴스 목록</Link><article className="mt-6 max-w-3xl"><div className="flex gap-3 text-sm text-ink-muted"><span className="font-semibold text-brand">{article.category}</span><time dateTime={getDisplayDate(article)}>{getDisplayDate(article)}</time></div><h1 className="mt-4 text-3xl font-bold leading-tight">{article.title}</h1><p className="mt-5 text-lg leading-8 text-ink-soft">{article.summary}</p>{article.toonImage && <figure className="mt-8"><h2 className="text-xl font-bold text-ink">만화로 보는 오늘의 뉴스</h2><Image src={article.toonImage} alt={article.toonImageAlt ?? article.title} width={1200} height={900} unoptimized className="mt-4 h-auto w-full rounded-2xl border border-hairline" /><figcaption className="mt-3 text-sm leading-6 text-ink-muted">기사 내용을 이해하기 쉽게 각색한 satire 일러스트입니다. 실제 인물·발언과 무관하며 투자·구매를 권유하지 않습니다.</figcaption></figure>}<NewsExpansion article={article} /><div className="mt-8 space-y-6 leading-8 text-ink">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{article.walletTakeaway && <section className="mt-10 rounded-2xl border border-hairline bg-surface-subtle p-6"><h2 className="text-lg font-bold text-ink">이 뉴스가 내 지갑에 미치는 영향 3줄 정리</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">{article.walletTakeaway.map(line => <li key={line}>{line}</li>)}</ul></section>}<CalculatorCTA hrefs={relatedCalculatorHrefs} /><p className="mt-10 text-sm text-ink-muted">이 글은 정보 전달 목적이며 투자 또는 금융상품 가입을 권유하지 않습니다.</p></article><nav className="mt-12 grid gap-3 sm:grid-cols-2">{previous ? <Link href={`/news/${previous.slug}`} className="rounded-xl border p-4"><span className="text-sm text-ink-muted">이전 글</span><span className="mt-1 block font-semibold">{previous.title}</span></Link> : <span />}{next ? <Link href={`/news/${next.slug}`} className="rounded-xl border p-4 text-right"><span className="text-sm text-ink-muted">다음 글</span><span className="mt-1 block font-semibold">{next.title}</span></Link> : <span />}</nav></Container>;
}
