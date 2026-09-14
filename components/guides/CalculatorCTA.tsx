import Link from "next/link";
import { calculators } from "@/lib/constants/calculatorMetadata";

const labels: Record<string, string> = {
  "loan-interest": "내 대출 상환액 계산하기",
  "salary-net-pay": "내 급여 조건으로 계산하기",
  "severance-pay": "내 예상 퇴직금 계산하기",
  "weekly-holiday-pay": "내 근무시간으로 주휴수당 계산하기",
  "savings-interest": "내 예·적금 이자 계산하기",
  "real-estate-brokerage-fee": "내 계약금액으로 중개보수 계산하기",
  "monthly-rent-conversion": "내 보증금·월세 조건 비교하기",
  "home-acquisition-tax": "내 주택 취득세 계산하기",
};

/** Real navigable links in static HTML; never converts an application link into a calculator. */
export function CalculatorCTA({ hrefs }: { hrefs: string[] }) {
  const related = [...new Set(hrefs)].flatMap(href => {
    const calculator = calculators.find(item => item.href === href);
    return calculator ? [calculator] : [];
  }).slice(0, 2);
  if (!related.length) return null;
  return <aside data-calculator-cta className="my-8 rounded-2xl border border-brand/20 bg-brand-light p-5 sm:p-6" aria-label="내 조건으로 직접 계산">
    <p className="text-xs font-semibold tracking-wide text-brand">읽은 내용을 내 조건에 적용해 보세요</p>
    <p className="mt-2 text-lg font-bold text-ink">예시와 내 금액은 얼마나 다를까요?</p>
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{related.map(item => <Link key={item.slug} data-calculator-cta-link href={item.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{labels[item.slug] ?? item.title}<span aria-hidden="true">→</span></Link>)}</div>
    <p className="mt-3 text-xs leading-6 text-ink-soft">계산기에서 금액과 조건을 직접 입력하세요. 참고용 예상 결과이며 정책 신청·대출 승인·확정 세액 판정이 아닙니다.</p>
  </aside>;
}
