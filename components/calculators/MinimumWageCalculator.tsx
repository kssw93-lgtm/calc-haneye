"use client";

import { useState, type FormEvent } from "react";
import { formatWon } from "@/lib/utils/currency";

const RATES = { "2026": 10320, "2027": 10700 } as const;

export function MinimumWageCalculator() {
  const [result, setResult] = useState<{ year: keyof typeof RATES; hourly: number; day: number; week: number; holiday: number; month: number } | null>(null);
  const [error, setError] = useState("");
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const data = new FormData(event.currentTarget);
    const year = String(data.get("year")) as keyof typeof RATES;
    const weeklyHours = Number(data.get("weeklyHours"));
    const weeklyDays = Number(data.get("weeklyDays"));
    if (!RATES[year] || weeklyHours <= 0 || weeklyHours > 40 || weeklyDays < 1 || weeklyDays > 7) { setResult(null); setError("주 근로시간은 0시간 초과 40시간 이하, 근무일은 1~7일로 입력하세요."); return; }
    const hourly = RATES[year];
    const holidayHours = weeklyHours >= 15 ? Math.min(8, weeklyHours / weeklyDays) : 0;
    setResult({ year, hourly, day: hourly * Math.min(8, weeklyHours / weeklyDays), week: hourly * weeklyHours, holiday: hourly * holidayHours, month: hourly * (weeklyHours + holidayHours) * 365 / 7 / 12 });
  }
  return <div className="mt-8 grid gap-6 lg:grid-cols-2"><form onSubmit={calculate} className="rounded-card border border-hairline bg-white p-6 space-y-5"><label className="block text-sm font-bold">적용 연도<select name="year" className="mt-2 min-h-12 w-full rounded-lg border border-hairline px-3"><option value="2027">2027년 · 10,700원</option><option value="2026">2026년 · 10,320원</option></select></label><label className="block text-sm font-bold">주 소정근로시간<input name="weeklyHours" type="number" min="0.5" max="40" step="0.5" defaultValue="40" className="mt-2 min-h-12 w-full rounded-lg border border-hairline px-3" /></label><label className="block text-sm font-bold">주 소정근로일수<input name="weeklyDays" type="number" min="1" max="7" defaultValue="5" className="mt-2 min-h-12 w-full rounded-lg border border-hairline px-3" /></label>{error && <p className="text-sm text-danger">{error}</p>}<button className="min-h-12 w-full rounded-lg bg-brand font-bold text-white">계산하기</button></form><section aria-live="polite" className="rounded-card border border-hairline bg-surface-subtle p-6"><h2 className="text-lg font-bold">예상 결과</h2>{result ? <dl className="mt-5 space-y-4">{[["최저 시급",result.hourly],["1일 임금",result.day],["주 기본임금",result.week],["주휴수당",result.holiday],["월 환산액",result.month]].map(([label,value])=><div key={String(label)} className="flex justify-between gap-4"><dt className="text-sm text-ink-soft">{label}</dt><dd className="font-bold text-ink">{formatWon(Number(value))}</dd></div>)}</dl> : <p className="mt-4 text-sm text-ink-muted">근로시간을 입력하면 일급·주급·월 환산액을 표시합니다.</p>}<p className="mt-6 text-xs leading-6 text-ink-muted">주 15시간 이상이고 소정근로일을 개근한다고 가정해 1일 평균 소정근로시간만큼 주휴시간을 반영한 참고값입니다. 불규칙 근무·결근·수습 감액·최저임금 산입범위는 별도로 확인하세요.</p></section></div>;
}
