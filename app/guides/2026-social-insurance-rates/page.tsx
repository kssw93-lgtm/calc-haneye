import { SearchGuide } from "@/components/guides/SearchGuide";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata({ title: "2026년 4대보험 요율과 월급 공제 계산법", description: "2026년 국민연금, 건강보험, 장기요양보험, 고용보험의 근로자 부담률과 계산 기준을 정리합니다.", path: "/guides/2026-social-insurance-rates" });

export default function Page() {
  return <SearchGuide data={{
    title: "2026년 4대보험 요율과 월급 공제 계산법",
    intro: "월급에서 빠지는 4대보험은 세전 월급 전체에 같은 비율을 한 번 곱하는 구조가 아닙니다. 보험별 산정 기준과 부담 주체, 국민연금 상·하한을 따로 봐야 합니다.",
    category: "급여·노동", categoryHref: "/salary-work",
    facts: ["국민연금 총 보험료율은 9.5%, 직장가입 근로자 부담률은 4.75%입니다.", "직장 건강보험 총 보험료율은 7.19%, 근로자 부담률은 3.595%입니다.", "고용보험 실업급여분은 근로자와 사업주가 각각 0.9%를 부담하며 산재보험은 사업주가 전액 부담합니다."],
    sections: [
      { title: "국민연금 상·하한은 7월에 바뀝니다", body: "2026년 1~6월 기준소득월액은 40만 원~637만 원, 2026년 7월~2027년 6월은 41만 원~659만 원 범위입니다. 월 소득이 범위를 벗어나면 상한 또는 하한 기준으로 보험료가 정해질 수 있습니다." },
      { title: "장기요양보험료 계산", body: "2026년 장기요양보험료율은 0.9448%입니다. 직장가입자는 먼저 산정한 본인 건강보험료에 0.9448%÷7.19%를 곱해 본인 장기요양보험료를 추정할 수 있습니다." },
      { title: "월급명세서와 차이 나는 이유", body: "비과세 보수, 공단이 결정한 보수월액·기준소득월액, 입·퇴사월, 휴직, 두루누리 등 보험료 지원, 연말·퇴직 정산과 원 단위 처리 때문에 단순 계산 결과와 실제 고지액이 달라질 수 있습니다." },
      { title: "4대보험과 소득세는 별도입니다", body: "보험료 공제 후 금액은 최종 실수령액이 아닙니다. 근로소득세와 지방소득세, 사내 공제 등을 추가로 빼야 실제 지급액에 가까워집니다." },
    ],
    sources: [
      { name: "국민연금공단 2026년 보험료율", url: "https://ma.nps.or.kr/pnsinfo/ntpsklg/getOHAF0016M0.do?menuId=MN24001108" },
      { name: "국민연금공단 2026년 기준소득월액 상·하한", url: "https://m.nps.or.kr/pnsgdnc/newgdnc/getOHAE0001M1.do?hmpgBbsCd=BS20240137&hmpgCd=01&menuId=MN24000897&pageIndex=1&pstId=ZZ202600000000000147&sortSe=FR" },
      { name: "국민건강보험공단 2026년 보험료율", url: "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html" },
      { name: "고용보험 보험료율 안내", url: "https://edrm.ei.go.kr/ei/eih/eg/ei/eiEminsr/retrieveEi0301Info.do" },
      { name: "고용노동부 2026년 산재보험료율 고시", url: "https://www.moel.go.kr/info/lawinfo/instruction/view.do?bbs_seq=20251201757" },
    ],
    links: [{ label: "2026년 4대보험 계산기", href: "/calculators/social-insurance" }, { label: "연봉 실수령액 계산기", href: "/calculators/salary-net-pay" }, { label: "2027 최저임금 계산기", href: "/calculators/minimum-wage" }],
  }} />;
}
