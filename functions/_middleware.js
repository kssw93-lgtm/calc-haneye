// Functions responses do not inherit Pages static _headers.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const dynamic = url.pathname.startsWith('/api/welfare') || url.pathname.startsWith('/welfare/services/') || url.pathname === '/welfare-sitemap.xml' || url.pathname === '/welfare/list';
  const cacheable = dynamic && context.request.method === 'GET';
  // Drop irrelevant query strings to avoid trivial cache bypass on detail pages.
  const cacheUrl = new URL(url.origin + url.pathname);
  if (url.pathname === '/api/welfare' || url.pathname === '/welfare/list') {
    for (const key of ['q', 'page', 'size']) {
      if (url.searchParams.has(key)) cacheUrl.searchParams.set(key, url.searchParams.get(key));
    }
  }
  const cache = typeof caches !== 'undefined' ? caches.default : undefined;
  const cacheKey = new Request(cacheUrl.toString());
  let response = cacheable && cache ? await cache.match(cacheKey) : undefined;
  if (!response) {
    response = await context.next();
    if (cacheable && cache && response.status === 200 && /public/.test(response.headers.get('Cache-Control') || '')) {
      context.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}));
    }
  }
  response = new Response(response.body, response);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests");
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}
