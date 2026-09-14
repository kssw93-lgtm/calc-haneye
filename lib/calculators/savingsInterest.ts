import { GENERAL_INTEREST_INCOME_TAX_RATE } from "@/lib/constants/savingsInterestRates";

export type SavingsProduct = "deposit" | "installment";
export type InterestMethod = "simple" | "compound";
export type TaxType = "general" | "special";
export interface SavingsInterestInput { product: SavingsProduct; principal: number; annualRatePercent: number; termMonths: number; method: InterestMethod; taxType: TaxType }
export interface SavingsInterestResult { totalPrincipal: number; grossInterest: number; estimatedTax: number | null; netInterest: number | null; maturityAmount: number | null; taxNotice?: string }

export function calculateSavingsInterest(input: SavingsInterestInput): SavingsInterestResult {
  const { principal, annualRatePercent, termMonths } = input;
  if (![principal, annualRatePercent, termMonths].every(Number.isFinite) || principal <= 0 || annualRatePercent < 0 || termMonths <= 0 || !Number.isInteger(termMonths)) throw new Error("유효하지 않은 입력값입니다.");
  const monthlyRate = annualRatePercent / 100 / 12;
  const totalPrincipal = input.product === "deposit" ? principal : principal * termMonths;
  let grossInterest = 0;
  if (input.product === "deposit") grossInterest = input.method === "simple" ? principal * monthlyRate * termMonths : principal * ((1 + monthlyRate) ** termMonths - 1);
  else for (let month = 1; month <= termMonths; month += 1) { const remaining = termMonths - month; grossInterest += input.method === "simple" ? principal * monthlyRate * remaining : principal * ((1 + monthlyRate) ** remaining - 1); }
  const roundedGross = Math.round(grossInterest);
  if (input.taxType === "special") return { totalPrincipal, grossInterest: roundedGross, estimatedTax: null, netInterest: null, maturityAmount: null, taxNotice: "비과세·세금우대 요건은 상품별로 확인해야 합니다." };
  const estimatedTax = Math.floor(roundedGross * GENERAL_INTEREST_INCOME_TAX_RATE);
  const netInterest = roundedGross - estimatedTax;
  return { totalPrincipal, grossInterest: roundedGross, estimatedTax, netInterest, maturityAmount: totalPrincipal + netInterest };
}

