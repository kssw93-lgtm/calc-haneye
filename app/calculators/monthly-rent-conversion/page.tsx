import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "월세 전환 계산기", description: "사용자가 입력한 전환율로 보증금과 월세의 단순 환산액을 계산하세요.", path: "/calculators/monthly-rent-conversion" });
export default function Page() { return <Phase2CalculatorPage data={phase2PageData.rent} />; }
