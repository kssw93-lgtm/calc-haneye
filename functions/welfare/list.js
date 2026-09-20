import { blocks, normalizedKey, tag, upstream } from "../_shared/welfare.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

const PAGE_SIZE = 40;

export async function onRequestGet(context) {
  const key = normalizedKey(context.env.WELFARE_API_KEY);
  if (!key) return new Response("복지서비스 목록을 불러올 수 없습니다.", { status: 503 });
  const url = new URL(context.request.url);
  const requestedPage = parseInt(url.searchParams.get("page") || "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  try {
    const { response, xml } = await upstream("NationalWelfarelistV001", key, { callTp: "L", pageNo: 1, numOfRows: 1000, srchKeyCode: "003" });
    if (!response.ok || tag(xml, "resultCode") !== "0") throw new Error("upstream");
    const seen = new Set();
    const items = [];
    for (const block of blocks(xml, "servList")) {
      const id = tag(block, "servId");
      if (!/^WLF\d{8}$/.test(id) || seen.has(id)) continue;
      seen.add(id);
      items.push({ id, name: tag(block, "servNm") || id, ministry: tag(block, "jurMnofNm") || "중앙부처" });
    }
    if (items.length === 0) throw new Error("empty");

    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const current = Math.min(page, totalPages);
    const pageItems = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

    const rows = pageItems.map(item => `<li><a href="/welfare/services/${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a><span class="ministry">${escapeHtml(item.ministry)}</span></li>`).join("");
    const prevLink = current > 1 ? `<a href="/welfare/list?page=${current - 1}" rel="prev">← 이전</a>` : "<span></span>";
    const nextLink = current < totalPages ? `<a href="/welfare/list?page=${current + 1}" rel="next">다음 →</a>` : "<span></span>";
    const canonical = `https://calc-haneye.kr/welfare/list${current > 1 ? `?page=${current}` : ""}`;

    const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>중앙부처 복지서비스 전체 목록 (${current}/${totalPages}페이지) | 계산한눈에</title><meta name="description" content="한국사회보장정보원 공공데이터 기준 중앙부처 복지서비스 ${items.length}건 전체 목록입니다."><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><style>
body{font-family:Arial,"Noto Sans KR",sans-serif;max-width:900px;margin:0 auto;padding:24px;color:#172033;background:#f7f8fa}header a{color:#172033;font-weight:800;text-decoration:none}h1{font-size:22px;margin:20px 0 6px}p.desc{color:#506176;font-size:14px;margin:0 0 20px;line-height:1.7}ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}li{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#fff;border:1px solid #e4e8ee;border-radius:12px;padding:14px 16px}li a{color:#0969a8;font-weight:700;text-decoration:none;flex:1}.ministry{font-size:12px;color:#697389;white-space:nowrap}nav.pager{display:flex;justify-content:space-between;align-items:center;margin-top:24px;font-weight:700}nav.pager a{color:#0874b9;text-decoration:none}
</style></head><body><header><a href="/">계산한눈에</a> · <a href="/welfare">복지서비스 검색</a></header><h1>중앙부처 복지서비스 전체 목록</h1><p class="desc">한국사회보장정보원 공공데이터 기준 전체 ${items.length}건 중 ${current}페이지(총 ${totalPages}페이지)를 표시합니다. 실제 신청 가능 여부와 최신 기준은 각 서비스 페이지와 복지로 공식 안내에서 다시 확인하세요.</p><ul>${rows}</ul><nav class="pager">${prevLink}<span>${current} / ${totalPages}</span>${nextLink}</nav></body></html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "index,follow" } });
  } catch {
    return new Response("복지서비스 목록을 불러오지 못했습니다.", { status: 502, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  }
}
