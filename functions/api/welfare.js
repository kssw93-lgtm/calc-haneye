import { blocks, json, safeOfficialUrl, tag, upstream } from "../_shared/welfare.js";

export async function onRequestGet(context) {
  const serviceKey = context.env.WELFARE_API_KEY;
  if (!serviceKey) {
    return json({ error: "복지서비스 인증키가 설정되지 않았습니다." }, 503);
  }

  const requestUrl = new URL(context.request.url);
  const pageNo = Math.max(1, Number.parseInt(requestUrl.searchParams.get("page") || "1", 10));
  const numOfRows = Math.min(30, Math.max(1, Number.parseInt(requestUrl.searchParams.get("size") || "12", 10)));
  try {
    const { response, xml } = await upstream("NationalWelfarelistV001", serviceKey, {
      callTp: "L", pageNo, numOfRows, srchKeyCode: "003",
      searchWrd: requestUrl.searchParams.get("q")?.slice(0, 60) || "",
    });
    const resultCode = tag(xml, "resultCode");
    if (!response.ok || resultCode !== "0") return json({ error: tag(xml, "resultMessage") || "복지서비스 조회에 실패했습니다.", resultCode }, 502);
    const items = blocks(xml, "servList").map(item => ({
      id: tag(item, "servId"), name: tag(item, "servNm"), summary: tag(item, "servDgst"),
      ministry: tag(item, "jurMnofNm"), department: tag(item, "jurOrgNm"), lifeCycle: tag(item, "lifeArray"),
      target: tag(item, "trgterIndvdlArray"), themes: tag(item, "intrsThemaArray"), supportCycle: tag(item, "sprtCycNm"),
      provision: tag(item, "srvPvsnNm"), online: tag(item, "onapPsbltYn") === "Y", contact: tag(item, "rprsCtadr"),
      officialUrl: safeOfficialUrl(tag(item, "servDtlLink")),
    }));
    return json({ page: Number(tag(xml, "pageNo")), pageSize: Number(tag(xml, "numOfRows")), total: Number(tag(xml, "totalCount")), items, source: "한국사회보장정보원 중앙부처복지서비스 OpenAPI" }, 200, true);
  } catch {
    return json({ error: "복지서비스 원본 데이터를 불러오지 못했습니다." }, 502);
  }
}
