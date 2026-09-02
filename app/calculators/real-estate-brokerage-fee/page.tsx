import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "부동산 중개보수 계산기", description: "서울 소재 주택 거래의 중개보수 상한액을 참고용으로 계산하세요.", path: "/calculators/real-estate-brokerage-fee" });
export default function Page() { return <Phase2CalculatorPage data={phase2PageData.brokerage} />; }
