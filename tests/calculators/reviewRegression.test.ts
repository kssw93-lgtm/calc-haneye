import { expect, it } from 'vitest';
import { calculateWeeklyHolidayPay } from '@/lib/calculators/weeklyHolidayPay';
import { calculateSavingsInterest } from '@/lib/calculators/savingsInterest';
import { getGeneralOneHomeAcquisitionTaxRate } from '@/lib/constants/taxRates';
it('rounds the acquisition tax rate after conversion to decimal', () => {
  expect(getGeneralOneHomeAcquisitionTaxRate(700000000)).toBe(0.0167);
});
it('20 hours over fewer days does not inflate proportional weekly holiday pay', () => {
  expect(calculateWeeklyHolidayPay({ hourlyWage: 10320, weeklyHours: 20, weeklyDays: 3, attendance: 'yes' }).weeklyPay).toBe(41280);
});
it('twelve monthly installments earn 12 through 1 months of interest', () => {
  expect(calculateSavingsInterest({ product: 'installment', principal: 100000, annualRatePercent: 6, termMonths: 12, method: 'simple', taxType: 'general' }).grossInterest).toBe(39000);
});
it('a one-month installment earns one month of interest', () => {
  expect(calculateSavingsInterest({ product: 'installment', principal: 100000, annualRatePercent: 6, termMonths: 1, method: 'simple', taxType: 'general' }).grossInterest).toBe(500);
});
