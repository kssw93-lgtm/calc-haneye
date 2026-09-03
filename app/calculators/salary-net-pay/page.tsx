import { Phase2CalculatorPage } from "@/components/calculator/Phase2CalculatorPage";
import { phase2PageData } from "@/lib/constants/phase2PageData";
import { pageMetadata } from "@/lib/utils/seo";
export const metadata = pageMetadata({ title: "연봉 실수령액 계산기 — 공제액 직접 입력", description: "확인한 사회보험료와 홈택스 소득세를 직접 입력해 월·연 정기급여 실수령액과 원천징수 비율을 비교합니다.", path: "/calculators/salary-net-pay" });
export default function Page() { return <Phase2CalculatorPage data={{ ...phase2PageData.salary,
  description: "공식 간이세액표 자동 계산은 검증 대기 중입니다. 지금은 확인한 월 사회보험 공제액과 100% 기준 소득세를 직접 입력해 정기급여 실수령액을 비교할 수 있습니다.",
  steps: ["월급 또는 연봉과 세전 급여를 입력합니다.", "연봉에 포함된 비정기 상여·퇴직금 부분과 비과세 식대를 분리합니다.", "동일 급여 조건의 본인 사회보험 공제액과 홈택스 100% 기준 소득세를 입력합니다.", "원천징수 비율별 정기급여 실수령액을 비교합니다."],
  faqs: [{ question: "부양가족과 자녀 수를 자동 반영하나요?", answer: "아직 자동 반영하지 않습니다. 홈택스에서 해당 조건으로 조회한 100% 기준 소득세를 직접 입력해야 합니다." }, { question: "식대를 바꾸면 공제액도 바뀌나요?", answer: "직접 입력 모드는 공제액을 자동 재산정하지 않습니다. 식대와 급여를 바꾸면 공제액도 다시 확인하세요." }, { question: "연 예상 실수령액에 상여금도 포함되나요?", answer: "아닙니다. 결과는 비정기 상여·퇴직금·연말정산을 제외한 정기급여 12개월의 단순 합계입니다." }],
}} />; }
