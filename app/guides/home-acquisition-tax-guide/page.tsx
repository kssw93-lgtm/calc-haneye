import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCTA } from "@/components/guides/CalculatorCTA";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CalculationNotice } from "@/components/calculator/CalculationNotice";
import { pageMetadata } from "@/lib/utils/seo";

const PATH = "/guides/home-acquisition-tax-guide";

export const metadata: Metadata = pageMetadata({
  title: "주택 취득세 계산 전 확인할 조건",
  description:
    "취득가액, 취득 형태, 보유 주택 수, 감면 여부 등 취득세 계산 전에 확인할 조건을 안내합니다.",
  path: PATH,
});

const sections = [
  { id: "price", label: "1. 취득가액" },
  { id: "type", label: "2. 취득 형태" },
  { id: "home-count", label: "3. 보유 주택 수" },
  { id: "reduction", label: "4. 감면 여부" },
  { id: "property-type", label: "5. 주택 종류와 공동취득 여부" },
  { id: "bands", label: "6억/9억 구간의 기본세율 구조" },
  { id: "other-taxes", label: "지방교육세·농어촌특별세 등 별도 요소" },
  { id: "multi-home", label: "다주택자 중과세율 개요(참고용)" },
  { id: "deadline", label: "신고·납부 기한" },
  { id: "checklist", label: "취득세 신고 전 체크리스트" },
];

const baseRateRows = [
  { range: "6억 원 이하", rate: "1%" },
  { range: "6억 원 초과 ~ 9억 원 이하", rate: "구간세율(약 1~3%, 취득가액에 비례해 계산)" },
  { range: "9억 원 초과", rate: "3%" },
];

const multiHomeRows = [
  { count: "2주택", adjusted: "8%", nonAdjusted: "기본세율(1~3%)" },
  { count: "3주택", adjusted: "12%", nonAdjusted: "8%" },
  { count: "4주택 이상", adjusted: "12%", nonAdjusted: "12%" },
  { count: "법인", adjusted: "12%", nonAdjusted: "12%" },
];

const checklist = [
  "취득가액(과세표준)이 실제 계약서상 거래가액과 일치하는지",
  "개인·유상취득·1주택·감면 미적용 조건에 해당하는지, 아니면 별도 확인이 필요한 조건인지",
  "지방교육세·농어촌특별세 등 부가세목까지 포함한 총 납부세액을 위택스에서 확인했는지",
  "취득일로부터 신고·납부 기한(원칙 60일, 상속은 6개월) 내에 처리할 수 있는지",
  "다주택·법인·조정대상지역 등 중과 요건에 해당하지 않는지",
];

const faqs = [
  {
    question: "취득가액은 실거래가 기준인가요?",
    answer:
      "일반적으로 취득세는 실제 거래가액과 시가표준액 등을 비교해 정해진 과세표준을 기준으로 계산됩니다. 이 계산기는 사용자가 입력한 취득가액을 그대로 과세표준으로 가정한 단순 참고 계산이므로, 정확한 과세표준은 위택스 또는 관할 지방자치단체를 통해 확인해야 합니다.",
  },
  {
    question: "조정대상지역 여부도 입력해야 하나요?",
    answer:
      "이 계산기는 조정대상지역 여부를 입력받지 않습니다. 다주택·규제지역 중과세율은 1차 지원 범위 밖이며, 1주택 외 조건을 선택하면 수치 결과 대신 범위 밖 안내가 표시됩니다.",
  },
  {
    question: "공동명의로 취득하면 세액이 어떻게 달라지나요?",
    answer:
      "공동취득·지분취득은 지분 비율에 따라 개별 취득세 산정 방식이 달라질 수 있어 이 계산기의 1차 지원 범위에 포함되지 않습니다. 공동명의로 취득하는 경우 관할 지방자치단체 또는 세무전문가에게 확인하는 것이 좋습니다.",
  },
  {
    question: "오피스텔이나 상가도 이 계산기로 계산할 수 있나요?",
    answer:
      "계산할 수 없습니다. 이 계산기는 주택 취득만을 대상으로 하며, 오피스텔·토지·상가 등은 세율 체계가 달라 1차 지원 범위 밖으로 안내됩니다.",
  },
  {
    question: "취득세는 언제까지 신고·납부해야 하나요?",
    answer:
      "매매·증여 등 유상·무상 취득은 원칙적으로 취득일로부터 60일 이내, 상속은 사망일이 속한 달의 말일로부터 6개월 이내에 위택스 또는 관할 지방자치단체에 신고·납부해야 합니다. 기한을 넘기면 무신고 가산세 등이 부과될 수 있으므로 정확한 기한은 위택스에서 다시 확인하세요.",
  },
];

