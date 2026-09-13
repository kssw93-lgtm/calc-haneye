export type PensionPeriod = "first-half" | "second-half";

export interface SocialInsuranceInput {
  monthlyInsurableWage: number;
  pensionPeriod: PensionPeriod;
}

const RATES = {
  pensionEmployee: 0.0475,
  healthEmployee: 0.0719 / 2,
  longTermCareToHealth: 0.009448 / 0.0719,
  employmentEmployee: 0.009,
} as const;

const PENSION_LIMITS: Record<PensionPeriod, { min: number; max: number }> = {
  "first-half": { min: 400_000, max: 6_370_000 },
  "second-half": { min: 410_000, max: 6_590_000 },
};

function truncateToTenWon(value: number) {
  // 정수여야 할 값이 26999.999999...로 표현되는 부동소수점 오차만 보정합니다.
  return Math.floor((value + 1e-6) / 10) * 10;
}

export function calculateSocialInsurance(input: SocialInsuranceInput) {
  const wage = Number(input.monthlyInsurableWage);
  if (!Number.isFinite(wage) || wage <= 0) {
    throw new Error("월 보수액을 0원보다 크게 입력해 주세요.");
  }

  const limits = PENSION_LIMITS[input.pensionPeriod];
  if (!limits) throw new Error("국민연금 적용 기간을 선택해 주세요.");

  // 국민연금 기준소득월액은 천 원 단위이며 적용 기간별 상·하한을 둡니다.
  const pensionBase = Math.min(limits.max, Math.max(limits.min, Math.floor(wage / 1_000) * 1_000));
  const nationalPension = truncateToTenWon(pensionBase * RATES.pensionEmployee);
  const healthInsurance = truncateToTenWon(wage * RATES.healthEmployee);
  const longTermCare = truncateToTenWon(healthInsurance * RATES.longTermCareToHealth);
  const employmentInsurance = truncateToTenWon(wage * RATES.employmentEmployee);
  const industrialAccident = 0;
  const employeeTotal = nationalPension + healthInsurance + longTermCare + employmentInsurance;

  return {
    monthlyInsurableWage: wage,
    pensionBase,
    pensionMinimum: limits.min,
    pensionMaximum: limits.max,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    industrialAccident,
    employeeTotal,
    estimatedNetAfterInsurance: wage - employeeTotal,
    rates: RATES,
  };
}
