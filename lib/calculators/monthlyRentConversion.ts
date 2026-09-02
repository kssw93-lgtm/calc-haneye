export type RentConversionDirection = "depositToRent" | "rentToDeposit";
export interface RentConversionInput { direction: RentConversionDirection; amount: number; annualRatePercent: number; contractMonths: number }
export interface RentConversionResult { convertedAmount: number | null; contractTotal: number | null; notice?: string }

export function calculateMonthlyRentConversion(input: RentConversionInput): RentConversionResult {
  if (![input.amount, input.annualRatePercent, input.contractMonths].every(Number.isFinite) || input.amount <= 0 || input.annualRatePercent < 0 || input.contractMonths <= 0) throw new Error("유효하지 않은 입력값입니다.");
  const rate = input.annualRatePercent / 100;
  if (input.direction === "rentToDeposit" && rate === 0) return { convertedAmount: null, contractTotal: null, notice: "전환율이 0%이면 보증금 환산액을 계산할 수 없습니다." };
  const convertedAmount = input.direction === "depositToRent" ? Math.round(input.amount * rate / 12) : Math.round(input.amount * 12 / rate);
  return { convertedAmount, contractTotal: input.direction === "depositToRent" ? convertedAmount * input.contractMonths : input.amount * input.contractMonths };
}
