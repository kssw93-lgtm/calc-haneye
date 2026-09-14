import Link from "next/link";
import { SocialInsuranceCalculator } from "@/components/calculators/SocialInsuranceCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({ title: "2026년 4대보험 계산기", description: "2026년 국민연금·건강보험·장기요양보험·고용보험의 근로자 월 부담액을 계산하세요.", path: "/calculators/social-insurance" });

export default function Page() {
  return <Container className="py-10 sm:py-14">
    <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "급여·노동", href: "/salary-work" }, { label: "2026년 4대보험 계산기" }]} />
    <h1 className="mt-4 text-2xl font-bold sm:text-3xl">2026년 4대보험 계산기</h1>
    <p className="mt-3 max-w-3xl leading-8 text-ink-soft">월 보수액으로 직장가입 근로자가 부담하는 국민연금, 건강보험, 장기요양보험과 고용보험 예상액을 확인합니다.</p>
    <p className="mt-2 text-xs text-ink-muted">적용 기준: 2026년 · 최종 검토: 2026년 9월 6일</p>
    <SocialInsuranceCalculator />
    <article className="mt-12 max-w-3xl space-y-8">
      <section><h2 className="text-xl font-bold">2026년 달라진 보험료율</h2><p className="mt-3 leading-8 text-ink-soft">국민연금 보험료율은 총 9.5%로 올라 직장가입 근로자와 사용자가 각각 4.75%를 부담합니다. 건강보험료율은 총 7.19%로 노사가 절반씩 부담하고, 장기요양보험료는 건강보험료에 0.9448%÷7.19%를 곱합니다. 고용보험 실업급여분의 근로자 부담률은 0.9%입니다.</p></section>
      <section><h2 className="text-xl font-bold">산재보험은 왜 0원인가요?</h2><p className="mt-3 leading-8 text-ink-soft">산재보험은 사업주가 전액 부담하며 업종별 요율이 다릅니다. 따라서 이 계산기의 근로자 공제 합계에는 포함하지 않습니다.</p></section>
      <section className="rounded-xl border p-5"><h2 className="font-bold">같이 확인하기</h2><div className="mt-3 flex flex-wrap gap-4"><Link className="font-semibold text-brand" href="/guides/2026-social-insurance-rates">2026년 4대보험 요율 가이드 →</Link><Link className="font-semibold text-brand" href="/calculators/salary-net-pay">연봉 실수령액 계산기 →</Link><Link className="font-semibold text-brand" href="/calculators/severance-pay">퇴직금 계산기 →</Link></div></section>
    </article>
  </Container>;
}
