import { blocks, json, normalizedKey, safeHttpsUrl, tag, upstream } from "../../_shared/welfare.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

const plainText = (value = "") => String(value)
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/\r?\n\s*\r?\n+/g, "\n\n")
  .trim();

const paragraph = (title, body) => body ? `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(plainText(body))}</p></section>` : "";

const relatedLinks = xml => blocks(xml, "inqplHmpgReldList").map(item => ({
  name: plainText(tag(item, "servSeDetailNm")),
  url: safeHttpsUrl(tag(item, "servSeDetailLink")),
})).filter(item => item.name && item.url);

const page = ({ id, name, ministry, outline, target, criteria, support, contact, year, officialUrl, links }) => {
  const canonical = `https://calc-haneye.kr/welfare/services/${encodeURIComponent(id)}`;
  const description = plainText(outline || support || target).slice(0, 150) || `${name} 지원대상, 선정기준, 지원내용을 확인하세요.`;
  const structuredData = JSON.stringify({
    "@context": "https://schema.org", "@type": "Article", headline: name,
    description, mainEntityOfPage: canonical, author: { "@type": "Organization", name: "계산한눈에" },
  }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(name)} 지원대상·지원내용 | 계산한눈에</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="noindex,follow"><script type="application/ld+json">${structuredData}</script><style>
  :root{font-family:Arial,"Noto Sans KR",sans-serif;color:#172033;background:#f7f8fa}*{box-sizing:border-box}body{margin:0}header{background:#fff;border-bottom:1px solid #e5e7eb}nav,main{max-width:900px;margin:auto;padding:18px 22px}nav{display:flex;align-items:center;justify-content:space-between}a{color:#0969a8}nav a{font-weight:800;text-decoration:none;color:#172033}.back{font-size:14px;color:#506176}article{margin-top:28px;background:#fff;border:1px solid #e4e8ee;border-radius:20px;padding:28px}small{color:#47735d;font-weight:700}h1{font-size:clamp(27px,5vw,40px);line-height:1.25;margin:12px 0}h2{font-size:20px;margin:0 0 10px}section{margin-top:30px;padding-top:24px;border-top:1px solid #e9edf2}p{white-space:pre-line;line-height:1.85;color:#465367;margin:0}.source{margin-top:30px;padding:18px;border-radius:12px;background:#f0f7f3;font-size:14px}.button{display:inline-block;margin-top:14px;padding:11px 16px;border-radius:9px;background:#0874b9;color:#fff;text-decoration:none;font-weight:700}.notice{margin:24px 0;font-size:13px;line-height:1.7;color:#687487}@media(max-width:600px){article{padding:21px}nav,main{padding-left:16px;padding-right:16px}}
  </style></head><body><header><nav><a href="/">계산한눈에</a><a class="back" href="/welfare">복지서비스 검색</a></nav></header><main><article><small>${escapeHtml(ministry || "중앙부처")} · 기준연도 ${escapeHtml(year || "공식 안내 확인")}</small><h1>${escapeHtml(name)}</h1>${paragraph("사업 안내", outline)}${paragraph("지원대상", target)}${paragraph("선정기준", criteria)}${paragraph("지원내용", support)}${contact ? `<section><h2>문의처</h2><p>${escapeHtml(contact)}</p></section>` : ""}${links.length ? `<section><h2>관련 기관·지원 안내</h2><p>공공데이터에 등록된 공식 관련 사이트입니다.</p>${links.map(link => `<a class="button" href="${escapeHtml(link.url)}" target="_blank" rel="nofollow noreferrer">${escapeHtml(link.name)} 바로가기 ↗</a>`).join(" ")}</section>` : ""}<div class="source"><strong>자료 출처</strong><p>한국사회보장정보원 중앙부처복지서비스 OpenAPI</p><a class="button" href="${escapeHtml(officialUrl)}" target="_blank" rel="nofollow noreferrer">복지로에서 원문·신청방법 확인 ↗</a></div><p class="notice">공공데이터를 보기 쉽게 정리한 비공식 참고 정보입니다. 실제 신청 가능 여부와 최신 기준은 담당기관 및 복지로 공식 안내에서 다시 확인하세요.</p></article></main></body></html>`;
};

export async function onRequestGet(context) {
  const key = normalizedKey(context.env.WELFARE_API_KEY);
  const id = String(context.params.id || "");
  if (!key) return json({ error: "복지서비스 인증키가 설정되지 않았습니다." }, 503);
  if (!/^WLF\d{8}$/.test(id)) return new Response("올바르지 않은 복지서비스 주소입니다.", { status: 400 });
  try {
    const { response, xml } = await upstream("NationalWelfaredetailedV001", key, { callTp: "D", servId: id });
    if (!response.ok || tag(xml, "resultCode") !== "0") return new Response("공공데이터 조회가 일시적으로 지연되고 있습니다. 잠시 후 다시 확인해 주세요.", { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "300", "X-Robots-Tag": "noindex" } });
    if (!tag(xml, "servNm")) return new Response("복지서비스 정보를 찾지 못했습니다.", { status: 404, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
    const officialUrl = `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=${encodeURIComponent(id)}&wlfareInfoReldBztpCd=01`;
    const html = page({ id, name: tag(xml, "servNm"), ministry: tag(xml, "jurMnofNm"), outline: tag(xml, "wlfareInfoOutlCn"), target: tag(xml, "tgtrDtlCn"), criteria: tag(xml, "slctCritCn"), support: tag(xml, "alwServCn"), contact: tag(xml, "rprsCtadr"), year: tag(xml, "crtrYr"), officialUrl, links: relatedLinks(xml) });
    // 공공데이터를 그대로 옮긴 461개 페이지가 편집 없이 그대로 색인되면
    // "가치가 낮은 콘텐츠"로 사이트 전체 애드센스 심사에 불리하게 작용할 수 있어,
    // 데이터 완성도와 무관하게 항상 noindex로 제공한다(사이트 내 검색·이동은 그대로 유지).
    const guidance = `<section><h2>신청 전 확인 순서</h2><ol><li>위 지원대상과 선정기준을 구분해 확인하세요. 대상에 해당해도 선정이 확정되는 것은 아닙니다.</li><li>원문에서 현재 접수기간, 거주지역 및 제출서류를 확인하세요.</li><li>담당기관에 중복지원 제한과 신청 경로를 확인한 뒤 신청하세요.</li></ol><p>이 페이지는 접수 중 여부를 실시간으로 판정하지 않습니다. 기준연도는 자료의 기준이며, 현재 신청 가능하다는 의미가 아닙니다. 지원내용에 금액이 없으면 임의의 예상 지원금을 제시하지 않습니다.</p></section><section><h2>계산한눈에 이용 안내</h2><p><a href="/guides">계산 가이드</a> · <a href="/about">운영 및 자료 작성 원칙</a> · <a href="/contact">오류 제보·문의</a> · <a href="/privacy">개인정보처리방침</a></p></section>`;
    const reviewedHtml = html.replace('</article>', `${guidance}</article>`);
    return new Response(reviewedHtml, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex,follow" } });
  } catch {
    return new Response("복지서비스 정보를 불러오지 못했습니다.", { status: 502 });
  }
}
