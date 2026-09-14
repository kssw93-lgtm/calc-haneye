import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "2026 연봉 실수령액 계산기 — 4대보험 자동 계산", description: "연봉에 맞춰 2026년 4대보험과 공식 간이세액표 소득세를 자동 계산해 월·연 예상 실수령액을 확인합니다.", path: "/calculators/salary-net-pay" });
export default function Page() { return <Phase2CalculatorPage data={{ ...phase2PageData.salary,
  description: "연봉에 맞춰 2026년 국민연금·건강보험·장기요양·고용보험과 공식 간이세액표 소득세를 자동 계산합니다. 비과세 제외 정기 월 급여 1천만원 미만·가족 1~11명 범위입니다.",
  steps: ["월급 또는 연봉과 세전 급여를 입력합니다.", "연봉에 포함된 비정기 상여·퇴직금 부분과 비과세 식대를 분리합니다.", "국민연금 적용 기간과 부양가족·자녀 수를 선택합니다.", "자동 계산된 4대보험과 소득세, 월·연 예상 실수령액을 확인합니다."],
  faqs: [{ question: "부양가족과 자녀 수를 자동 반영하나요?", answer: "공식 표 자동 조회에서는 본인 포함 가족 1~11명과 그중 8세 이상 20세 이하 공제대상 자녀를 반영합니다. 범위 밖은 직접 입력하세요." }, { question: "4대보험을 직접 입력할 수도 있나요?", answer: "가능합니다. 계산 방식을 급여명세서 공제액 직접 입력으로 바꾸면 실제 국민연금·건강보험·장기요양·고용보험 금액을 사용할 수 있습니다." }, { question: "연 예상 실수령액에 상여금도 포함되나요?", answer: "아닙니다. 결과는 비정기 상여·퇴직금·연말정산을 제외한 정기급여 12개월의 단순 합계입니다." }],
}} />; }
