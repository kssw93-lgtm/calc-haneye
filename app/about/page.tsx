import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { siteName } from "@/lib/constants/site";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "서비스 소개",
  description: `${siteName}가 제공하는 계산기와 서비스 원칙을 소개합니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "서비스 소개" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">서비스 소개</h1>

      <div className="mt-6 space-y-8 text-sm leading-relaxed text-ink-soft sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">{siteName}는 무엇을 제공하나요?</h2>
          <p className="mt-2">
            {siteName}는 한국 사용자가 대출 이자, 예상 퇴직금, 일반 1주택
            취득세를 로그인 없이 빠르게 계산해 볼 수 있는 무료 웹사이트입니다.
            입력값을 바탕으로 참고용 예상 결과를 즉시 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">제공 계산기</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {calculators.map((calculator) => (
              <li key={calculator.slug}>{calculator.title}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">서비스 원칙</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>쉽고 명확한 참고용 계산을 제공합니다.</li>
            <li>계산기 금액은 브라우저에서 처리합니다. 복지 검색어는 검색을 위해 외부 공공 API로 전송되므로 개인정보를 입력하지 마세요.</li>
            <li>로그인, 회원가입, 결제, 구독 기능을 두지 않습니다.</li>
            <li>계산기가 다루지 않는 조건은 정직하게 안내합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">운영 및 자료 작성 원칙</h2>
          <p className="mt-2">계산한눈에는 정부기관·금융기관의 공식 서비스가 아닌 독립적으로 운영하는 생활 계산 서비스입니다. 계산 결과와 설명은 운영자가 관리하며 전문 자격자의 개별 세무·노무 검토를 받은 상담 결과를 제공하는 서비스는 아닙니다.</p>
          <p className="mt-2">세율·요율은 공식 법령과 기관 안내를 우선 확인합니다. 공식 기준과 단순 환산 가정을 구분하고, 사례에 사용한 금액과 조건을 밝힙니다. 최종 검토일은 모든 예외까지 검증했다는 의미가 아니며 페이지에 표시한 지원 범위에 한정됩니다.</p>
          <p className="mt-2">복지검색은 한국사회보장정보원 OpenAPI 자료를 제공하는 정보 탐색 도구입니다. 검색 결과에 표시되는 지원사업은 신청 가능·선정·지급을 보장하지 않습니다. 신청 전 담당기관의 최신 공고를 확인하세요.</p>
          <p className="mt-2">오류를 발견하면 <a href="/contact" className="text-brand underline">문의 페이지</a>에 안내된 이메일로 페이지 주소, 계산 조건, 비교한 공식 출처를 보내주세요. 주민등록번호·계좌번호 등 개인정보는 보내지 마세요. 확인되지 않은 조건은 계산 범위를 제한하거나 안내를 보완합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink">결과 이용 시 유의사항</h2>
          <p className="mt-2">
            이 사이트의 모든 결과는 확정 세액, 확정 급여, 확정 대출 조건이
            아닙니다. 금융·세무·법률 자문을 대체하지 않으며, 실제 의사결정
            전에는 금융기관, 세무·노무 전문가 또는 관할기관의 최신 안내를
            확인해야 합니다.
          </p>
        </section>
      </div>
    </Container>
  );
}
