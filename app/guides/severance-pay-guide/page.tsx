import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCTA } from "@/components/guides/CalculatorCTA";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { pageMetadata } from "@/lib/utils/seo";

const PATH = "/guides/severance-pay-guide";

export const metadata: Metadata = pageMetadata({
  title: "퇴직금 계산 전 확인할 5가지",
  description:
    "입사일, 임금 정보, 평균임금, 상여금·연차수당, 예외 조건 등 퇴직금 계산 전 점검할 항목을 안내합니다.",
  path: PATH,
});

const sections = [
  { id: "dates", label: "1. 입사일과 퇴사일" },
  { id: "wages", label: "2. 최근 3개월 임금" },
  { id: "average-wage", label: "3. 평균임금" },
  { id: "bonus", label: "4. 상여금 및 연차수당" },
  { id: "exceptions", label: "5. 휴직·결근·퇴직연금 등 예외 조건" },
  { id: "average-vs-ordinary", label: "평균임금과 통상임금의 차이" },
  { id: "pension-types", label: "퇴직연금 DB형·DC형 비교" },
  { id: "severance-tax", label: "퇴직소득세는 별도입니다" },
  { id: "checklist", label: "퇴직 전 체크리스트" },
];

const pensionRows = [
  {
    type: "DB형(확정급여형)",
    who: "회사",
    amount: "퇴직 시점 평균임금 × 근속연수 기준으로 사전에 정해진 금액",
    fit: "안정적이고 예측 가능한 퇴직급여를 원하는 경우",
  },
  {
    type: "DC형(확정기여형)",
    who: "근로자 본인",
    amount: "매년 적립된 부담금과 운용 성과에 따라 달라짐(확정되어 있지 않음)",
    fit: "적극적인 운용으로 더 높은 수익을 기대하는 경우",
  },
];

const checklist = [
  "입사일·퇴사일이 근로계약서·4대보험 가입 이력과 일치하는지",
  "퇴직 전 3개월 임금에 반영해야 할 수당이 빠짐없이 포함됐는지",
  "상여금·미사용 연차수당을 반영할지 여부와 그 기준을 알고 있는지",
  "휴직·결근 등으로 평균임금 산정 기간 조정이 필요한지",
  "퇴직연금(DB·DC) 가입 여부와 해당 제도의 실제 산정 방식",
  "퇴직소득세 등 실수령액에 영향을 주는 항목을 확인했는지",
];

const faqs = [
  {
    question: "평균임금이란 무엇인가요?",
    answer:
      "평균임금은 일반적으로 퇴직 전 일정 기간 동안 받은 임금 총액을 그 기간의 총일수로 나눈 금액을 말합니다. 정확한 산정 기준은 근로기준법 등 관련 법령과 실제 임금 구성에 따라 달라질 수 있습니다.",
  },
  {
    question: "퇴직 전 3개월 일수는 왜 직접 확인해야 하나요?",
    answer:
      "퇴직 전 3개월의 실제 역일수는 해당 기간에 포함된 월에 따라 달라질 수 있습니다(예: 28~31일). 정확한 평균임금 계산을 위해 실제 캘린더를 확인해 입력하는 것이 좋습니다.",
  },
  {
    question: "중간정산을 받은 적이 있으면 어떻게 되나요?",
    answer:
      "중간정산 이력이 있다면 정산 이후 기간을 기준으로 계속근로기간과 평균임금을 다시 산정해야 할 수 있습니다. 이 계산기는 중간정산을 반영하지 않으므로, 해당하는 경우 별도로 확인이 필요합니다.",
  },
  {
    question: "퇴직연금 가입자도 이 계산기를 참고할 수 있나요?",
    answer:
      "퇴직연금(DB형·DC형) 가입자는 실제 수령액 산정 방식이 이 계산기의 단순 계산식과 다를 수 있습니다. 참고용으로만 활용하고, 정확한 금액은 가입한 퇴직연금 제도와 운용사를 통해 확인하세요.",
  },
  {
    question: "퇴직금을 받으면 세금은 얼마나 떼이나요?",
    answer:
      "퇴직금에는 근로소득세가 아닌 퇴직소득세가 별도로 적용되며, 근속연수·금액에 따라 세액이 달라지는 국세 영역입니다. 이 계산기는 세전 예상 퇴직금만 계산하며 세금은 포함하지 않으므로, 정확한 세액은 국세청 홈택스 또는 세무 전문가를 통해 확인하세요.",
  },
];

