import { blocks, json, safeHttpsUrl, tag, upstream } from "../../_shared/welfare.js";

const related = (xml, name) => blocks(xml, name).map(item => ({ name: tag(item, "servSeDetailNm"), url: safeHttpsUrl(tag(item, "servSeDetailLink")) })).filter(item => item.name || item.url);

export async function onRequestGet(context) {
  const serviceKey = context.env.WELFARE_API_KEY;
  const id = String(context.params.id || "");
  if (!serviceKey) return json({ error: "복지서비스 인증키가 설정되지 않았습니다." }, 503);
  if (!/^WLF\d{8}$/.test(id)) return json({ error: "올바르지 않은 복지서비스 ID입니다." }, 400);
  try {
    const { response, xml } = await upstream("NationalWelfaredetailedV001", serviceKey, { callTp: "D", servId: id });
    const resultCode = tag(xml, "resultCode");
    if (!response.ok || resultCode !== "0") return json({ error: tag(xml, "resultMessage") || "상세정보 조회에 실패했습니다.", resultCode }, 502);
    return json({
      id: tag(xml, "servId"), name: tag(xml, "servNm"), ministry: tag(xml, "jurMnofNm"),
      targetDetail: tag(xml, "tgtrDtlCn"), selectionCriteria: tag(xml, "slctCritCn"), support: tag(xml, "alwServCn"),
      outline: tag(xml, "wlfareInfoOutlCn"), supportCycle: tag(xml, "sprtCycNm"), provision: tag(xml, "srvPvsnNm"),
      contact: tag(xml, "rprsCtadr"), year: tag(xml, "crtrYr"),
      applicationMethods: related(xml, "applmetList"), contacts: related(xml, "inqplCtadrList"),
      links: related(xml, "inqplHmpgReldList"), laws: related(xml, "baslawList"),
      source: "한국사회보장정보원 중앙부처복지서비스 OpenAPI",
    }, 200, true);
  } catch {
    return json({ error: "복지서비스 상세정보를 불러오지 못했습니다." }, 502);
  }
}
