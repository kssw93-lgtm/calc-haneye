import { z } from "zod";
export const realEstateBrokerageFeeSchema = z.object({ region: z.enum(["seoul", "gyeonggi", "incheon", "unsupported"]), propertyType: z.enum(["housing", "other"]), transaction: z.enum(["sale", "jeonse", "monthlyRent"]), amount: z.coerce.number().nonnegative().optional(), deposit: z.coerce.number().nonnegative().optional(), monthlyRent: z.coerce.number().nonnegative().optional() });
export type RealEstateBrokerageFeeFormValues = z.infer<typeof realEstateBrokerageFeeSchema>;
