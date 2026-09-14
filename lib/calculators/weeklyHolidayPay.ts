import { MONTHLY_WEEKS, WEEKLY_HOLIDAY_MIN_HOURS } from "@/lib/constants/laborStandards";

export type Attendance = "yes" | "no" | "unknown";
export interface WeeklyHolidayPayInput { hourlyWage: number; weeklyHours: number; weeklyDays: number; attendance: Attendance; monthlyWeeks?: number }
export interface WeeklyHolidayPayResult { status: "eligible" | "ineligible" | "unknown"; reason: string; weeklyHolidayHours: number | null; weeklyPay: number | null; monthlyPay: number | null }

export function calculateWeeklyHolidayPay(input: WeeklyHolidayPayInput): WeeklyHolidayPayResult {
  const weeks = input.monthlyWeeks ?? MONTHLY_WEEKS;
  if (![input.hourlyWage, input.weeklyHours, input.weeklyDays, weeks].every(Number.isFinite) || input.hourlyWage <= 0 || input.weeklyHours < 0 || input.weeklyHours > 40 || input.weeklyDays <= 0 || input.weeklyDays > 7 || weeks <= 0) throw new Error("유효하지 않은 입력값입니다.");
  if (input.attendance === "unknown") return { status: "unknown", reason: "개근 여부를 확인해야 계산할 수 있습니다.", weeklyHolidayHours: null, weeklyPay: null, monthlyPay: null };
  if (input.weeklyHours < WEEKLY_HOLIDAY_MIN_HOURS) return { status: "ineligible", reason: "주 소정근로시간이 15시간 미만입니다.", weeklyHolidayHours: 0, weeklyPay: 0, monthlyPay: 0 };
  if (input.attendance === "no") return { status: "ineligible", reason: "소정근로일 개근이 아닌 것으로 입력되었습니다.", weeklyHolidayHours: 0, weeklyPay: 0, monthlyPay: 0 };
  const hours = input.weeklyHours / input.weeklyDays;
  const weeklyPay = Math.round(hours * input.hourlyWage);
  return { status: "eligible", reason: "입력 조건상 단순 계산 대상입니다.", weeklyHolidayHours: hours, weeklyPay, monthlyPay: Math.round(weeklyPay * weeks) };
}

