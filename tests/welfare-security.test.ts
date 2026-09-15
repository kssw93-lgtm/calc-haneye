import { afterEach, expect, it, vi } from 'vitest';
// @ts-expect-error Pages Functions are JavaScript without declarations.
import { onRequestGet } from '../functions/api/welfare.js';
// @ts-expect-error Pages Functions are JavaScript without declarations.
import { upstream } from '../functions/_shared/welfare.js';
// @ts-expect-error Pages Functions are JavaScript without declarations.
import { onRequest } from '../functions/_middleware.js';

afterEach(() => vi.unstubAllGlobals());
it.each(['page=abc', 'page=-1', 'page=1001', 'size=31', 'size=NaN', 'page=1.5'])('rejects invalid input without upstream calls: %s', async query => {
  const fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock);
  const result = await onRequestGet({ env: { WELFARE_API_KEY: 'test' }, request: new Request(`https://example.com/api/welfare?${query}`) });
  expect(result.status).toBe(400); expect(fetchMock).not.toHaveBeenCalled();
});
it('adds security headers to dynamic errors too', async () => {
  const result = await onRequest({ request: new Request('https://example.com/api/welfare/invalid'), next: async () => new Response('invalid', {status:400}), waitUntil: vi.fn() });
  expect(result.status).toBe(400);
  expect(result.headers.get('X-Frame-Options')).toBe('DENY');
  expect(result.headers.get('Content-Security-Policy')).toContain("frame-ancestors 'none'");
});
it('sets an upstream timeout signal', async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response('<resultCode>0</resultCode>')); vi.stubGlobal('fetch', fetchMock);
  await upstream('NationalWelfarelistV001', 'test', {});
  expect(fetchMock.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal);
});
