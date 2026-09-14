"use client";

import { useState, type FormEvent } from "react";
import { calculateSocialInsurance } from "@/lib/calculators/socialInsurance";
import { formatWon } from "@/lib/utils/currency";

export function SocialInsuranceCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateSocialInsurance> | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      setResult(calculateSocialInsurance({
        monthlyInsurableWage: Number(data.get("wage")),
        pensionPeriod: String(data.get("period")) as "first-half" | "second-half",
      }));
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "입력값을 확인해 주세요.");
    }
  }

  return <div className="mt-8 grid gap-6 lg:grid-cols-2">
    <form onSubmit={submit} className="space-y-5 rounded-card border border-hairline bg-white p-6">
      <label className="block text-sm font-bold">월 보험료 산정 보수액
        <input required name="wage" type="number" min="1" step="1000" defaultValue="3000000" className="mt-2 min-h-12 w-full rounded-lg border border-hairline px-3" />
        <span className="mt-1 block text-xs font-normal leading-5 text-ink-muted">비과세 식대 등 보험료 산정에서 제외되는 금액은 빼고 입력하세요.</span>
      </label>
      <label className="block text-sm font-bold">국민연금 적용 기간
        <select name="period" defaultValue="second-half" className="mt-2 min-h-12 w-full rounded-lg border border-hairline px-3">
          <option value="first-half">2026년 1월~6월</option>
          <option value="second-half">2026년 7월~12월</option>
        </select>
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button className="min-h-12 w-full rounded-lg bg-brand font-bold text-white">4대보험 계산하기</button>
    </form>
    <section aria-live="polite" className="rounded-card border border-hairline bg-surface-subtle p-6">
      <h2 className="text-lg font-bold">근로자 월 부담 예상액</h2>
      {result ? <>
        <dl className="mt-5 space-y-4">
          {[
            ["국민연금 (4.75%)", formatWon(result.nationalPension)],
            ["건강보험 (3.595%)", formatWon(result.healthInsurance)],
            ["장기요양보험", formatWon(result.longTermCare)],
            ["고용보험 (0.9%)", formatWon(result.employmentInsurance)],
            ["산재보험 근로자 부담", formatWon(result.industrialAccident)],
          ].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt className="text-sm text-ink-soft">{label}</dt><dd className="text-right font-bold">{value}</dd></div>)}
        </dl>
        <div className="mt-5 border-t border-hairline pt-5"><div className="flex justify-between gap-4"><span className="font-bold">월 공제 합계</span><strong className="text-xl text-brand">{formatWon(result.employeeTotal)}</strong></div><div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-ink-soft">보험료 공제 후 금액</span><strong>{formatWon(result.estimatedNetAfterInsurance)}</strong></div></div>
        <p className="mt-5 text-xs leading-6 text-ink-muted">국민연금 산정 기준액 {formatWon(result.pensionBase)} · 적용 상·하한 {formatWon(result.pensionMinimum)}~{formatWon(result.pensionMaximum)}</p>
      </> : <p className="mt-4 text-sm text-ink-muted">월 보수액과 기간을 입력하면 근로자 부담분을 나누어 보여드립니다.</p>}
      <p className="mt-5 text-xs leading-6 text-ink-muted">실제 고지액은 공단이 결정한 보수월액·기준소득월액, 원 단위 처리, 지원금, 정산 및 가입 제외 여부에 따라 달라질 수 있습니다. 소득세와 지방소득세는 포함하지 않습니다.</p>
    </section>
  </div>;
}
