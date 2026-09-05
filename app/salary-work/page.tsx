import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { getCalculatorsByCategory } from "@/lib/constants/calculatorMetadata";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({ title: "급여·노동 계산기", description: "연봉 실수령액, 퇴직금, 주휴수당처럼 직장인과 아르바이트 근로자에게 필요한 계산을 확인하세요.", path: "/salary-work" });
const calculators = getCalculatorsByCategory("salary-work");
export default function SalaryWorkPage() { return <Container className="py-10 sm:py-14"><Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "급여·노동 계산기" }]} /><h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">급여·노동 계산기</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">입사 전 연봉 확인부터 재직 중 수당, 퇴사 전 퇴직금까지 근로생활에 필요한 계산을 모았습니다.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{calculators.map((calculator) => <CalculatorCard key={calculator.slug} calculator={calculator} showScope />)}</div><div className="mt-10"><CalculationNotice>급여와 수당은 근로계약, 사업장, 보험료 고지 및 관계 법령에 따라 달라질 수 있는 참고용 예상 계산입니다.</CalculationNotice></div><div className="mt-10 rounded-card border border-hairline bg-white p-6"><h2 className="text-lg font-bold text-ink">급여·노동 계산 가이드</h2><Link href="/guides/salary-work" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">입사·재직·퇴사 전 확인할 계산 보기 →</Link></div></Container>; }
