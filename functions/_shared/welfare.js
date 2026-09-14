export const BASE_URL = "https://apis.data.go.kr/B554287/NationalWelfareInformationsV001";

export function normalizedKey(value) {
  const key = value?.trim();
  if (!key) return "";
  if (!key.includes("%")) return key;
  try { return decodeURIComponent(key); } catch { return key; }
}

export function text(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&").trim();
}

export function safeOfficialUrl(value = "") {
  try {
    const url = new URL(text(value));
    return url.protocol === "https:" && url.hostname === "www.bokjiro.go.kr"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

export function safeHttpsUrl(value = "") {
  try {
    const url = new URL(text(value));
    return url.protocol === "https:" && url.hostname.includes(".") && !url.username && !url.password
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

export function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, "i"));
  return text(match?.[1]);
}

export function blocks(xml, name) {
  return [...xml.matchAll(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, "gi"))].map(match => match[1]);
}

export function json(data, status = 200, cache = false) {
  return Response.json(data, { status, headers: {
    "Cache-Control": cache ? "public, max-age=300, s-maxage=3600" : "no-store",
    "X-Content-Type-Options": "nosniff",
  }});
}

export async function upstream(path, key, params) {
  const url = new URL(`${BASE_URL}/${path}`);
  url.searchParams.set("serviceKey", normalizedKey(key));
  for (const [name, value] of Object.entries(params)) if (value !== "" && value != null) url.searchParams.set(name, String(value));
  const response = await fetch(url, { headers: { Accept: "application/xml" } });
  return { response, xml: await response.text() };
}
