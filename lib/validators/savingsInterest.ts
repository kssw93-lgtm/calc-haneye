import { z } from "zod";
export const savingsInterestSchema = z.object({ product: z.enum(["deposit", "installment"]), principal: z.coerce.number().positive(), annualRatePercent: z.coerce.number().min(0).max(100), termMonths: z.coerce.number().int().positive().max(1200), method: z.enum(["simple", "compound"]), taxType: z.enum(["general", "special"]) });
export type SavingsInterestFormValues = z.infer<typeof savingsInterestSchema>;
