import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "예·적금 이자 계산기", description: "예금·적금의 세전 이자와 일반과세 기준 세후 예상 수령액을 계산하세요.", path: "/calculators/savings-interest" });
export default function Page() { return <Phase2CalculatorPage data={phase2PageData.savings} />; }
