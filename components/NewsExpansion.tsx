import Image from "next/image";
import type { NewsArticle } from "@/lib/news";

export function NewsExpansion({ article }: { article: NewsArticle }) {
  return <>
    {article.publishedAt && <p className="mt-4 text-sm text-ink-muted">게시일: {article.publishedAt} · 발표일: {article.date}</p>}
    {article.image && <figure className="my-8"><Image src={article.image} alt={article.imageAlt ?? "2차 펀드 모집 규모와 판매 일정"} width={1200} height={640} unoptimized className="h-auto w-full rounded-2xl" /><figcaption className="mt-3 text-sm leading-6 text-ink-muted">금융위원회 {article.date} 발표를 바탕으로 계산한눈에에서 제작한 설명 이미지입니다.</figcaption></figure>}
    {article.sections?.map(section => <section className="mt-8" key={section.title}><h2 className="text-xl font-bold">{section.title}</h2><p className="mt-3 leading-8 text-ink-soft">{section.text}</p></section>)}
    {article.reviewedAt && <p className="mt-8 text-sm text-ink-muted">최종 원문 확인: {article.reviewedAt} · 추가 확인: <a href={article.extraSource?.url ?? "https://www.fsc.go.kr/no010102/86869"} className="underline" target="_blank" rel="noreferrer">{article.extraSource?.name ?? "금융위원회 2026년 5월 13일 상품 성격 설명"}</a></p>}
  </>;
}
