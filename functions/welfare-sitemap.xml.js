import { blocks, normalizedKey, tag, upstream } from "./_shared/welfare.js";

const escapeXml = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
}[character]));

export async function onRequestGet(context) {
  const key = normalizedKey(context.env.WELFARE_API_KEY);
  if (!key) return new Response("Sitemap temporarily unavailable", { status: 503 });
  try {
    const first = await upstream("NationalWelfarelistV001", key, { callTp: "L", pageNo: 1, numOfRows: 1000, srchKeyCode: "003" });
    if (!first.response.ok || tag(first.xml, "resultCode") !== "0") throw new Error("upstream");
    const ids = [...new Set(blocks(first.xml, "servList").map(item => tag(item, "servId")).filter(id => /^WLF\d{8}$/.test(id)))];
    if (ids.length === 0) throw new Error("empty");
    const urls = ids.map(id => `  <url><loc>${escapeXml(`https://calc-haneye.kr/welfare/services/${id}`)}</loc><changefreq>weekly</changefreq></url>`).join("\n");
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return new Response("Sitemap temporarily unavailable", { status: 502 });
  }
}
