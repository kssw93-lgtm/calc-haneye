import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "주휴수당 계산기", description: "시급과 주 소정근로시간, 개근 여부로 주·월 예상 주휴수당을 계산하세요.", path: "/calculators/weekly-holiday-pay" });
export default function Page() { return <Phase2CalculatorPage data={phase2PageData.weekly} />; }
