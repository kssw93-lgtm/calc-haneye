"use client";

import { useState, type FormEvent } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CalculatorInputCard } from "@/components/calculator/CalculatorInputCard";
import { CalculatorResultCard } from "@/components/calculator/CalculatorResultCard";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { EmptyResultState } from "@/components/calculator/EmptyResultState";
import { ResultCopyButton } from "@/components/calculator/ResultCopyButton";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatWon } from "@/lib/utils/currency";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";
import { calculateSavingsInterest } from "@/lib/calculators/savingsInterest";
import { calculateBrokerageFee } from "@/lib/calculators/realEstateBrokerageFee";
import { calculateMonthlyRentConversion } from "@/lib/calculators/monthlyRentConversion";

export type Phase2CalculatorKind = "salary" | "weekly" | "savings" | "brokerage" | "rent";
type DisplayResult = { lines: { label: string; value: string; emphasis?: boolean }[]; notice: string; copy: string };

const OPTIONS = {
  attendance: [{ value: "yes", label: "예" }, { value: "no", label: "아니오" }, { value: "unknown", label: "잘 모르겠어요" }],
  product: [{ value: "deposit", label: "예금" }, { value: "installment", label: "적금" }],
  method: [{ value: "simple", label: "단리" }, { value: "compound", label: "월복리" }],
  tax: [{ value: "general", label: "일반과세" }, { value: "special", label: "비과세·세금우대(별도 확인)" }],
  transaction: [{ value: "sale", label: "매매·교환" }, { value: "jeonse", label: "전세" }, { value: "monthlyRent", label: "월세" }],
  region: [{ value: "seoul", label: "서울특별시" }, { value: "unsupported", label: "그 외 지역(안내만 제공)" }],
  property: [{ value: "housing", label: "주택" }, { value: "other", label: "주택 외 부동산(미지원)" }],
  direction: [{ value: "depositToRent", label: "보증금 감소 → 월세 증가" }, { value: "rentToDeposit", label: "월세 감소 → 보증금 증가" }],
} as const;

