import { afterEach, expect, it, vi } from "vitest";
// @ts-expect-error Pages JavaScript handler
import { onRequestGet, onRequestHead } from "../functions/welfare-sitemap.xml.js";
afterEach(() => vi.unstubAllGlobals());
const context = { env: { WELFARE_API_KEY: "test" } };
it("HEAD matches GET status and headers without a body", async () => {
  vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response('<resultCode>0</resultCode><servList><servId>WLF00000001</servId></servList>')));
  const get = await onRequestGet(context);
  const head = await onRequestHead(context);
  expect(head.status).toBe(200);
  expect([...head.headers]).toEqual([...get.headers]);
  expect(await head.text()).toBe("");
  expect(await get.text()).toContain("WLF00000001");
});
it("HEAD does not conceal an upstream failure", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("error", { status: 500 })));
  expect((await onRequestHead(context)).status).toBe(502);
});