export default function SeverancePayGuidePage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "계산 가이드", href: "/guides" },
          { label: "퇴직금 계산 가이드" },
        ]}
      />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        퇴직금 계산 전 확인할 5가지
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
        퇴직금은 입력하는 날짜와 임금 정보에 따라 크게 달라집니다. 계산기를
        사용하기 전에 아래 항목을 먼저 확인해 보세요.
      </p>

      <nav aria-label="목차" className="mt-6 rounded-card border border-hairline bg-white p-4">
        <p className="text-sm font-semibold text-ink">목차</p>
        <ul className="mt-2 space-y-1 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-brand hover:underline">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-soft sm:text-base">
        <section id="dates">
          <h2 className="text-lg font-bold text-ink">1. 입사일과 퇴사일</h2>
          <p className="mt-2">
            계속근로기간은 입사일과 퇴사일을 모두 포함해 계산합니다. 정확한
            날짜를 입력해야 재직기간과 퇴직금 수급 요건 충족 여부를 올바르게
            확인할 수 있습니다.
          </p>
        </section>

        <section id="wages">
          <h2 className="text-lg font-bold text-ink">2. 최근 3개월 임금</h2>
          <p className="mt-2">
            퇴직 전 3개월 동안 받은 임금 합계(기본급, 각종 수당 등 평균임금
            산정에 반영되는 금액)를 정확히 확인해야 합니다.
          </p>
        </section>

        <section id="average-wage">
          <h2 className="text-lg font-bold text-ink">3. 평균임금</h2>
          <p className="mt-2">
            평균임금은 퇴직 전 3개월 임금 합계를 해당 기간의 실제 일수로 나눈
            값입니다. 이 계산기는 사용자가 입력한 임금과 일수를 바탕으로
            단순 계산합니다.
          </p>
        </section>

        <CalculatorCTA hrefs={["/calculators/severance-pay"]} />
        <section id="bonus">
          <h2 className="text-lg font-bold text-ink">4. 상여금 및 연차수당</h2>
          <p className="mt-2">
            연간 상여금과 미사용 연차수당이 평균임금에 포함되는지는 임금
            구성과 법정 기준에 따라 다릅니다. 이 계산기는 사용자가 반영
            여부를 선택할 수 있는 단순 환산 옵션만 제공합니다.
          </p>
        </section>

        <section id="exceptions">
          <h2 className="text-lg font-bold text-ink">
            5. 휴직·결근·퇴직연금 등 예외 조건
          </h2>
          <p className="mt-2">
            휴직, 결근, 중간정산, 퇴직연금 가입, 근로계약 및 취업규칙상 특약
            등은 실제 퇴직금 산정에 영향을 줄 수 있으나 이 계산기에서는
            반영하지 않습니다. 해당 사항이 있다면 별도로 확인이
            필요합니다.
          </p>
        </section>

        <section id="average-vs-ordinary">
          <h2 className="text-lg font-bold text-ink">
            평균임금과 통상임금의 차이
          </h2>
          <p className="mt-2">
            통상임금은 근로계약에서 정기적·일률적으로 지급하기로 정한
            기본급성 임금(연장·야간·휴일수당 산정 등의 기준)이고, 평균임금은
            실제로 지급된 임금 총액을 기준 기간의 일수로 나눈 값(퇴직금
            산정 기준)입니다. 두 값이 항상 같지는 않으며, 상여금·수당 구성에
            따라 차이가 날 수 있습니다. 이 계산기는 사용자가 입력한 값을
            평균임금 산정용 임금으로 다룹니다.
          </p>
        </section>

        <section id="pension-types">
          <h2 className="text-lg font-bold text-ink">
            퇴직연금 DB형·DC형 비교
          </h2>
          <p className="mt-2">
            퇴직연금에 가입되어 있다면 제도 유형에 따라 실제 수령액 산정
            방식이 이 계산기의 단순 계산식과 다를 수 있습니다.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">
                퇴직연금 DB형과 DC형의 운용 주체, 수령액 결정 방식, 적합한 경우 비교
              </caption>
              <thead className="bg-surface-subtle text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    유형
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    운용 주체
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    수령액 결정 방식
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    적합한 경우
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {pensionRows.map((row) => (
                  <tr key={row.type}>
                    <td className="px-3 py-2 font-medium text-ink">
                      {row.type}
                    </td>
                    <td className="px-3 py-2">{row.who}</td>
                    <td className="px-3 py-2">{row.amount}</td>
                    <td className="px-3 py-2">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            정확한 수령액과 세부 조건은 가입한 퇴직연금 사업자(은행·증권사·보험사)를
            통해 확인하세요.
          </p>
        </section>

        <section id="severance-tax">
          <h2 className="text-lg font-bold text-ink">
            퇴직소득세는 별도입니다
          </h2>
          <p className="mt-2">
            퇴직금을 실제로 받을 때는 근속연수와 금액에 따라 계산되는
            퇴직소득세가 원천징수됩니다. 이 계산기는 세전 예상 퇴직금만
            계산하며 세금은 포함하지 않습니다. 정확한 세액은 국세청
            홈택스 또는 세무 전문가를 통해 확인하세요.
          </p>
        </section>

        <section id="checklist">
          <h2 className="text-lg font-bold text-ink">퇴직 전 체크리스트</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <CalculationNotice>
          정확한 퇴직금 산정 공식과 요건은 근로기준법 등 관계 법령, 고용노동부
          안내, 또는 노무 전문가를 통해 확인하는 것을 권장합니다.
        </CalculationNotice>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">자주 묻는 질문</h2>
        <div className="mt-3">
          <Accordion items={faqs} />
        </div>
      </section>

      <div className="mt-10 rounded-card border border-hairline bg-white p-6 text-center">
        <p className="text-sm text-ink-soft">
          직접 계산해 보고 싶다면 퇴직금 계산기를 이용해 보세요.
        </p>
        <div className="mt-4 flex justify-center">
          <Button href="/calculators/severance-pay">퇴직금 계산기로 이동</Button>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-muted">
        <Link href="/disclaimer" className="underline underline-offset-2">
          면책고지
        </Link>
        도 함께 확인해 주세요.
      </p>
    </Container>
  );
}
