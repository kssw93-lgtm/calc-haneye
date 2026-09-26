import { afterEach, expect, it, vi } from "vitest";
// @ts-expect-error Cloudflare Pages JavaScript handler
import { onRequestGet } from "../functions/welfare/services/[id].js";

afterEach(() => vi.unstubAllGlobals());
const context = { env: { WELFARE_API_KEY: "test" }, params: { id: "WLF00000001" } };
it("keeps upstream failures temporary instead of marking a page deleted", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("error", { status: 500 })));
  const response = await onRequestGet(context);
  expect(response.status).toBe(503);
  expect(response.headers.get("Cache-Control")).toBe("no-store");
});
it("excludes incomplete detail from indexing and provides navigation", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<resultCode>0</resultCode><servNm>시험</servNm>")));
  const response = await onRequestGet(context);
  expect(response.headers.get("X-Robots-Tag")).toBe("noindex,follow");
  const html = await response.text();
  expect(html).toContain("신청 전 확인 순서");
  expect(html).toContain('href="/contact"');
});
it("retains complete detail, escapes source markup, and still excludes it from indexing", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<resultCode>0</resultCode><servNm>&lt;script&gt;bad&lt;/script&gt;</servNm><tgtrDtlCn>대상</tgtrDtlCn><slctCritCn>조건</slctCritCn><alwServCn>내용</alwServCn>")));
  const response = await onRequestGet(context);
  expect(response.headers.get("X-Robots-Tag")).toBe("noindex,follow");
  expect(await response.text()).not.toContain("<script>bad</script>");
});
