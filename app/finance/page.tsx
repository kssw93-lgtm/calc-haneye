import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { getCalculatorsByCategory } from "@/lib/constants/calculatorMetadata";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "금융 계산기",
  description:
    "대출 이자와 예·적금 이자처럼 돈을 빌리거나 모을 때 필요한 계산기를 확인하세요.",
  path: "/finance",
});

const calculators = getCalculatorsByCategory("finance");

export default function FinancePage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "금융 계산기" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">금융 계산기</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        돈을 빌리거나 모을 때 필요한 대출 이자와 예·적금 이자를 한곳에서
        확인하세요.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.slug}
            calculator={calculator}
            showScope
          />
        ))}
      </div>

      <div className="mt-10">
        <CalculationNotice>
          위 계산 결과는 모두 참고용 예상 계산입니다. 실제 금리·세금·상품 조건은
          금융기관 및 최신 공식 안내로 다시 확인하세요.
        </CalculationNotice>
      </div>
    </Container>
  );
}
