"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";

interface Tool { slug: string; href: string; title: string; category: string; guideHref: string }
interface Article { slug: string; title: string; calculator: string }
export function RelatedCalculationContent({ tools, articles }: { tools: Tool[]; articles: Article[] }) {
  const pathname = usePathname();
  const current = tools.find(tool => tool.href === pathname);
  if (!current) return null;
  const related = tools.filter(tool => tool.slug !== current.slug).sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category)).slice(0, 3);
  return <Container className="pb-12"><aside aria-label="관련 계산기와 상세 가이드" className="rounded-xl border bg-surface-subtle p-6">
    <h2 className="text-lg font-bold">계산 결과와 함께 확인하세요</h2>
    <p className="mt-2 text-xs text-ink-muted">참고용 계산이며 실제 지급액·세액·계약 조건은 공식 자료와 대조하세요.</p>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">{related.map(tool => <li key={tool.slug}><Link className="font-semibold text-brand hover:underline" href={tool.href}>{tool.title} →</Link></li>)}
    <li><Link className="text-brand hover:underline" href={current.guideHref}>상세 계산 가이드 →</Link></li>
    {articles.filter(item => item.calculator === current.slug).map(item => <li key={item.slug}><Link className="text-brand hover:underline" href={`/guides/${item.slug}`}>{item.title} →</Link></li>)}</ul>
  </aside></Container>;
}
