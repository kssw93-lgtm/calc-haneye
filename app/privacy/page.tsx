import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { contactEmail, siteName } from "@/lib/constants/site";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "개인정보처리방침",
  description: `${siteName}의 개인정보처리방침입니다.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "홈", href: "/" }, { label: "개인정보처리방침" }]}
      />
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        개인정보처리방침
      </h1>
      <p className="mt-2 text-xs text-ink-muted">최종 수정일: 2026-08-31</p>

      <div className="mt-6 space-y-8 text-sm leading-relaxed text-ink-soft sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">1. 수집하는 개인정보</h2>
          <p className="mt-2">
            {siteName}는 대출 이자, 퇴직금, 주택 취득세 계산기를 제공하는
            과정에서 이름, 이메일, 전화번호 등 개인을 식별할 수 있는 정보를
            별도로 수집하지 않습니다. 계산기에 입력하는 금액, 날짜 등의
            값은 사용자의 브라우저(클라이언트) 안에서만 계산에 사용되며,
            서버로 전송되거나 데이터베이스에 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">2. 로그인 및 회원 정보</h2>
          <p className="mt-2">
            현재 {siteName}는 로그인, 회원가입, 결제, 구독 기능을 제공하지
            않으므로 관련 개인정보를 수집·보관하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">
            3. 광고 및 쿠키(Cookie) 정책
          </h2>
          <p className="mt-2">
            본 사이트는 향후 및 현재 원활한 서비스 제공과 통계 분석, 맞춤형
            광고 게재를 위해 Google AdSense 등 제3자 광고 서비스를 이용할 수
            있습니다. Google을 포함한 제3자 제공업체는 사용자의 이전 방문
            기록을 바탕으로 쿠키(Cookie)를 사용하여 광고를 게재합니다.
            사용자는 브라우저 설정이나 Google 광고 설정 페이지에서 쿠키
            사용 및 개인 맞춤 광고 게재를 비활성화할 수 있습니다.
          </p>
          <p className="mt-2">
            현재 이 사이트는 실제 광고 스크립트를 삽입하지 않은 상태이며,
            광고가 실제로 노출되기 시작하는 시점과 조건은 이 페이지를 통해
            안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">4. 문의</h2>
          <p className="mt-2">
            개인정보 관련 문의는{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="underline underline-offset-2"
            >
              {contactEmail}
            </a>
            로 연락해 주세요.
          </p>
        </section>

        <p className="text-xs text-ink-muted">
          본 방침은 법률 자문이 아니며, 서비스 변경에 따라 사전 고지 후
          개정될 수 있습니다.
        </p>
      </div>
    </Container>
  );
}
