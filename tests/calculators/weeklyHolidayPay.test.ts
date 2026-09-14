import { describe, expect, it } from "vitest";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";

describe("calculateWeeklyHolidayPay", () => {
  it("주 20시간·5일·개근을 계산한다", () => expect(calculateWeeklyHolidayPay({ hourlyWage: 10_000, weeklyHours: 20, weeklyDays: 5, attendance: "yes" })).toMatchObject({ status: "eligible", weeklyHolidayHours: 4, weeklyPay: 40_000, monthlyPay: 173_800 }));
  it("15시간 미만은 0원이다", () => expect(calculateWeeklyHolidayPay({ hourlyWage: 10_000, weeklyHours: 14.5, weeklyDays: 5, attendance: "yes" }).weeklyPay).toBe(0));
  it("정확히 15시간은 계산한다", () => expect(calculateWeeklyHolidayPay({ hourlyWage: 10_000, weeklyHours: 15, weeklyDays: 5, attendance: "yes" }).weeklyPay).toBe(30_000));
  it("개근이 아니면 0원이다", () => expect(calculateWeeklyHolidayPay({ hourlyWage: 10_000, weeklyHours: 20, weeklyDays: 5, attendance: "no" }).status).toBe("ineligible"));
  it("개근을 모르면 수치를 내지 않는다", () => expect(calculateWeeklyHolidayPay({ hourlyWage: 10_000, weeklyHours: 20, weeklyDays: 5, attendance: "unknown" }).weeklyPay).toBeNull());
  it("잘못된 입력을 거부한다", () => expect(() => calculateWeeklyHolidayPay({ hourlyWage: 0, weeklyHours: 20, weeklyDays: 5, attendance: "yes" })).toThrow());
});
