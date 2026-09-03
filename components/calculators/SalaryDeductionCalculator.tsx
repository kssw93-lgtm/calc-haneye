"use client";

import { useState, type FormEvent } from "react";
import { calculateSalaryDeductions, type SalaryDeductionInput } from "@/lib/calculators/salaryDeductionSimulation";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CalculatorInputCard } from "@/components/calculator/CalculatorInputCard";
import { CalculatorResultCard } from "@/components/calculator/CalculatorResultCard";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatWon } from "@/lib/utils/currency";

const fields = [
  ["grossPay", "세전 연봉 또는 월급 (식대 포함)", undefined],
  ["annualBonusIncluded", "연봉에 포함된 비정기 상여금 (연간, 없으면 0)", "0"],
  ["annualRetirementIncluded", "제시된 연봉에 포함된 퇴직금 부분 (연간, 별도면 0)", "0"],
  ["nonTaxableMeal", "위 급여에 포함된 비과세 식대 (월, 최대 20만원)", "0"],
  ["pension", "국민연금 본인 월 공제액", undefined],
  ["health", "건강보험 본인 월 공제액", undefined],
  ["longTermCare", "장기요양보험 본인 월 공제액", undefined],
  ["employment", "고용보험 본인 월 공제액", undefined],
  ["incomeTaxAt100", "홈택스에서 조회한 100% 기준 월 소득세", undefined],
] as const;

export function SalaryDeductionCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateSalaryDeductions> | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const amounts = Object.fromEntries(fields.map(([name]) => {
        const text = String(data.get(name) ?? "").trim().replaceAll(",", "");
        if (!text) throw new Error("모든 금액을 입력하세요. 공제가 없으면 0을 입력하세요.");
        return [name, Number(text)];
      }));
      const input = { ...amounts, payBasis: data.get("payBasis"), withholdingPercent: Number(data.get("withholdingPercent")) } as SalaryDeductionInput;
      setResult(calculateSalaryDeductions(input)); setError("");
    } catch (caught) {
      setResult(null); setError(caught instanceof Error && caught.name !== "ZodError" ? caught.message : "금액은 범위 내의 0 이상 정수로 입력해 주세요. 식대는 월 20만원 이하입니다.");
    }
  }
  return <div className="space-y-5">
    <CalculationNotice>공제액 직접 입력 모드 · 공식 간이세액표 자동 계산이 아닙니다. 부양가족 수와 8세 이상 20세 이하 자녀 등 해당 표의 조건을 홈택스에서 확인한 후 100% 기준 소득세를 입력하세요. 실제 급여와 연말정산 결과를 보장하지 않습니다.</CalculationNotice>
    <a className="inline-block font-semibold text-brand underline" href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583" target="_blank" rel="noreferrer">국세청 원천징수 안내·홈택스 조회 경로 ↗</a>
    <CalculatorShell inputSlot={<CalculatorInputCard><form className="space-y-4" onSubmit={submit} onChange={() => { setResult(null); setError(""); }} onReset={() => { setResult(null); setError(""); }}>
      <label className="block text-sm font-medium" htmlFor="salary-payBasis">입력 기준<select className="mt-2 block w-full rounded-lg border p-3" name="payBasis" id="salary-payBasis"><option value="annual">연봉</option><option value="monthly">월급 (상여·퇴직금 제외 정기급여)</option></select></label>
      <p className="text-xs leading-6 text-ink-soft">정기 월급 비교를 위해 비정기 상여·퇴직금 부분을 빼고 12개월로 나눕니다. 월급 선택 시 두 연간 포함액은 0으로 입력하세요. 퇴직금 부분의 분리는 약정의 적법성 판단이나 퇴직금 산정이 아닙니다.</p>
      {fields.map(([name, label, defaultValue]) => <label key={name} className="block text-sm font-medium" htmlFor={`salary-${name}`}>{label}<Input className="mt-2" name={name} id={`salary-${name}`} inputMode="numeric" required defaultValue={defaultValue} placeholder="원 단위 입력" /></label>)}
      <label className="block text-sm font-medium" htmlFor="salary-ratio">원천징수 비율<select className="mt-2 block w-full rounded-lg border p-3" name="withholdingPercent" id="salary-ratio" defaultValue="100"><option value="80">80%</option><option value="100">100%</option><option value="120">120%</option></select></label>
      <p className="text-xs leading-6 text-ink-soft">공제액은 동일한 월 급여 조건의 본인 부담액만 입력하세요. 산재보험 사업주 부담액은 입력하지 않습니다. 비과세 식대 변경 시 공제액도 별도로 다시 조회해야 합니다.</p>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      <Button type="submit" fullWidth>입력 공제액으로 계산하기</Button><Button type="reset" variant="secondary" fullWidth>초기화</Button>
    </form></CalculatorInputCard>} resultSlot={<CalculatorResultCard title="직접 입력 공제액 기준 예상 결과"><div aria-live="polite">{result ? <div className="space-y-4">{[
      ["월 세전 정기급여", result.monthlyGross], ["식대 제외 월 급여 (참고)", result.taxableMonthly], ["사회보험 본인 공제 합계", result.insurance], ["근로소득세 예상액", result.incomeTax], ["지방소득세 예상액", result.localIncomeTax], ["월 예상 실수령액", result.monthlyNet], ["정기급여 12개월 단순 합계", result.annualNet],
    ].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2"><span className="text-sm">{label}</span><strong>{formatWon(Number(value))}</strong></div>)}<CalculationNotice>참고용 예상 계산입니다. 지방소득세는 소득세의 10%로 단순 계산하며 세액은 10원 미만 절사합니다. 연 합계는 상여·퇴직금·연말정산을 제외한 같은 정기급여 12개월 가정입니다. 원천징수 비율 변경은 최종 세금 절감을 의미하지 않습니다.</CalculationNotice></div> : <p className="text-sm text-ink-soft">급여와 확인된 공제액을 입력하면 항목별 예상 결과가 표시됩니다. 자동 세액표 대조 기능은 아직 제공하지 않습니다.</p>}</div></CalculatorResultCard>} />
  </div>;
}
