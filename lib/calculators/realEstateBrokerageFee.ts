import { SEOUL_BROKERAGE_RATES } from "@/lib/constants/brokerageFeeRates";

export type BrokerageTransaction = "sale" | "jeonse" | "monthlyRent";
export interface BrokerageInput { region: "seoul" | "unsupported"; propertyType: "housing" | "other"; transaction: BrokerageTransaction; amount?: number; deposit?: number; monthlyRent?: number }
export interface BrokerageResult { supported: boolean; reason?: string; transactionAmount?: number; rate?: number; maximumFee?: number; vatIncluded: false }

export function calculateBrokerageFee(input: BrokerageInput): BrokerageResult {
  if (input.region !== "seoul") return { supported: false, reason: "서울 외 지역은 관할 조례 확인이 필요합니다.", vatIncluded: false };
  if (input.propertyType !== "housing") return { supported: false, reason: "주택 외 부동산은 지원하지 않습니다.", vatIncluded: false };
  let transactionAmount: number;
  if (input.transaction === "monthlyRent") {
    if (!Number.isFinite(input.deposit) || !Number.isFinite(input.monthlyRent) || (input.deposit ?? 0) < 0 || (input.monthlyRent ?? 0) <= 0) throw new Error("유효하지 않은 입력값입니다.");
    transactionAmount = (input.deposit ?? 0) + (input.monthlyRent ?? 0) * 100;
    if (transactionAmount < 50_000_000) transactionAmount = (input.deposit ?? 0) + (input.monthlyRent ?? 0) * 70;
  } else {
    if (!Number.isFinite(input.amount) || (input.amount ?? 0) <= 0) throw new Error("유효하지 않은 입력값입니다.");
    transactionAmount = input.amount ?? 0;
  }
  const kind = input.transaction === "sale" ? "sale" : "lease";
  const band = SEOUL_BROKERAGE_RATES[kind].find((item) => transactionAmount < item.maxExclusive);
  if (!band) throw new Error("요율 구간을 찾을 수 없습니다.");
  const raw = transactionAmount * band.rate;
  return { supported: true, transactionAmount, rate: band.rate, maximumFee: Math.floor(band.cap ? Math.min(raw, band.cap) : raw), vatIncluded: false };
}