export default function HomeAcquisitionTaxGuidePage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "계산 가이드", href: "/guides" },
          { label: "주택 취득세 계산 가이드" },
        ]}
      />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        주택 취득세 계산 전 확인할 조건
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
        주택 취득세는 취득가액뿐 아니라 취득 형태, 보유 주택 수, 감면 여부
        등 여러 조건에 따라 크게 달라집니다. 계산 전에 아래 조건을 먼저
        확인해 보세요.
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
        <section id="price">
          <h2 className="text-lg font-bold text-ink">1. 취득가액</h2>
          <p className="mt-2">
            취득세율 구간과 세액은 취득가액에 따라 달라집니다. 실제 계약서상
            거래가액과 과세표준을 정확히 확인해야 합니다.
          </p>
        </section>

        <section id="type">
          <h2 className="text-lg font-bold text-ink">2. 취득 형태</h2>
          <p className="mt-2">
            매매 등 개인 유상취득인지, 상속·증여·법인 취득인지에 따라 적용
            세율과 계산 방식이 크게 달라집니다. 이 계산기는 개인·유상취득만
            수치로 계산합니다.
          </p>
        </section>

        <section id="home-count">
          <h2 className="text-lg font-bold text-ink">3. 보유 주택 수</h2>
          <p className="mt-2">
            세대 기준 보유 주택 수에 따라 다주택 중과세율이 적용될 수
            있습니다. 이 계산기는 1주택인 경우만 기본세율로 계산합니다.
          </p>
        </section>

        <section id="reduction">
          <h2 className="text-lg font-bold text-ink">4. 감면 여부</h2>
          <p className="mt-2">
            생애최초 주택 구입 등 각종 감면 요건을 충족하면 실제 납부세액이
            달라질 수 있습니다. 이 계산기는 감면 미적용 조건만 수치로
            계산합니다.
          </p>
        </section>

        <section id="property-type">
          <h2 className="text-lg font-bold text-ink">
            5. 주택 종류와 공동취득 여부
          </h2>
          <p className="mt-2">
            오피스텔, 토지, 상가 등은 주택과 세율 체계가 다르며, 공동취득·지분
            취득은 지분 비율에 따라 세액 산정 방식이 달라집니다. 이
            계산기는 단독 명의의 주택 취득만 수치로 계산합니다.
          </p>
        </section>

        <section id="bands">
          <h2 className="text-lg font-bold text-ink">
            6억/9억 구간의 기본세율 구조
          </h2>
          <p className="mt-2">
            일반 1주택 유상취득 기준으로 취득가액 6억 원 이하는 1%, 9억 원
            초과는 3%가 적용되며, 그 사이 구간은 취득가액에 비례해 세율이
            단계적으로 늘어나는 구간세율 공식이 적용됩니다. 이 구간세율은
            6억·9억 경계에서 세율이 계단식으로 급격히 뛰는 문제를 완화하기
            위해 도입되었습니다.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">
                취득가액 구간별 일반 1주택 유상취득 기본 취득세율
              </caption>
              <thead className="bg-surface-subtle text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    취득가액 구간
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    기본 취득세율
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {baseRateRows.map((row) => (
                  <tr key={row.range}>
                    <td className="px-3 py-2 font-medium text-ink">
                      {row.range}
                    </td>
                    <td className="px-3 py-2">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CalculatorCTA hrefs={["/calculators/home-acquisition-tax"]} />
        <section id="other-taxes">
          <h2 className="text-lg font-bold text-ink">
            지방교육세·농어촌특별세 등 별도 요소
          </h2>
          <p className="mt-2">
            실제 납부세액에는 기본 취득세 외에 지방교육세, 농어촌특별세 등
            부가세목이 추가로 포함될 수 있습니다. 일반적으로 지방교육세는
            취득세액의 10% 안팎, 농어촌특별세는 전용면적·감면 여부 등 조건에
            따라 부과 여부와 세율이 달라지는 것으로 알려져 있습니다. 이
            계산기는 기본 취득세만 계산하므로, 부가세목까지 포함한 정확한
            총 납부세액은 위택스에서 확인해야 합니다.
          </p>
        </section>

        <section id="multi-home">
          <h2 className="text-lg font-bold text-ink">
            다주택자 중과세율 개요(참고용)
          </h2>
          <p className="mt-2">
            이 계산기는 1주택만 지원하지만, 참고로 다주택·법인 취득 시
            적용될 수 있는 중과세율 구조는 아래와 같이 알려져 있습니다.
            지역(조정대상지역 여부)과 주택 수에 따라 세율이 크게 달라지므로,
            해당하는 경우 반드시 위택스 또는 관할 지방자치단체에서 정확한
            세율을 확인해야 합니다.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">
                조정대상지역·비조정대상지역별 다주택·법인 취득세 중과세율 참고표
              </caption>
              <thead className="bg-surface-subtle text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    보유 주택 수
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    조정대상지역
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    비조정대상지역
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {multiHomeRows.map((row) => (
                  <tr key={row.count}>
                    <td className="px-3 py-2 font-medium text-ink">
                      {row.count}
                    </td>
                    <td className="px-3 py-2">{row.adjusted}</td>
                    <td className="px-3 py-2">{row.nonAdjusted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            이 표는 일반적으로 알려진 구조를 요약한 참고 정보이며, 이
            계산기의 계산 범위에는 포함되지 않습니다. 감면·특례 등에 따라
            실제 적용 세율은 달라질 수 있습니다.
          </p>
        </section>

        <section id="deadline">
          <h2 className="text-lg font-bold text-ink">신고·납부 기한</h2>
          <p className="mt-2">
            취득세는 원칙적으로 취득일(잔금일 또는 등기일 중 빠른 날 등
            기준일)로부터 60일 이내에 위택스 또는 관할 지방자치단체에
            신고·납부해야 합니다. 상속으로 취득한 경우는 사망일이 속한
            달의 말일로부터 6개월 이내로 기한이 다릅니다. 기한 내 신고하지
            않으면 무신고 가산세, 납부하지 않으면 납부지연 가산세가 부과될
            수 있습니다.
          </p>
        </section>

        <section id="checklist">
          <h2 className="text-lg font-bold text-ink">
            취득세 신고 전 체크리스트
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
          이 가이드는 일반적인 개념 이해를 돕기 위한 참고 정보이며, 실제
          납부 전에는 위택스, 관할 지방자치단체 또는 세무전문가의 최신 안내를
          확인해야 합니다.
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
          직접 계산해 보고 싶다면 주택 취득세 계산기를 이용해 보세요.
        </p>
        <div className="mt-4 flex justify-center">
          <Button href="/calculators/home-acquisition-tax">
            주택 취득세 계산기로 이동
          </Button>
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
