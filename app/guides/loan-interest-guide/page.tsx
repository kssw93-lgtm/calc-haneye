import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { pageMetadata } from "@/lib/utils/seo";

const PATH = "/guides/loan-interest-guide";

export const metadata: Metadata = pageMetadata({
  title: "대출 상환 방식, 무엇이 다를까요?",
  description:
    "원리금균등상환, 원금균등상환, 만기일시상환의 차이와 월 납입 흐름을 비교합니다.",
  path: PATH,
});

const sections = [
  { id: "equal-payment", label: "원리금균등상환" },
  { id: "equal-principal", label: "원금균등상환" },
  { id: "bullet-payment", label: "만기일시상환" },
  { id: "comparison", label: "월 납입 흐름 비교" },
  { id: "who", label: "어떤 방식을 살펴볼까요" },
  { id: "concepts", label: "함께 확인하면 좋은 개념" },
  { id: "checklist", label: "대출 실행 전 체크리스트" },
];

const comparisonRows = [
  {
    method: "원리금균등상환",
    early: "중간",
    late: "동일(중간)",
    totalInterest: "중간",
    fit: "매월 일정한 금액으로 예산을 관리하고 싶은 경우",
  },
  {
    method: "원금균등상환",
    early: "가장 큼",
    late: "가장 작음",
    totalInterest: "가장 적음",
    fit: "초기 상환 여력이 있고 총 이자를 줄이고 싶은 경우",
  },
  {
    method: "만기일시상환",
    early: "가장 작음(이자만)",
    late: "동일(이자만) → 만기에 원금 일시",
    totalInterest: "가장 많음",
    fit: "초기 월 상환 부담을 최소화하고 싶은 경우",
  },
];

const concepts = [
  {
    term: "거치기간",
    description:
      "원금 상환 없이 이자만 납입하는 기간입니다. 거치기간 동안은 월 부담이 적지만, 거치기간이 끝나면 남은 기간에 원금을 상환해야 해 이후 월 납입액이 커질 수 있습니다.",
  },
  {
    term: "고정금리·변동금리",
    description:
      "고정금리는 대출 기간 동안 금리가 유지되고, 변동금리는 시장금리에 따라 일정 주기로 금리가 바뀝니다. 이 계산기는 사용자가 입력한 단일 금리를 기준으로 계산하며, 금리 변동은 반영하지 않습니다.",
  },
  {
    term: "우대금리",
    description:
      "급여 이체, 자동이체, 카드 실적 등 금융기관이 정한 조건을 충족하면 기준금리에서 일정폭을 깎아주는 할인 금리입니다. 조건 충족 여부에 따라 실제 적용 금리가 달라집니다.",
  },
  {
    term: "DSR·LTV",
    description:
      "DSR(총부채원리금상환비율)은 소득 대비 모든 대출의 연간 원리금 상환액 비율을, LTV(주택담보대출비율)는 담보가치 대비 대출 가능 금액의 비율을 뜻합니다. 대출 한도와 실행 가능 여부를 좌우하는 핵심 기준이지만, 이 계산기는 한도 심사를 대신하지 않습니다.",
  },
  {
    term: "중도상환수수료",
    description:
      "대출 기간이 끝나기 전에 원금 일부 또는 전부를 미리 갚을 때 부과될 수 있는 수수료입니다. 상품과 경과 기간에 따라 면제되거나 요율이 달라질 수 있습니다.",
  },
];

const checklist = [
  "대출 목적에 맞는 상환 방식을 선택했는지(예산 관리 vs. 총 이자 절감 vs. 초기 부담 최소화)",
  "가정한 금리가 실제 적용 가능한 금리(우대금리 포함)와 얼마나 차이 나는지",
  "거치기간이 있다면 거치기간 종료 후 월 납입액이 어떻게 늘어나는지",
  "중도상환 계획이 있다면 수수료 조건은 어떤지",
  "DSR·LTV 등 대출 한도 심사를 통과할 수 있는 조건인지",
];

const faqs = [
  {
    question: "상환 방식은 나중에 바꿀 수 있나요?",
    answer:
      "일반적으로 상환 방식은 대출 실행 시 정해지며, 이후 변경은 금융기관과 상품 약관에 따라 가능 여부가 다릅니다. 정확한 변경 가능 여부는 이용 중인 금융기관에 확인해야 합니다.",
  },
  {
    question: "총 이자가 가장 적은 방식은 무엇인가요?",
    answer:
      "동일한 원금·금리·기간이라면 일반적으로 원금균등상환의 총 이자가 가장 적고, 만기일시상환의 총 이자가 가장 많은 경향이 있습니다. 다만 실제 상품 조건에 따라 달라질 수 있으므로 계산기로 직접 비교해 보는 것이 좋습니다.",
  },
  {
    question: "초기 상환 부담이 적은 방식은 무엇인가요?",
    answer:
      "원리금균등상환은 매월 동일한 금액을 납입해 예측이 쉽고, 만기일시상환은 만기 전까지 이자만 납입해 월 부담이 가장 적은 편입니다. 다만 만기일시상환은 만기에 원금 전액을 한 번에 상환해야 하는 부담이 있습니다.",
  },
  {
    question: "계산기로 무엇을 미리 확인할 수 있나요?",
    answer:
      "대출 이자 계산기를 사용하면 동일한 원금·금리·기간 조건에서 상환 방식별 월 납입액, 총 상환액, 총 이자를 미리 비교해 볼 수 있습니다. 다만 실제 상품 조건과는 차이가 있을 수 있습니다.",
  },
  {
    question: "거치기간이나 중도상환수수료도 계산기에 반영되나요?",
    answer:
      "반영되지 않습니다. 이 계산기는 원금, 금리, 기간, 상환 방식만으로 계산하며, 거치기간·변동금리·우대금리·중도상환수수료·DSR·LTV 등은 포함하지 않습니다. 관련 조건은 이용 중이거나 이용 예정인 금융기관에 확인하세요.",
  },
];

