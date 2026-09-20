import { afterEach, expect, it, vi } from "vitest";
// @ts-expect-error Pages JavaScript handler
import { onRequestGet } from "../functions/welfare/list.js";

afterEach(() => vi.unstubAllGlobals());

const xmlWith = (count: number) => `<resultCode>0</resultCode>` + Array.from({ length: count }, (_, index) => {
  const id = String(index + 1).padStart(8, "0");
  return `<servList><servId>WLF${id}</servId><servNm>서비스 ${id}</servNm><jurMnofNm>테스트부</jurMnofNm></servList>`;
}).join("");

it("renders real anchor links to every service on the page", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(xmlWith(3))));
  const response = await onRequestGet({ env: { WELFARE_API_KEY: "test" }, request: new Request("https://example.com/welfare/list") });
  expect(response.status).toBe(200);
  const html = await response.text();
  expect(html).toContain('href="/welfare/services/WLF00000001"');
  expect(html).toContain('href="/welfare/services/WLF00000003"');
  expect(response.headers.get("X-Robots-Tag")).toBe("index,follow");
});

it("paginates so every service is reachable via real hrefs", async () => {
  vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response(xmlWith(45))));
  const page1 = await onRequestGet({ env: { WELFARE_API_KEY: "test" }, request: new Request("https://example.com/welfare/list") });
  const html1 = await page1.text();
  expect(html1).toContain('href="/welfare/list?page=2"');
  expect(html1).not.toContain('href="/welfare/services/WLF00000041"');

  const page2 = await onRequestGet({ env: { WELFARE_API_KEY: "test" }, request: new Request("https://example.com/welfare/list?page=2") });
  const html2 = await page2.text();
  expect(html2).toContain('href="/welfare/services/WLF00000041"');
  expect(html2).toContain('href="/welfare/list?page=1"');
});

it("escapes upstream data and rejects malformed ids", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(`<resultCode>0</resultCode><servList><servId>WLF00000001</servId><servNm>&lt;script&gt;bad&lt;/script&gt;</servNm></servList><servList><servId>not-an-id</servId><servNm>무시됨</servNm></servList>`)));
  const response = await onRequestGet({ env: { WELFARE_API_KEY: "test" }, request: new Request("https://example.com/welfare/list") });
  const html = await response.text();
  expect(html).not.toContain("<script>bad</script>");
  expect(html).not.toContain("무시됨");
});

it("fails safely when the upstream call errors", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("error", { status: 500 })));
  const response = await onRequestGet({ env: { WELFARE_API_KEY: "test" }, request: new Request("https://example.com/welfare/list") });
  expect(response.status).toBe(502);
  expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
});

it("returns 503 without an API key", async () => {
  const response = await onRequestGet({ env: {}, request: new Request("https://example.com/welfare/list") });
  expect(response.status).toBe(503);
});
