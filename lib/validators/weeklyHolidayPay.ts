import { z } from "zod";
export const weeklyHolidayPaySchema = z.object({ hourlyWage: z.coerce.number().positive(), weeklyHours: z.coerce.number().min(0).max(40), weeklyDays: z.coerce.number().int().min(1).max(7), attendance: z.enum(["yes", "no", "unknown"]), monthlyWeeks: z.coerce.number().positive() });
export type WeeklyHolidayPayFormValues = z.infer<typeof weeklyHolidayPaySchema>;
