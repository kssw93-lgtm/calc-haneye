import Image from "next/image";
import type { NewsArticle } from "@/lib/news";

export function NewsExpansion({ article }: { article: NewsArticle }) {
  return <>
    {article.image && <figure className="my-8"><Image src={article.image} alt={article.imageAlt ?? article.title} width={1200} height={640} unoptimized className="h-auto w-full rounded-2xl" /><figcaption className="mt-3 text-sm leading-6 text-ink-muted">{article.sourceName} {article.date} 발표를 바탕으로 계산한눈에에서 제작한 설명 이미지입니다.</figcaption></figure>}
    {article.sections?.map(section => <section className="mt-8" key={section.title}><h2 className="text-xl font-bold">{section.title}</h2><p className="mt-3 leading-8 text-ink-soft">{section.text}</p></section>)}
  </>;
}
