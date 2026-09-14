export interface NewsSource {
  name: string;
  url: string;
}

export interface NewsMeta {
  slug: string;
  href: string;
  category: "시황";
  title: string;
  description: string;
  publishedAt: string;
  sources: NewsSource[];
}

export const newsArticles: NewsMeta[] = [
  {
    slug: "kospi-below-6700-2026-09-14",
    href: "/news/kospi-below-6700-2026-09-14",
    category: "시황",
    title: "코스피, 美 근원물가 쇼크에 6,700선 붕괴…하루 만에 3%대 급락",
    description:
      "미국 8월 근원 CPI가 예상치를 웃돌며 9월 금리 인상 우려가 커지자 코스피가 225포인트 넘게 빠지며 6,700선을 내줬습니다. 반도체 대형주 낙폭이 특히 컸습니다.",
    publishedAt: "2026-09-14",
    sources: [
      { name: "머니투데이 - 미 금리인상 확률 86%…외인·기관 매도에 6700 밑돌아", url: "https://www.mt.co.kr/stock/2026/09/14/2026091410455036443" },
      { name: "머니투데이 - 시퍼렇게 멍든 코스피…외인·기관 쌍끌이 팔자에 6700 와르르", url: "https://www.mt.co.kr/stock/2026/09/14/2026091409082865838" },
      { name: "파이낸셜뉴스 - 코스피, 'AI 개발 속도 조절론'에 외인 투매...6700선 붕괴", url: "https://www.fnnews.com/news/202609141427326969" },
    ],
  },
];

export function getLatestNews(limit?: number): NewsMeta[] {
  const sorted = [...newsArticles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getNewsBySlug(slug: string): NewsMeta | undefined {
  return newsArticles.find((item) => item.slug === slug);
}
