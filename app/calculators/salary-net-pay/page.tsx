import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "연봉 실수령액 계산기 — 공식 세액표 조회", description: "공식 간이세액표 소득세와 직접 입력한 사회보험료로 월·연 정기급여 실수령액과 원천징수 비율을 비교합니다.", path: "/calculators/salary-net-pay" });
export default function Page() { return <Phase2CalculatorPage data={{ ...phase2PageData.salary,
  description: "공식 간이세액표 자동 조회와 소득세 직접 입력을 지원합니다. 보험료는 본인 고지액을 입력하며, 자동 조회는 비과세 제외 정기 월 급여 1천만원 미만·가족 1~11명 범위입니다.",
  steps: ["월급 또는 연봉과 세전 급여를 입력합니다.", "연봉에 포함된 비정기 상여·퇴직금 부분과 비과세 식대를 분리합니다.", "본인 사회보험 공제액을 입력하고 소득세 자동 조회 또는 직접 입력을 선택합니다.", "원천징수 비율별 정기급여 실수령액을 비교합니다."],
  faqs: [{ question: "부양가족과 자녀 수를 자동 반영하나요?", answer: "공식 표 자동 조회에서는 본인 포함 가족 1~11명과 그중 8세 이상 20세 이하 공제대상 자녀를 반영합니다. 범위 밖은 직접 입력하세요." }, { question: "식대를 바꾸면 공제액도 바뀌나요?", answer: "직접 입력 모드는 공제액을 자동 재산정하지 않습니다. 식대와 급여를 바꾸면 공제액도 다시 확인하세요." }, { question: "연 예상 실수령액에 상여금도 포함되나요?", answer: "아닙니다. 결과는 비정기 상여·퇴직금·연말정산을 제외한 정기급여 12개월의 단순 합계입니다." }],
}} />; }
