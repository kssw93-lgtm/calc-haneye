import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { MarketChartGraphic } from "@/components/news/MarketChartGraphic";
import { getNewsBySlug } from "@/lib/constants/newsMetadata";
import { pageMetadata } from "@/lib/utils/seo";

const SLUG = "kospi-below-6700-2026-09-14";
const article = getNewsBySlug(SLUG)!;

export const metadata: Metadata = pageMetadata({
  title: article.title,
  description: article.description,
  path: article.href,
});

export default function KospiBelow6700NewsPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "금융 뉴스", href: "/news" },
          { label: "코스피 6,700선 붕괴" },
        ]}
      />

      <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
        <span className="rounded-full bg-danger-light px-2 py-0.5 font-medium text-danger">
          {article.category}
        </span>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">
        {article.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
        {article.description}
      </p>

      <div className="mt-6">
        <MarketChartGraphic trend="down" />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">코스피, 하루 만에 3%대 급락</h2>
          <p className="mt-2">
            14일 코스피는 전 거래일보다 225.54포인트(3.26%) 내린 6,684.37에
            거래를 마쳤습니다. 장중에는 6,654.82까지 밀리며 심리적 지지선으로
            여겨지던 6,700선이 무너졌습니다. 코스닥지수도 13.85포인트(1.69%)
            내린 806.79에 장을 마감했습니다. 하락을 주도한 건 외국인과
            기관이었습니다. 외국인이 3조 2,875억 원, 기관이 1조 1,715억 원을
            각각 순매도하며 지수를 끌어내렸습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">
            방아쇠는 미국 근원물가…9월 금리 인상 확률 86%대로
          </h2>
          <p className="mt-2">
            직접적인 계기는 미국의 8월 근원 소비자물가지수(CPI)였습니다. 전월
            대비 0.3% 올라 시장 예상치(0.2%)를 웃돌면서, 인플레이션이 예상보다
            끈적하다는 우려가 커졌습니다. 그 여파로 시카고상품거래소(CME)
            페드워치 기준 9월 기준금리 0.25%포인트 인상 확률은 지표 발표 전
            69%대에서 발표 후 86%대까지 뛰어올랐습니다. 금리 인상 기대가
            높아지면 시중금리 부담과 밸류에이션 부담이 동시에 커지기 때문에,
            글로벌 증시 전반에 위험자산 회피 심리가 확산됐습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">
            반도체 대형주 낙폭 두드러져…&quot;AI 속도 조절론&quot;도 부담
          </h2>
          <p className="mt-2">
            지수 하락은 시가총액 상위 반도체주에서 특히 두드러졌습니다.
            삼성전자는 전 거래일보다 1만 원(4.05%) 내린 24만 9,000원에,
            SK하이닉스는 11만 5,000원(6.35%) 하락한 169만 7,000원에 거래를
            마쳤습니다. 여기에 AI 관련 설비 투자 속도를 조절해야 한다는
            이른바 &quot;AI 개발 속도 조절론&quot;까지 겹치며, 그동안 지수
            상승을 이끌었던 반도체 중심 AI 밸류체인 전반이 동반 약세를
            보였습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">환율도 동반 상승</h2>
          <p className="mt-2">
            서울 외환시장에서 원·달러 환율은 전 거래일보다 1.4원 오른
            1,347.3원에 거래를 마쳤습니다. 위험자산 회피 심리 속에 안전자산
            선호 심리가 함께 작용한 것으로 풀이됩니다.
          </p>
        </section>

        <section className="rounded-card border border-hairline bg-surface-subtle p-5">
          <h2 className="text-base font-bold text-ink">한눈에 보는 오늘 시황</h2>
          <ul className="mt-3 space-y-1.5">
            <li>코스피: 6,684.37 (전일 대비 -225.54p, -3.26%)</li>
            <li>코스닥: 806.79 (전일 대비 -13.85p, -1.69%)</li>
            <li>외국인 순매도: 약 3조 2,875억 원 / 기관 순매도: 약 1조 1,715억 원</li>
            <li>삼성전자: 24만 9,000원 (-4.05%) / SK하이닉스: 169만 7,000원 (-6.35%)</li>
            <li>원·달러 환율: 1,347.3원 (+1.4원)</li>
            <li>9월 FOMC 25bp 인상 확률(CME 페드워치): 약 86%대</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">
            금리 인상 우려, 내 대출과는 무슨 관계일까요
          </h2>
          <p className="mt-2">
            기준금리 인상 기대가 커지면 은행권 대출 금리에도 시차를 두고
            영향을 줄 수 있습니다. 특히 변동금리로 대출을 이용 중이거나
            새로 대출을 계획하고 있다면, 금리가 오를 때 월 상환 부담이 얼마나
            늘어나는지 미리 가늠해 보는 것이 도움이 됩니다.
          </p>
        </section>
      </div>

      <div className="mt-10 rounded-card border border-hairline bg-white p-6 text-center">
        <p className="text-sm text-ink-soft">
          금리가 오르내릴 때 내 대출 상환액이 어떻게 달라지는지 직접
          계산해 보세요.
        </p>
        <div className="mt-4 flex justify-center">
          <Button href="/calculators/loan-interest">대출 이자 계산기로 이동</Button>
        </div>
      </div>

      <div className="mt-10">
        <CalculationNotice>
          이 기사는 2026년 9월 14일 보도된 국내 언론사 시황 기사를 바탕으로
          핵심 수치를 정리한 요약 콘텐츠이며, 투자 조언이나 권유가 아닙니다.
          지수·환율·개별 종목 수치는 거래소 확정치와 다를 수 있으니 투자
          판단 전 원문 기사와 공식 시세를 다시 확인하세요.
        </CalculationNotice>
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-bold text-ink">참고한 기사</h2>
        <ul className="mt-2 space-y-1.5 text-sm">
          {article.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand hover:underline"
              >
                {source.name}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-ink-muted">
        <Link href="/news" className="underline underline-offset-2">
          금융 뉴스 목록
        </Link>
        으로 돌아가기
      </p>
    </Container>
  );
}
