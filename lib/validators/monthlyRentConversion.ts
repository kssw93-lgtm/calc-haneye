import { z } from "zod";
export const monthlyRentConversionSchema = z.object({ direction: z.enum(["depositToRent", "rentToDeposit"]), amount: z.coerce.number().positive(), annualRatePercent: z.coerce.number().min(0).max(100), contractMonths: z.coerce.number().int().positive().max(1200) });
export type MonthlyRentConversionFormValues = z.infer<typeof monthlyRentConversionSchema>;
