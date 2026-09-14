import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { WelfareSearch } from "@/components/welfare/WelfareSearch";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({ title: "중앙부처 복지서비스 검색", description: "청년·주거·일자리·생활지원 등 중앙부처 복지서비스를 검색하고 지원대상과 지원내용을 확인하세요.", path: "/welfare" });

export default function WelfarePage() {
  return <Container className="max-w-5xl py-10 sm:py-14">
    <Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "복지서비스 검색" }]} />
    <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">중앙부처 복지서비스 검색</h1>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">한국사회보장정보원의 중앙부처복지서비스 공공데이터를 이용해 지원제도를 검색합니다. 이 서비스는 정부기관이 운영하는 신청·자격판정 서비스가 아니며, 실제 신청은 복지로 또는 담당기관에서 진행해야 합니다.</p>
    <WelfareSearch />
    <section className="mt-10 border-t border-hairline pt-6"><h2 className="text-lg font-bold text-ink">데이터 출처와 이용 안내</h2><p className="mt-3 text-sm leading-7 text-ink-soft">출처: 한국사회보장정보원 중앙부처복지서비스 OpenAPI. 원본 데이터 갱신 시점과 실제 공고 사이에 차이가 있을 수 있으므로 지원금액·접수기간·소득 및 재산 기준은 공식 원문에서 다시 확인하세요.</p></section>
  </Container>;
}
