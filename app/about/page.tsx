import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { siteName } from "@/lib/constants/site";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "서비스 소개",
  description: `${siteName}를 운영하는 방식, 계산 결과 검증 절차, 금융 뉴스 작성 원칙을 소개합니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "서비스 소개" }]} />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">서비스 소개</h1>
      <p className="mt-2 text-xs text-ink-muted">최종 수정일: 2026-09-26</p>

      <div className="mt-6 space-y-8 text-sm leading-relaxed text-ink-soft sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">{siteName}는 무엇을 제공하나요?</h2>
          <p className="mt-2">
            {siteName}는 한국 사용자가 대출 이자, 예상 퇴직금, 일반 1주택
            취득세를 로그인 없이 빠르게 계산해 볼 수 있는 무료 웹사이트입니다.
            입력값을 바탕으로 참고용 예상 결과를 즉시 확인할 수 있고, 관련
            지원정책과 금융 뉴스도 함께 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">누가, 어떻게 운영하나요?</h2>
          <p className="mt-2">
            {siteName}는 개인이 기획·개발·운영하는 1인 서비스입니다. 별도의
            편집부나 상담 인력을 두지 않으며, 세무사·노무사 등 전문 자격을
            대신하지 않습니다. 정부기관·금융기관과 제휴하거나 그 명의를
            빌리지 않고, 공개된 법령·공식 발표·공공데이터를 근거로 직접
            계산 로직과 설명을 작성합니다.
          </p>
          <p className="mt-2">
            운영자와 직접 연락하려면{" "}
            <a href="/contact" className="text-brand underline">문의 페이지</a>
            의 이메일을 이용하세요. 오류 제보, 계산 조건에 대한 질문 모두
            운영자가 직접 확인하고 답변합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">계산 결과는 어떻게 검증하나요?</h2>
          <p className="mt-2">
            각 계산기는 국세청·고용노동부 등 관할 기관이 공개한 계산 방식과
            법령상 산식을 기준으로 만들었습니다. 새 계산기를 게시하기 전에는
            관할 기관이 안내하는 예시나 이미 알려진 계산 사례에 같은 조건을
            넣어 결과가 일치하는지 직접 대조합니다. 각 계산기 페이지의
            &ldquo;가상 예시&rdquo; 섹션은 그 대조에 쓴 조건과 결과를 그대로
            공개한 것입니다.
          </p>
          <p className="mt-2">
            법령이나 요율이 개정되면 계산기 페이지에 적용 기준일과 최종
            검토일을 표시합니다. 계산기가 반영하지 않는 조건(우대금리,
            중도상환수수료, 감면·공제 특례 등)은 각 페이지의 &ldquo;주의사항&rdquo;에
            숨기지 않고 명시합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">금융 뉴스는 어떻게 작성하나요?</h2>
          <p className="mt-2">
            금융 뉴스 게시판의 글은 특정 매체의 기사를 그대로 옮기거나 요약한
            것이 아니라, 정부·기관의 공식 발표 자료와 다수 언론사의 보도를
            함께 대조해 운영자가 직접 작성합니다. 여러 자료를 대조하는
            과정에서 서로 다른 사실관계나 시점 오류가 발견되면(예: 특정
            지표가 처음 기록을 세웠다는 일부 보도가 실제로는 이전 기록을
            반영하지 못한 경우) 정정한 뒤 게시합니다.
          </p>
          <p className="mt-2">
            기사에서 인용한 통계·발표는 본문 안에서 발표 주체와 시점을 밝혀
            표기하며, 자체 제작한 인포그래픽에는 근거 자료명과 제작 사실을
            표시합니다. 투자 권유나 특정 금융상품 가입을 유도하지 않고,
            정보 전달을 목적으로 합니다.
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