export function Phase2Calculator({ kind }: { kind: Phase2CalculatorKind }) {
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [transaction, setTransaction] = useState("sale");
  const [direction, setDirection] = useState("depositToRent");

  function number(data: FormData, key: string) { const value = Number(String(data.get(key) ?? "").replaceAll(",", "")); if (!Number.isFinite(value)) throw new Error("숫자 입력값을 확인해 주세요."); return value; }
  function select(data: FormData, key: string) { return String(data.get(key) ?? ""); }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(null);
    const data = new FormData(event.currentTarget);
    try {
      let next: DisplayResult;
      if (kind === "weekly") {
        const value = calculateWeeklyHolidayPay({ hourlyWage: number(data, "hourlyWage"), weeklyHours: number(data, "weeklyHours"), weeklyDays: number(data, "weeklyDays"), attendance: select(data, "attendance") as "yes" | "no" | "unknown", monthlyWeeks: number(data, "monthlyWeeks") });
        next = { lines: [{ label: "적용 가능성", value: value.status === "eligible" ? "입력 조건상 계산 가능" : value.status === "unknown" ? "개근 여부 확인 필요" : "단순 계산상 미충족", emphasis: true }, ...(value.weeklyPay === null ? [] : [{ label: "주 예상 주휴수당", value: formatWon(value.weeklyPay) }, { label: "월 예상 주휴수당", value: formatWon(value.monthlyPay ?? 0) }]), ...(value.weeklyHolidayHours === null ? [] : [{ label: "주휴시간", value: `${value.weeklyHolidayHours.toFixed(2)}시간` }])], notice: value.reason, copy: `계산한눈에 주휴수당 결과\n${value.reason}\n주 예상액: ${value.weeklyPay === null ? "계산 제한" : formatWon(value.weeklyPay)}` };
      } else if (kind === "savings") {
        const value = calculateSavingsInterest({ product: select(data, "product") as "deposit" | "installment", principal: number(data, "principal"), annualRatePercent: number(data, "annualRatePercent"), termMonths: number(data, "termMonths"), method: select(data, "method") as "simple" | "compound", taxType: select(data, "taxType") as "general" | "special" });
        next = { lines: [{ label: "총 납입원금", value: formatWon(value.totalPrincipal) }, { label: "세전 예상 이자", value: formatWon(value.grossInterest), emphasis: true }, ...(value.estimatedTax === null ? [] : [{ label: "예상 세금", value: formatWon(value.estimatedTax) }, { label: "세후 예상 이자", value: formatWon(value.netInterest ?? 0) }, { label: "만기 예상 수령액", value: formatWon(value.maturityAmount ?? 0) }])], notice: value.taxNotice ?? "일반과세 15.4%를 단순 적용한 예상값이며 실제 상품 약관과 다를 수 있습니다.", copy: `계산한눈에 예·적금 이자 결과\n세전 이자: ${formatWon(value.grossInterest)}\n만기 예상액: ${value.maturityAmount === null ? "상품별 확인 필요" : formatWon(value.maturityAmount)}` };
      } else if (kind === "brokerage") {
        const value = calculateBrokerageFee({ region: select(data, "region") as "seoul" | "unsupported", propertyType: select(data, "propertyType") as "housing" | "other", transaction: select(data, "transaction") as "sale" | "jeonse" | "monthlyRent", amount: transaction === "monthlyRent" ? undefined : number(data, "amount"), deposit: transaction === "monthlyRent" ? number(data, "deposit") : undefined, monthlyRent: transaction === "monthlyRent" ? number(data, "monthlyRent") : undefined });
        next = value.supported ? { lines: [{ label: "산정 거래금액", value: formatWon(value.transactionAmount ?? 0) }, { label: "적용 상한요율", value: `${((value.rate ?? 0) * 100).toFixed(1)}%` }, { label: "예상 중개보수 상한액", value: formatWon(value.maximumFee ?? 0), emphasis: true }], notice: "서울 소재 주택 기준이며 실제 보수는 상한 이내에서 협의합니다. 부가가치세는 자동 합산하지 않았습니다.", copy: `계산한눈에 중개보수 결과\n상한액: ${formatWon(value.maximumFee ?? 0)}\n부가세 별도` } : { lines: [{ label: "계산 상태", value: "지원 범위 밖", emphasis: true }], notice: value.reason ?? "관할 조례 확인이 필요합니다.", copy: `계산한눈에 중개보수 결과\n${value.reason}` };
      } else if (kind === "rent") {
        const value = calculateMonthlyRentConversion({ direction: select(data, "direction") as "depositToRent" | "rentToDeposit", amount: number(data, "amount"), annualRatePercent: number(data, "annualRatePercent"), contractMonths: number(data, "contractMonths") });
        next = { lines: [{ label: direction === "depositToRent" ? "월 예상 증가액" : "보증금 환산액", value: value.convertedAmount === null ? "계산 불가" : formatWon(value.convertedAmount), emphasis: true }, ...(value.contractTotal === null ? [] : [{ label: "계약기간 단순 합계", value: formatWon(value.contractTotal) }])], notice: value.notice ?? "사용자가 입력한 전환율로 계산했습니다. 법정 상한 자동 판정 결과가 아닙니다.", copy: `계산한눈에 월세 전환 결과\n${value.convertedAmount === null ? "계산 불가" : formatWon(value.convertedAmount)}` };
      } else return;
      setResult(next); setIsStale(false);
    } catch (caught) { setResult(null); setError(caught instanceof Error ? caught.message : "입력값을 확인해 주세요."); }
  }

  if (kind === "salary") return <CalculatorResultCard title="공식 기준 검토 상태"><div className="space-y-4"><p className="text-lg font-bold text-caution">현재 수치 계산 준비 중</p><p className="text-sm leading-relaxed text-ink-soft">2026년 국민연금·건강보험 기준은 확인했지만, 부양가족 수에 따른 근로소득 간이세액표와 사업장별 보험료 상·하한을 완전히 검증하기 전에는 실수령액을 임의 계산하지 않습니다.</p><CalculationNotice>실제 급여명세서의 공제액은 상여, 비과세 항목, 보험료 기준소득, 부양가족, 원천징수 및 연말정산에 따라 달라집니다.</CalculationNotice></div></CalculatorResultCard>;

  return <CalculatorShell inputSlot={<CalculatorInputCard><form onSubmit={onSubmit} onChange={() => result && setIsStale(true)} className="space-y-5">{renderFields(kind, transaction, setTransaction, direction, setDirection)}{error ? <p className="text-sm text-danger">{error}</p> : null}<div className="flex flex-col gap-2.5"><Button type="submit" size="lg" fullWidth>계산하기</Button><Button type="reset" variant="secondary" fullWidth onClick={() => { setResult(null); setError(null); setIsStale(false); }}>초기화</Button></div></form></CalculatorInputCard>} resultSlot={<CalculatorResultCard>{!result ? <EmptyResultState /> : <div className="space-y-5">{isStale ? <div className="rounded-lg border border-caution/30 bg-caution-light px-4 py-3 text-sm text-caution">입력값이 변경되었습니다. 다시 계산해 주세요.</div> : null}<div className={isStale ? "opacity-50" : "space-y-3"}>{result.lines.map((line) => <ResultLine key={line.label} {...line} />)}<ResultCopyButton getText={() => result.copy} className="mt-4" /></div><CalculationNotice>{result.notice}</CalculationNotice></div>}</CalculatorResultCard>} />;
}

