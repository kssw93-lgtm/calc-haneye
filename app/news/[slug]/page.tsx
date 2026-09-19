import Image from "next/image";
import Link from "next/link";
import { NewsExpansion } from "@/components/NewsExpansion";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { getNewsArticle, newsArticles, getSortedNewsArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/utils/seo";

export function generateStaticParams() { return newsArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getNewsArticle((await params).slug); return article ? pageMetadata({ title: article.title, description: article.summary, path: `/news/${article.slug}` }) : {}; }

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getNewsArticle((await params).slug); if (!article) notFound();
  const sortedArticles = getSortedNewsArticles();
  const index = sortedArticles.findIndex((item) => item.slug === article.slug);
  const previous = sortedArticles[index - 1]; const next = sortedArticles[index + 1];
  return <Container className="py-10 sm:py-14"><Link href="/news" className="font-semibold text-brand">← 뉴스 목록</Link><article className="mt-6 max-w-3xl"><div className="flex gap-3 text-sm text-ink-muted"><span className="font-semibold text-brand">{article.category}</span><time dateTime={article.date}>{article.date}</time></div><h1 className="mt-4 text-3xl font-bold leading-tight">{article.title}</h1><p className="mt-5 text-lg leading-8 text-ink-soft">{article.summary}</p><NewsExpansion article={article} /><div className="mt-8 space-y-6 leading-8 text-ink">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{article.toonImage && <figure className="mt-10"><h2 className="text-xl font-bold text-ink">만화로 보는 오늘의 뉴스</h2><Image src={article.toonImage} alt={article.toonImageAlt ?? article.title} width={1200} height={900} unoptimized className="mt-4 h-auto w-full rounded-2xl border border-hairline" /><figcaption className="mt-3 text-sm leading-6 text-ink-muted">기사 내용을 이해하기 쉽게 각색한 satire 일러스트입니다. 실제 인물·발언과 무관하며 투자·구매를 권유하지 않습니다.</figcaption></figure>}<div className="mt-10 rounded-xl border border-hairline bg-surface-subtle p-5 text-sm"><p className="font-semibold">출처 및 확인 기준</p><p className="mt-2 text-ink-soft">{article.sourceName} · 발표일 {article.date}</p><a className="mt-2 inline-block text-brand underline" href={article.sourceUrl} target="_blank" rel="noreferrer">원문 출처 보기 ↗</a><p className="mt-3 text-ink-muted">이 글은 정보 전달 목적이며 투자 또는 금융상품 가입을 권유하지 않습니다.</p></div></article><nav className="mt-12 grid gap-3 sm:grid-cols-2">{previous ? <Link href={`/news/${previous.slug}`} className="rounded-xl border p-4"><span className="text-sm text-ink-muted">이전 글</span><span className="mt-1 block font-semibold">{previous.title}</span></Link> : <span />}{next ? <Link href={`/news/${next.slug}`} className="rounded-xl border p-4 text-right"><span className="text-sm text-ink-muted">다음 글</span><span className="mt-1 block font-semibold">{next.title}</span></Link> : <span />}</nav></Container>;
}
