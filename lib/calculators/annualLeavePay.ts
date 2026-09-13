export interface AnnualLeaveInput { startDate: string; asOfDate: string; attendance80: boolean; perfectMonths: number; unusedDays: number; hourlyOrdinaryWage: number; dailyHours: number; weeklyHours: number; workplaceFivePlus: boolean }
function fullMonths(start: Date, end: Date) { let months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth(); if (end.getUTCDate() < start.getUTCDate()) months -= 1; return months; }
export function calculateAnnualLeavePay(input: AnnualLeaveInput) {
  const start = new Date(`${input.startDate}T00:00:00Z`); const end = new Date(`${input.asOfDate}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end < start) throw new Error("입사일과 계산 기준일을 확인해 주세요.");
  if (!Number.isInteger(input.perfectMonths) || input.perfectMonths < 0 || input.perfectMonths > 12) throw new Error("개근한 월 수는 0~12개월로 입력하세요.");
  if (input.unusedDays < 0 || input.dailyHours <= 0 || input.dailyHours > 8 || input.hourlyOrdinaryWage < 0) throw new Error("수당 입력값을 확인해 주세요.");
  const months = fullMonths(start, end); const years = Math.floor(months / 12);
  const applicable = input.workplaceFivePlus && input.weeklyHours >= 15;
  let grantedDays = 0;
  if (applicable) grantedDays = years < 1 ? Math.min(11, months, input.perfectMonths) : input.attendance80 ? Math.min(25, 15 + Math.floor((years - 1) / 2)) : Math.min(12, input.perfectMonths);
  const payableUnusedDays = Math.min(grantedDays, input.unusedDays);
  return { completedMonths: months, completedYears: years, applicable, grantedDays, payableUnusedDays, dailyOrdinaryWage: input.hourlyOrdinaryWage * input.dailyHours, estimatedUnusedPay: input.hourlyOrdinaryWage * input.dailyHours * payableUnusedDays };
}
