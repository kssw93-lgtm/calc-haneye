"use client";

import { FormEvent, useEffect, useState } from "react";

type WelfareItem = { id: string; name: string; summary: string; ministry: string; department: string; lifeCycle: string; target: string; themes: string; supportCycle: string; provision: string; online: boolean; contact: string; officialUrl: string };
type WelfareDetail = { id: string; name: string; targetDetail: string; selectionCriteria: string; support: string; outline: string; contact: string; year: string; applicationMethods: { name: string; url: string }[]; links: { name: string; url: string }[] };

export function WelfareSearch() {
  const [query, setQuery] = useState("청년");
  const [request, setRequest] = useState({ q: "청년", sequence: 0 });
  const [items, setItems] = useState<WelfareItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<WelfareDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState("");

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
    setLoading(true); setError(""); setSelected(null);
    setRequest(previous => ({ q: query.trim(), sequence: previous.sequence + 1 }));
  };
  const showDetail = async (id: string) => {
    setDetailLoading(id); setError("");
    try {
      const response = await fetch(`/api/welfare/${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSelected(data);
    } catch (error) { setError(error instanceof Error ? error.message : "상세정보를 불러오지 못했습니다."); }
    finally { setDetailLoading(""); }
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
      <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => showDetail(item.id)} disabled={detailLoading === item.id} className="rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">{detailLoading === item.id ? "불러오는 중…" : "지원대상·내용 보기"}</button>{item.officialUrl && <a href={item.officialUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-hairline px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand">복지로 원문 ↗</a>}</div>
    </article>)}</div>

    {selected && <section aria-live="polite" className="mt-8 rounded-2xl border border-brand/20 bg-brand-light p-5 sm:p-7">
      <p className="text-xs font-semibold text-brand">한국사회보장정보원 상세정보 · 기준연도 {selected.year || "원문 확인"}</p><h2 className="mt-2 text-xl font-bold text-ink">{selected.name}</h2>
      {[['사업 안내', selected.outline], ['지원대상', selected.targetDetail], ['선정기준', selected.selectionCriteria], ['지원내용', selected.support]].filter(([,body]) => body).map(([title, body]) => <div key={title} className="mt-6"><h3 className="font-bold text-ink">{title}</h3><p className="mt-2 whitespace-pre-line text-sm leading-7 text-ink-soft">{body}</p></div>)}
      {selected.contact && <p className="mt-6 text-sm text-ink-soft"><strong className="text-ink">문의:</strong> {selected.contact}</p>}
      <p className="mt-6 text-xs leading-6 text-ink-muted">이 화면은 공공데이터를 보기 쉽게 정리한 비공식 참고 정보입니다. 신청 전 복지로와 담당기관의 최신 안내를 확인하세요.</p>
    </section>}
  </div>;
}
