export type InsuredPeriod = "under1" | "1to3" | "3to5" | "5to10" | "over10";
export interface UnemploymentBenefitInput { averageMonthlyWage: number; dailyHours: number; insuredPeriod: InsuredPeriod; olderOrDisabled: boolean }
const DAYS = { under50: { under1: 120, "1to3": 150, "3to5": 180, "5to10": 210, over10: 240 }, older: { under1: 120, "1to3": 180, "3to5": 210, "5to10": 240, over10: 270 } } as const;
export function calculateUnemploymentBenefit(input: UnemploymentBenefitInput) {
  if (!Number.isFinite(input.averageMonthlyWage) || input.averageMonthlyWage <= 0) throw new Error("평균 월급을 확인해 주세요.");
  if (!Number.isFinite(input.dailyHours) || input.dailyHours < 1 || input.dailyHours > 8) throw new Error("1일 소정근로시간은 1~8시간으로 입력하세요.");
  const estimatedAverageDailyWage = input.averageMonthlyWage / 30;
  const rawDailyBenefit = estimatedAverageDailyWage * 0.6;
  const floor = 10_320 * 0.8 * input.dailyHours;
  const dailyBenefit = Math.min(68_100, Math.max(floor, rawDailyBenefit));
  const benefitDays = DAYS[input.olderOrDisabled ? "older" : "under50"][input.insuredPeriod];
  return { estimatedAverageDailyWage, rawDailyBenefit, floor, ceiling: 68_100, dailyBenefit, benefitDays, totalBenefit: dailyBenefit * benefitDays };
}
