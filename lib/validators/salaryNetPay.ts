import { z } from "zod";
export const salaryNetPaySchema = z.object({ payBasis: z.enum(["annual", "monthly"]), grossPay: z.coerce.number().positive(), dependents: z.coerce.number().int().min(1), childrenUnder20: z.coerce.number().int().min(0), nonTaxableMeal: z.coerce.number().nonnegative() });
export type SalaryNetPayFormValues = z.infer<typeof salaryNetPaySchema>;