export default function LoanInterestGuidePage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "계산 가이드", href: "/guides" },
          { label: "대출 상환 방식 가이드" },
        ]}
      />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        대출 상환 방식, 무엇이 다를까요?
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
        대출은 상환 방식에 따라 매월 납입액과 총 이자가 크게 달라집니다. 세
        가지 대표적인 상환 방식의 특징을 비교해 보세요.
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
        <section id="equal-payment">
          <h2 className="text-lg font-bold text-ink">원리금균등상환</h2>
          <p className="mt-2">
            매월 동일한 금액(원금+이자)을 납입하는 방식입니다. 초기에는 이자
            비중이 크고, 시간이 지날수록 원금 비중이 커집니다. 매월 납입액이
            일정해 예산 관리가 쉬운 편입니다.
          </p>
        </section>

        <section id="equal-principal">
          <h2 className="text-lg font-bold text-ink">원금균등상환</h2>
          <p className="mt-2">
            매월 동일한 원금을 상환하고, 이자는 남은 원금에 비례해 계산되어
            점차 줄어드는 방식입니다. 첫 달 납입액이 가장 크고 만기에 가까울
            수록 납입액이 줄어듭니다.
          </p>
        </section>

        <section id="bullet-payment">
          <h2 className="text-lg font-bold text-ink">만기일시상환</h2>
          <p className="mt-2">
            만기 전까지는 매월 이자만 납입하고, 만기에 원금 전액을 한 번에
            상환하는 방식입니다. 월 납입 부담은 가장 적지만, 만기 시 목돈
            상환 부담이 있습니다.
          </p>
        </section>

        <section id="comparison">
          <h2 className="text-lg font-bold text-ink">월 납입 흐름 비교</h2>
          <p className="mt-2">
            동일한 원금·금리·기간을 기준으로 하면, 초기 월 납입액은
            원금균등상환이 가장 크고 만기일시상환이 가장 적은 경향이
            있습니다. 반대로 총 이자는 원금균등상환이 가장 적고 만기일시상환이
            가장 많은 경향이 있습니다. 정확한 수치는 대출 이자 계산기로 직접
            비교해 보세요.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">
                상환 방식별 초기·후기 월 납입액, 총 이자 경향, 적합한 경우 비교
              </caption>
              <thead className="bg-surface-subtle text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    상환 방식
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    초기 월 납입액
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    후기 월 납입액
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    총 이자
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    적합한 경우
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {comparisonRows.map((row) => (
                  <tr key={row.method}>
                    <td className="px-3 py-2 font-medium text-ink">
                      {row.method}
                    </td>
                    <td className="px-3 py-2">{row.early}</td>
                    <td className="px-3 py-2">{row.late}</td>
                    <td className="px-3 py-2">{row.totalInterest}</td>
                    <td className="px-3 py-2">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            표는 동일한 원금·금리·기간을 가정했을 때의 일반적인 경향이며,
            정확한 금액은 대출 이자 계산기로 직접 확인하세요.
          </p>
        </section>

        <section id="who">
          <h2 className="text-lg font-bold text-ink">어떤 방식을 살펴볼 수 있나요</h2>
          <p className="mt-2">
            매월 일정한 예산 관리를 원한다면 원리금균등상환을, 총 이자를
            줄이고 싶고 초기 상환 여력이 있다면 원금균등상환을, 초기 상환
            부담을 최소화하고 싶다면 만기일시상환을 살펴볼 수 있습니다. 다만
            실제 선택은 소득, 자금 계획, 금융기관 상품 조건을 종합적으로
            고려해야 합니다.
          </p>
        </section>

        <section id="concepts">
          <h2 className="text-lg font-bold text-ink">
            함께 확인하면 좋은 개념
          </h2>
          <p className="mt-2">
            상환 방식 못지않게 아래 개념도 실제 대출 조건에 큰 영향을 줍니다.
            이 계산기는 아래 항목을 반영하지 않으므로, 참고 개념으로만
            확인하고 정확한 내용은 금융기관에 문의하세요.
          </p>
          <dl className="mt-4 space-y-4">
            {concepts.map((concept) => (
              <div key={concept.term}>
                <dt className="font-semibold text-ink">{concept.term}</dt>
                <dd className="mt-1">{concept.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="checklist">
          <h2 className="text-lg font-bold text-ink">
            대출 실행 전 체크리스트
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <CalculationNotice>
          위 설명은 일반적인 경향을 안내하는 참고 정보이며, 실제 상품 조건과
          금리는 금융기관별로 다를 수 있습니다. 정확한 조건은 이용 중이거나
          이용 예정인 금융기관에 확인하세요.
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
          직접 계산해 보고 싶다면 대출 이자 계산기를 이용해 보세요.
        </p>
        <div className="mt-4 flex justify-center">
          <Button href="/calculators/loan-interest">대출 이자 계산기로 이동</Button>
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
