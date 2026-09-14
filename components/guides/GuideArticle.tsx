import Link from "next/link";
import { CalculatorCTA } from "@/components/guides/CalculatorCTA";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { guideVerification } from "@/lib/constants/guideVerification";
import { absoluteUrl } from "@/lib/utils/seo";

export interface GuideData { path: string; title: string; intro: string; sections: { title: string; paragraphs: string[] }[]; calculatorHref: string; calculatorLabel: string; related: { href: string; label: string }[] }

export function GuideArticle({ data }: { data: GuideData }) {
  const verification = guideVerification[data.path];
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: data.title, description: data.intro, dateModified: "2026-09-02", mainEntityOfPage: absoluteUrl(data.path) };
  return <Container className="py-10 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "계산 가이드", href: "/guides" }, { label: data.title }]} />
    <article className="mx-auto mt-4 max-w-3xl">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{data.title}</h1>
      <p className="mt-4 text-base leading-8 text-ink-soft">{data.intro}</p>
      <p className="mt-3 text-xs text-ink-muted">최종 내용 검토: 2026년 9월 2일</p>
      {verification && <section className="mt-8 rounded-card border border-hairline bg-surface-subtle p-6"><h2 className="text-lg font-bold text-ink">공식 자료로 확인한 핵심 기준</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">{verification.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></section>}
      <div className="mt-10 space-y-10">{data.sections.map((section, index) => <div key={section.title}><section><h2 className="text-xl font-bold text-ink">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-ink-soft">{paragraph}</p>)}</section>{index === Math.min(1, data.sections.length - 1) && <CalculatorCTA hrefs={[data.calculatorHref]} />}</div>)}</div>
      {verification && <section className="mt-10 border-t border-hairline pt-6"><h2 className="text-lg font-bold text-ink">공식 출처</h2><ul className="mt-3 space-y-2 text-sm">{verification.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">{source.name} ↗</a></li>)}</ul><p className="mt-3 text-xs leading-6 text-ink-muted">법령·세율 기준은 변경될 수 있으므로 실제 계약이나 신고 전 최신 원문을 다시 확인하세요.</p></section>}
      <div className="mt-12 rounded-card border border-brand/20 bg-brand-light p-6"><h2 className="text-lg font-bold text-ink">직접 확인해 보세요</h2><Link href={data.calculatorHref} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">{data.calculatorLabel} →</Link></div>
      <div className="mt-8 flex flex-wrap gap-4">{data.related.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-brand hover:underline">{item.label} →</Link>)}</div>
    </article>
  </Container>;
}
