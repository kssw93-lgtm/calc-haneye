"use client";

import { FormEvent, useEffect, useState } from "react";

type WelfareItem = { id: string; name: string; summary: string; ministry: string; department: string; lifeCycle: string; target: string; themes: string; supportCycle: string; provision: string; online: boolean; contact: string; officialUrl: string };
export function WelfareSearch() {
  const [query, setQuery] = useState("청년");
  const [request, setRequest] = useState({ q: "청년", sequence: 0 });
  const [items, setItems] = useState<WelfareItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/welfare?q=${encodeURIComponent(request.q)}&size=12`, { signal: controller.signal })
      .then(response => response.json().then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => { if (!ok) throw new Error(data.error); setItems(data.items); setTotal(data.total); })
      .catch(error => { if (error.name !== "AbortError") setError(error.message || "복지서비스를 불러오지 못했습니다."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [request]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true); setError("");
    setRequest(previous => ({ q: query.trim(), sequence: previous.sequence + 1 }));
  };

  return <div className="mt-8">
    <form onSubmit={submit} className="rounded-2xl border border-hairline bg-surface-subtle p-5 sm:p-6">
      <label htmlFor="welfare-query" className="text-sm font-bold text-ink">복지서비스 이름 또는 관심 분야</label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input id="welfare-query" value={query} onChange={event => setQuery(event.target.value)} maxLength={60} placeholder="예: 청년, 주거, 일자리" className="min-h-12 flex-1 rounded-xl border border-hairline bg-white px-4 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        <button type="submit" className="min-h-12 rounded-xl bg-brand px-6 font-bold text-white hover:opacity-90">복지서비스 검색</button>
      </div>
      <p className="mt-3 text-xs leading-6 text-ink-muted">개인정보를 입력하지 마세요. 검색 결과는 지원 가능 여부를 판정하지 않습니다.</p>
    </form>

    {loading && <p className="mt-8 text-sm text-ink-soft">복지서비스를 불러오는 중입니다…</p>}
    {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {!loading && !error && <p className="mt-6 text-sm text-ink-soft"><strong className="text-ink">{request.q || "전체"}</strong> 검색 결과 {total.toLocaleString("ko-KR")}건 중 최대 12건을 표시합니다.</p>}

    <div className="mt-5 grid gap-4 md:grid-cols-2">{items.map(item => <article key={item.id} className="rounded-2xl border border-hairline bg-white p-5">
      <div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-brand-light px-2.5 py-1 font-semibold text-brand">{item.ministry || "중앙부처"}</span>{item.lifeCycle && <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-ink-soft">{item.lifeCycle}</span>}{item.themes && <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-ink-soft">{item.themes}</span>}</div>
      <h2 className="mt-3 text-lg font-bold text-ink">{item.name}</h2>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{item.summary}</p>
      <dl className="mt-4 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-2 text-xs leading-6"><dt className="text-ink-muted">지원주기</dt><dd className="text-ink-soft">{item.supportCycle || "상세 확인"}</dd><dt className="text-ink-muted">제공형태</dt><dd className="text-ink-soft">{item.provision || "상세 확인"}</dd><dt className="text-ink-muted">온라인신청</dt><dd className="text-ink-soft">{item.online ? "가능" : "공식 안내 확인"}</dd></dl>
      <div className="mt-5 flex flex-wrap gap-3"><a href={`/welfare/services/${encodeURIComponent(item.id)}`} className="rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white">자세히 보기</a></div>
    </article>)}</div>
  </div>;
}
