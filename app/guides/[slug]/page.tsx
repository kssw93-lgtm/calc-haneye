import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";
import { getCalculatorBySlug } from "@/lib/constants/calculatorMetadata";
import { pageMetadata, absoluteUrl } from "@/lib/utils/seo";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const dynamicParams = false;
export function generateStaticParams() { return supplementalGuides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = supplementalGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  return pageMetadata({ title: guide.title, description: guide.intro, path: `/guides/${slug}` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = supplementalGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  const calculator = getCalculatorBySlug(guide.calculator)!;
  const related = supplementalGuides.filter(item => item.calculator === guide.calculator && item.slug !== slug);
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.intro, dateModified: guide.reviewedAt, mainEntityOfPage: absoluteUrl(`/guides/${slug}`) };
  return <Container className="max-w-3xl py-10 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} />
    <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "계산 가이드", href: "/guides" }, { label: guide.title }]} />
    <article className="mt-5">
      <h1 className="text-2xl font-bold sm:text-3xl">{guide.title}</h1>
      <p className="mt-4 leading-8 text-ink-soft">{guide.intro}</p>
      <p className="mt-3 text-xs text-ink-muted">내용·산식 검토: {guide.reviewedAt} · 실제 지급·계약·신고 전 최신 기준 확인</p>
      <nav aria-label="글 목차" className="my-8 rounded-xl border p-5"><h2 className="font-bold">이 글에서 확인할 내용</h2><ol className="mt-3 list-decimal space-y-2 pl-5">{guide.sections.map((section, index) => <li key={section.title}><a className="text-brand underline" href={`#section-${index}`}>{section.title}</a></li>)}</ol></nav>
      {guide.sections.map((section, index) => <section className="mt-10 scroll-mt-24" id={`section-${index}`} key={section.title}><h2 className="text-xl font-bold">{section.title}</h2><p className="mt-3 leading-8 text-ink-soft">{section.body}</p></section>)}
      <section className="mt-10 rounded-xl bg-surface-subtle p-5"><h2 className="font-bold">{guide.faq.question}</h2><p className="mt-3 leading-7">{guide.faq.answer}</p></section>
      <section className="mt-10 border-t pt-6"><h2 className="font-bold">관련 공식 안내와 예시의 범위</h2><ul className="mt-3 space-y-3">{guide.sources.map(source => <li key={source.url}><a className="text-brand underline" href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a></li>)}</ul><p className="mt-3 text-xs leading-6 text-ink-muted">설명용 금액과 비율은 계산한눈에가 작성한 가상 예시로, 공식 기관의 상품 추천이나 확정 세액이 아닙니다. 숫자 예시는 산식으로 재검산했습니다.</p></section>
      <section className="mt-8 rounded-xl border p-5"><h2 className="font-bold">직접 계산하고 이어서 확인하기</h2><ul className="mt-3 space-y-3"><li><Link className="text-brand underline" href={calculator.href}>{calculator.title}</Link></li><li><Link className="text-brand underline" href={calculator.guideHref}>기본 계산 가이드</Link></li>{related.map(item => <li key={item.slug}><Link className="text-brand underline" href={`/guides/${item.slug}`}>{item.title}</Link></li>)}</ul></section>
    </article>
  </Container>;
}
