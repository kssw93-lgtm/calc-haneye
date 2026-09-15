import { blocks, json, safeOfficialUrl, tag, upstream } from "../_shared/welfare.js";

export async function onRequestGet(context) {
  const serviceKey = context.env.WELFARE_API_KEY;
  if (!serviceKey) {
    return json({ error: "복지서비스 인증키가 설정되지 않았습니다." }, 503);
  }

  const requestUrl = new URL(context.request.url);
  const rawPage = requestUrl.searchParams.get("page") ?? "1";
  const rawSize = requestUrl.searchParams.get("size") ?? "12";
  const pageNo = Number(rawPage);
  const numOfRows = Number(rawSize);
  const query = (requestUrl.searchParams.get("q") || "").trim();
  if (!/^\d+$/.test(rawPage) || !/^\d+$/.test(rawSize) || !Number.isSafeInteger(pageNo) || pageNo < 1 || pageNo > 1000 || numOfRows < 1 || numOfRows > 30 || query.length > 60) {
    return json({ error: "검색어는 60자 이하, 페이지는 1~1000, 조회 개수는 1~30으로 입력하세요." }, 400);
  }
  try {
    const { response, xml } = await upstream("NationalWelfarelistV001", serviceKey, {
      callTp: "L", pageNo, numOfRows, srchKeyCode: "003",
      searchWrd: query,
    });
    const resultCode = tag(xml, "resultCode");
    if (!response.ok || resultCode !== "0") return json({ error: "복지서비스 조회에 실패했습니다." }, 502);
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
