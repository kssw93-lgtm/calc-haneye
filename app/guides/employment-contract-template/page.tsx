import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCTA } from "@/components/guides/CalculatorCTA";
import { Download, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import { pageMetadata } from "@/lib/utils/seo";

const PATH = "/guides/employment-contract-template";
const MOEL_PAGE = "https://www.moel.go.kr/info/etc/dataroom/view.do?bbs_seq=20250300356";
const MOEL_DOWNLOAD = "https://www.moel.go.kr/common/downloadFile.do?bbs_id=29&bbs_seq=20250300356&file_ext=hwp&file_seq=20250800411";

export const metadata: Metadata = pageMetadata({
  title: "표준근로계약서 양식 다운로드와 작성 방법",
  description: "고용노동부 2025년 개정 표준근로계약서 HWP를 내려받고 임금, 근로시간, 휴일 등 작성 전 필수 확인사항을 살펴보세요.",
  path: PATH,
});

const requiredItems = [
  ["임금", "기본급과 수당의 구성, 계산방법, 지급방법과 지급일을 구체적으로 확인합니다."],
  ["소정근로시간", "업무 시작·종료 시각과 휴게시간을 구분하고, 교대제라면 근무표 적용 방식도 확인합니다."],
  ["휴일", "주휴일이 어느 요일인지, 유급 적용 조건이 무엇인지 계약 내용과 실제 근무표를 함께 봅니다."],
  ["연차 유급휴가", "발생과 사용은 근로기준법 및 사업장 조건에 따라 달라질 수 있으므로 단순히 ‘법정 기준’이라고만 쓰지 않았는지 확인합니다."],
  ["근무 장소와 업무", "실제 근무할 장소와 담당 업무를 적고, 변경 가능 범위가 지나치게 넓지 않은지 확인합니다."],
];

const faqs = [
  { question: "근로계약서는 반드시 작성해야 하나요?", answer: "사용자는 근로계약을 체결할 때 임금, 소정근로시간, 휴일, 연차 유급휴가 등 법에서 정한 근로조건을 명시해야 하며, 주요 항목이 적힌 서면을 근로자에게 교부해야 합니다." },
  { question: "전자문서로 받아도 되나요?", answer: "근로기준법은 서면에 전자문서를 포함합니다. 다만 근로자가 내용을 계속 확인하고 보관할 수 있는 형태인지 살펴보는 것이 좋습니다." },
  { question: "표준 양식을 그대로 사용하면 모든 문제가 해결되나요?", answer: "아닙니다. 고용노동부 표준 양식은 참고용이며 실제 근무형태, 임금 구성, 교대제, 기간제·단시간 여부에 맞게 내용을 작성해야 합니다." },
  { question: "서명한 계약서를 회사만 보관해도 되나요?", answer: "주요 근로조건이 적힌 계약서는 근로자에게도 교부해야 합니다. 서명 전 빈칸을 확인하고 교부받은 파일이나 종이를 보관하세요." },
];

export default function EmploymentContractTemplatePage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: "표준근로계약서 양식 다운로드와 작성 방법", dateModified: "2026-09-02", mainEntityOfPage: PATH };
  return <Container className="max-w-3xl py-10 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "급여·노동", href: "/salary-work" }, { label: "표준근로계약서" }]} />
    <article>
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">표준근로계약서 양식 다운로드와 작성 방법</h1>
      <p className="mt-4 text-base leading-8 text-ink-soft">입사 전에는 연봉 숫자만 확인하기보다 임금 구성, 근로시간, 휴게시간, 휴일과 담당 업무를 계약서에 구체적으로 남기는 것이 중요합니다. 아래 파일은 고용노동부가 2025년 개정 법령을 반영해 배포한 공식 HWP 양식입니다.</p>

      <section className="mt-8 rounded-card border border-brand/20 bg-brand-light p-6">
        <p className="text-xs font-semibold text-brand">고용노동부 공식 자료 · 2025년 3월 게시</p>
        <h2 className="mt-2 text-xl font-bold text-ink">개정 표준근로계약서 내려받기</h2>
        <p className="mt-2 text-sm leading-7 text-ink-soft">다운로드는 고용노동부 서버에서 직접 제공됩니다. HWP 파일을 열 수 있는 한글 문서 프로그램이 필요합니다.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={MOEL_DOWNLOAD} className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"><Download className="h-4 w-4" />표준근로계약서 HWP 다운로드</a>
          <a href={MOEL_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand"><ExternalLink className="h-4 w-4" />고용노동부 원문 확인</a>
        </div>
      </section>

      <section className="mt-12"><h2 className="text-xl font-bold text-ink">계약서에 확인할 핵심 항목</h2><div className="mt-4 space-y-4">{requiredItems.map(([title, description]) => <div key={title} className="rounded-lg border border-hairline bg-white p-4"><h3 className="font-semibold text-ink">{title}</h3><p className="mt-1 text-sm leading-7 text-ink-soft">{description}</p></div>)}</div></section>

      <section className="mt-12"><h2 className="text-xl font-bold text-ink">서명하기 전에 점검하세요</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft"><li>계약기간의 시작일과 종료일 또는 기간의 정함이 없다는 표시가 명확한지 확인합니다.</li><li>‘월급에 각종 수당 포함’처럼 범위가 모호하지 않고 기본급과 수당이 구분되어 있는지 확인합니다.</li><li>근무 시작·종료 시각과 휴게시간이 실제 근무 방식과 일치하는지 확인합니다.</li><li>작성하지 않은 빈칸을 남긴 채 서명하지 말고, 수정한 부분은 당사자가 함께 확인합니다.</li><li>서명한 계약서를 종이나 전자파일로 교부받아 급여명세서와 함께 보관합니다.</li></ul></section>

      <CalculatorCTA hrefs={["/calculators/weekly-holiday-pay", "/calculators/salary-net-pay"]} />
      <p className="text-sm"><Link href="/calculators/severance-pay" className="font-semibold text-brand hover:underline">퇴직금도 함께 확인하기 →</Link></p>

      <section className="mt-12"><h2 className="text-xl font-bold text-ink">자주 묻는 질문</h2><div className="mt-4"><Accordion items={faqs} /></div></section>

      <section className="mt-10 border-t border-hairline pt-6"><h2 className="text-lg font-bold text-ink">확인한 공식 근거</h2><ul className="mt-3 space-y-2 text-sm"><li><a href={MOEL_PAGE} target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">고용노동부 개정 표준근로계약서·표준취업규칙 게시 ↗</a></li><li><a href="https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1012792605" target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">국가법령정보센터 근로기준법 제17조 ↗</a></li></ul><p className="mt-3 text-xs leading-6 text-ink-muted">표준 양식은 참고용입니다. 개별 근로관계와 최신 법령에 맞는지는 고용노동부 고객상담센터 1350 또는 관할 지방고용노동관서에 확인하세요.</p></section>
    </article>
  </Container>;
}
