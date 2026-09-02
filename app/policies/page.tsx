import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { policyData } from "@/lib/constants/policyData";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({ title: "정부 지원정책·정책대출 안내", description: "주거·부동산, 정책대출, 근로·소득, 청년·가족 지원제도를 공식 출처와 확인일 기준으로 안내합니다.", path: "/policies" });
const entries = [
  ["youth-jeonse-loan", policyData.youthJeonse], ["newlywed-jeonse-loan", policyData.newlywedJeonse],
  ["jeonse-guarantee-fee-support", policyData.guaranteeFee], ["youth-monthly-rent-support", policyData.youthRent],
  ["didimdol-home-loan", policyData.didimdol], ["bogeumjari-loan", policyData.bogeumjari],
  ["earned-income-tax-credit", policyData.earnedIncomeCredit], ["national-learning-card", policyData.learningCard],
] as const;
const categories = ["주거·부동산", "대출·금융", "근로·소득", "청년·가족"];

export default function Page() {
  return <Container className="py-10 sm:py-14"><Breadcrumbs items={[{ label: "홈", href: "/" }, { label: "지원정책" }]} />
    <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">정부 지원정책 한눈에 보기</h1>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">주거 지원에 한정하지 않고 정책대출, 근로·소득, 청년·가족 등 생활에 도움이 되는 실제 제도를 정리합니다. 각 정책은 독립 게시글로 남기고 공식 출처와 확인일을 표시합니다.</p>
    {categories.map(category => <section key={category} className="mt-10"><h2 className="text-xl font-bold text-ink">{category}</h2><div className="mt-4 grid gap-5 md:grid-cols-2">{entries.filter(([, item]) => item.category === category).map(([slug, item]) => <Link key={slug} href={"/policies/" + slug}><Card className="h-full"><span className="text-xs font-semibold text-brand">{item.status}</span><h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3><p className="mt-2 text-sm leading-7 text-ink-soft">{item.summary}</p><p className="mt-3 text-xs text-ink-muted">확인일 {item.checkedAt}</p></Card></Link>)}</div></section>)}
  </Container>;
}
