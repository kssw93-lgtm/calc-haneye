import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "연봉 실수령액 계산기", description: "연봉 실수령액의 공제 구조와 공식 기준 검토 상태를 확인하세요.", path: "/calculators/salary-net-pay" });
export default function Page() { return <Phase2CalculatorPage data={phase2PageData.salary} />; }