function renderFields(kind: Exclude<Phase2CalculatorKind, "salary">, transaction: string, setTransaction: (value: string) => void, direction: string, setDirection: (value: string) => void) {
  if (kind === "weekly") return <><Field label="시급" name="hourlyWage" suffix="원" /><Field label="주당 소정근로시간" name="weeklyHours" suffix="시간" /><Field label="1주 소정근로일수" name="weeklyDays" suffix="일" /><SelectField label="개근 여부" name="attendance" options={OPTIONS.attendance} /><Field label="월 환산 주 수" name="monthlyWeeks" defaultValue="4.345" /></>;
  if (kind === "savings") return <><SelectField label="상품 유형" name="product" options={OPTIONS.product} /><Field label="예치금 또는 월 납입액" name="principal" suffix="원" /><Field label="연 이자율" name="annualRatePercent" suffix="%" /><Field label="기간" name="termMonths" suffix="개월" /><SelectField label="이자 계산 방식" name="method" options={OPTIONS.method} /><SelectField label="과세 유형" name="taxType" options={OPTIONS.tax} /></>;
  if (kind === "brokerage") return <><SelectField label="지역" name="region" options={OPTIONS.region} /><SelectField label="부동산 유형" name="propertyType" options={OPTIONS.property} /><SelectField label="거래 유형" name="transaction" options={OPTIONS.transaction} onChange={(value) => setTransaction(value)} />{transaction === "monthlyRent" ? <><Field label="보증금" name="deposit" suffix="원" /><Field label="월차임" name="monthlyRent" suffix="원" /></> : <Field label="거래금액" name="amount" suffix="원" />}</>;
  return <><SelectField label="계산 방향" name="direction" options={OPTIONS.direction} onChange={(value) => setDirection(value)} /><Field label={direction === "depositToRent" ? "보증금 감소액" : "월세 감소액"} name="amount" suffix="원" /><Field label="사용자 입력 연 전환율" name="annualRatePercent" suffix="%" /><Field label="계약 기간" name="contractMonths" suffix="개월" defaultValue="12" /></>;
}

function Field({ label, name, suffix, defaultValue }: { label: string; name: string; suffix?: string; defaultValue?: string }) { return <FormField label={label} htmlFor={name} required><div className="relative"><Input id={name} name={name} inputMode="decimal" required defaultValue={defaultValue} className={suffix ? "pr-14" : undefined} />{suffix ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">{suffix}</span> : null}</div></FormField>; }
function SelectField({ label, name, options, onChange }: { label: string; name: string; options: readonly { value: string; label: string }[]; onChange?: (value: string) => void }) { return <FormField label={label} htmlFor={name} required><Select id={name} name={name} options={options} onChange={(event) => onChange?.(event.target.value)} /></FormField>; }
function ResultLine({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) { return <div className="flex items-baseline justify-between gap-3"><span className="text-sm text-ink-soft">{label}</span><span className={emphasis ? "text-xl font-bold text-brand text-right" : "text-base font-semibold text-ink text-right"}>{value}</span></div>; }
