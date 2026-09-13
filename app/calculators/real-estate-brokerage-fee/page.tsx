import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "부동산 중개보수 계산기", description: "서울·경기·인천 주택 거래의 중개보수 상한액을 참고용으로 계산하세요.", path: "/calculators/real-estate-brokerage-fee" });
export default function Page() { return <><Phase2CalculatorPage data={phase2PageData.brokerage} /><section className="mx-auto max-w-5xl px-5 pb-10 text-sm leading-7"><h2 className="font-bold">지역별 공식 요율 확인</h2><p>2026년 9월 3일 세 지역의 주택 매매·임대차 구간 및 한도액을 대조했습니다. 현재 숫자는 같지만 전국 공통으로 확대 적용하지 않습니다. 중개사무소 소재지 관할 조례를 확인하세요.</p><a className="mr-4 text-brand underline" href="https://gris.gg.go.kr/reb/selectRebInfoView.do">경기도 공식 안내</a><a className="text-brand underline" href="https://imap.incheon.go.kr/sgp/por/info/brokerage.do">인천광역시 공식 안내</a></section></>; }
