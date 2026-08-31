/**
 * 취득세 세율 상수 및 메타데이터
 *
 * 이 파일은 "개인·유상취득·일반 1주택·감면 미적용" 조건의 기본 취득세율만 다룹니다.
 * 지방교육세, 농어촌특별세, 다주택 중과, 법인 취득, 생애최초 등 감면, 상속·증여,
 * 공동취득, 지분취득, 오피스텔/토지/상가 등은 포함하지 않습니다.
 *
 * 6억원 이하 1%, 6억원 초과~9억원 이하 구간세율((취득가액/1억)×(2/3)−3)%,
 * 9억원 초과 3% 구조는 옛 취득세율의 "문턱 효과"(6억/9억 경계에서 세율이
 * 계단식으로 뛰는 문제)를 완화하기 위해 도입된 구간별 슬라이딩 세율로,
 * 지방세법 제11조 제1항 제8호 개정(2020-01-01 시행)에 따른 것입니다.
 * 2026-08-31 웹 검색으로 세율 구조·구간·산식이 현재도 유효함을 교차 확인했으나,
 * law.go.kr/wetax.go.kr 접속이 네트워크 정책상 차단되어 있어 원문 조문을 직접
 * 열람하지는 못했습니다.
 *
 * TODO(배포 전 필수 확인): 아래 세율·기준은 배포 직전 국가법령정보센터
 * (law.go.kr), 위택스(wetax.go.kr), 행정안전부의 최신 공식 원문으로 반드시
 * 다시 한 번 직접 대조해야 합니다. 제도는 예고 없이 개정될 수 있습니다.
 */

export const HOME_ACQUISITION_TAX_REFERENCE = {
  effectiveDate: "2020-01-01",
  lastReviewedAt: "2026-08-31",
  sourceName: "지방세법 제11조 제1항 제8호(국가법령정보센터)",
  sourceUrl: "https://www.law.go.kr/",
  scope: "개인·유상취득·일반 1주택·감면 미적용 조건의 기본 취득세 참고 계산",
  notes:
    "지방교육세, 농어촌특별세, 다주택 중과, 법인 취득, 생애최초 등 각종 감면, " +
    "상속·증여, 공동취득·지분취득, 오피스텔·토지·상가 등 특수 조건은 포함하지 " +
    "않습니다. 배포 전 최신 법령·위택스·관할 지방자치단체 안내를 반드시 " +
    "재확인해야 합니다.",
} as const;

const LOWER_BAND_MAX_WON = 600_000_000;
const UPPER_BAND_MAX_WON = 900_000_000;

const LOWER_BAND_RATE = 0.01;
const UPPER_BAND_RATE = 0.03;

/**
 * 일반 1주택 유상취득 기본 취득세율(decimal)을 반환합니다.
 * 6억 이하 1%, 6억 초과~9억 이하 구간세율, 9억 초과 3%.
 */
export function getGeneralOneHomeAcquisitionTaxRate(priceWon: number): number {
  if (priceWon <= LOWER_BAND_MAX_WON) {
    return LOWER_BAND_RATE;
  }

  if (priceWon <= UPPER_BAND_MAX_WON) {
    const priceInHundredMillionWon = priceWon / 100_000_000;
    const ratePercent = priceInHundredMillionWon * (2 / 3) - 3;
    return ratePercent / 100;
  }

  return UPPER_BAND_RATE;
}
