"use client";
import { useRef, useState } from 'react';
import { amount, classify, exportCsv, parseCsv, transactionDate, duplicateCount, type Kind, type Transaction } from '@/lib/transactions';
const kinds: Kind[] = ['수입', '지출', '이체', '환불', '확인 필요', '제외'];
const money = (n: number) => n.toLocaleString('ko-KR', { maximumFractionDigits: 2 }) + '원';
const button = 'rounded-lg bg-brand px-4 py-3 font-semibold text-white disabled:opacity-50';
export function TransactionAnalyzer() {
  const readId = useRef(0);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string[][]>([]);
  const [columns, setColumns] = useState([0,1,2,3]);
  const [rows, setRows] = useState<Transaction[]>([]);
  const [error, setError] = useState('');
  const [month, setMonth] = useState('전체');
  const [encoding, setEncoding] = useState('utf-8');
  const [page, setPage] = useState(0);
  function load(text: string) {
    setRows([]); setMonth('전체'); setError(''); setPage(0);
    try { const data = parseCsv(text); if (data.length < 2) throw new Error('거래내역을 찾지 못했습니다.');
      const patterns = [/^(거래일시|거래일자|거래일|날짜|일자|이용일자)$/, /^(거래내용|내용|적요|기재내용|거래기록사항|가맹점명)$/, /^(입금|입금액|입금금액|맡기신금액|받으신금액)$/, /^(출금|출금액|출금금액|찾으신금액|보내신금액)$/];
      const headerIndex = data.slice(0,30).findIndex(row=>patterns.every(re=>row.some(v=>re.test(v.replace(/\s|\(원\)/g,'')))));
      if(headerIndex>=0){const table=data.slice(headerIndex);const cols=patterns.map(re=>table[0]!.findIndex(v=>re.test(v.replace(/\s|\(원\)/g,''))));setSource(table);setColumns(cols);analyze(table,cols);}
      else {setSource(data);setColumns([0,1,2,3]);setError('열을 자동 인식하지 못했습니다. 아래에서 날짜·내용·입금·출금 열을 확인하세요.');}
    }
    catch(e) { setSource([]); setError((e as Error).message); }
  }
  function analyze(table = source, selected = columns) {
    setRows([]); setError(''); setMonth('전체'); setPage(0);
    try {
      const columns = selected;
      if (columns.length !== 4 || columns.some(c => c < 0 || c >= (table[0]?.length ?? 0)) || new Set(columns).size !== 4) throw new Error('서로 다른 열을 선택하세요.');
      const next = table.slice(1).map((cells,i) => {
        try {
          if (cells.length !== table[0]?.length) throw new Error('열 개수가 제목 행과 다릅니다.');
          const date = transactionDate(cells[columns[0] ?? 0] || '');
          const incoming = amount(cells[columns[2] ?? 2] || ''), outgoing = amount(cells[columns[3] ?? 3] || '');
          if ((incoming > 0) === (outgoing > 0)) throw new Error('입금 또는 출금 중 한쪽만 양수여야 합니다.');
          const memo = (cells[columns[1] ?? 1] || '').trim();
          return { date, memo, incoming, outgoing, ...classify(memo, incoming) };
        } catch(e) { throw new Error(`${i+2}행: ${(e as Error).message}`); }
      });
      setRows(next);
    } catch(e) { setError((e as Error).message); }
  }
  const filtered = rows.filter(r => month === '전체' || r.date.startsWith(month));
  const total = (kind: Kind, field: 'incoming'|'outgoing') => filtered.filter(r => r.kind === kind).reduce((n,r) => n+r[field],0);
  const income = total('수입','incoming'), expense = total('지출','outgoing'), refund = total('환불','incoming');
  const groups = new Map<string,number>();
  filtered.filter(r => r.kind === '지출').forEach(r => groups.set(r.category,(groups.get(r.category)||0)+r.outgoing));
  function download() { const url = URL.createObjectURL(new Blob([exportCsv(filtered)],{type:'text/csv;charset=utf-8'})); const a=document.createElement('a'); a.href=url;a.download='거래내역-분류.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
  return <div className="mt-8 space-y-6">
    <section className="rounded-xl border-2 border-brand bg-white p-5 space-y-4"><h2 className="text-xl font-bold">엑셀 파일만 넣으면 바로 분류</h2><p>XLSX·XLS·CSV, 최대 2MB·5,000행. 날짜·내용·입금·출금 열을 자동으로 찾습니다. 인식하지 못하는 형식만 직접 확인하세요. 여러 시트가 있으면 첫 번째 시트를 분석합니다.</p>
      <label className="block">문자 인코딩 <select className="border p-2" value={encoding} onChange={e=>setEncoding(e.target.value)}><option value="utf-8">UTF-8</option><option value="euc-kr">한글 Windows (EUC-KR)</option></select></label>
      <input aria-label="거래내역 엑셀 또는 CSV 파일" type="file" accept=".xlsx,.xls,.csv" onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;const request=++readId.current;setLoading(false);setError('');setRows([]);setSource([]);if(file.size>2*1024*1024){setError('2MB 이하 파일을 선택하세요.');return;}setLoading(true);try{if(!/\.(xlsx|xls|csv)$/i.test(file.name))throw new Error();const buffer=await file.arrayBuffer();if(request!==readId.current)return;if(/\.xlsx?$/i.test(file.name)){const XLSX=await import('xlsx');if(request!==readId.current)return;const book=XLSX.read(buffer,{type:'array',cellDates:true,dateNF:'yyyy-mm-dd',sheetRows:5032});const sheet=book.Sheets[book.SheetNames[0]||''];if(!sheet)throw new Error();load(XLSX.utils.sheet_to_csv(sheet,{dateNF:'yyyy-mm-dd'}));}else{load(new TextDecoder(encoding,{fatal:true}).decode(buffer));}}catch{if(request!==readId.current)return;setError('파일을 읽지 못했습니다. 암호를 해제한 엑셀 파일인지 확인하세요. CSV는 인코딩을 확인하세요.');}finally{if(request===readId.current)setLoading(false);}}}/>
      <div className="flex flex-wrap gap-3"><button className={button} disabled={loading} onClick={()=>load('날짜,내용,입금,출금\n2026-09-01,급여,3000000,0\n2026-09-02,카페,0,5000\n2026-09-03,월세,0,500000\n2026-09-04,내 계좌 이체,0,200000')}>가상 예시로 체험</button><button className="rounded-lg border px-4 py-3" onClick={()=>{readId.current++;setLoading(false);setPage(0);setSource([]);setRows([]);setError('');setMonth('전체');}}>전체 데이터 지우기</button></div>
    </section>
    {source.length>0 && rows.length===0 && <section className="rounded-xl border bg-white p-5 space-y-4"><h2 className="text-xl font-bold">2. 열 연결 확인</h2><p>미리보기: {source.length-1}건. 인코딩을 바꾸었다면 파일을 다시 선택하세요.</p><div className="grid gap-4 sm:grid-cols-2">{['날짜','거래 내용','입금액','출금액'].map((label,i)=><label key={label}>{label}<select className="block w-full border p-3" value={columns[i]} onChange={e=>{setRows([]);setColumns(columns.map((v,j)=>i===j?Number(e.target.value):v));}}>{(source[0] || []).map((v,j)=><option key={j} value={j}>{j+1}열: {v.slice(0,50)} (예: {source[1]?.[j]?.slice(0,30)})</option>)}</select></label>)}</div><button className={button} onClick={()=>analyze()}>분류 제안 만들기</button></section>}
    {loading && <p role="status">파일을 읽고 있습니다… 파일 내용은 서버로 전송하지 않습니다.</p>}
    {rows.length > 0 && duplicateCount(rows) > 0 && <p role="status" className="rounded-xl bg-amber-50 p-4">날짜·내용·입출금액이 같은 추가 거래 {duplicateCount(rows)}건이 있습니다. 실제 반복 결제일 수 있어 자동 삭제하지 않았습니다. 중복 입력이라면 해당 행을 ‘제외’로 변경하세요.</p>}
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{error} 오류를 고치기 전에는 합산하지 않습니다.</p>}
    {rows.length>0 && <section className="space-y-5"><h2 className="text-xl font-bold">3. 분류 검토와 지출 분석</h2><p className="rounded-xl bg-amber-50 p-4">키워드 분류는 틀릴 수 있습니다. 입금은 수입으로 확정하지 않습니다. 이체·대출·카드대금·환불을 검토하세요. 확인 필요 {filtered.filter(r=>r.kind==='확인 필요').length}건은 아래 수입·지출 합계에서 제외했습니다. 중복 행은 자동 제거하지 않습니다.</p>
      <label>분석 월 <select className="border p-2" value={month} onChange={e=>{setMonth(e.target.value);setPage(0);}}>{['전체',...new Set(rows.map(r=>r.date.slice(0,7)).sort())].map(m=><option key={m}>{m}</option>)}</select></label>
      <div className="grid gap-3 sm:grid-cols-3">{[['검토 분류 수입',income],['검토 분류 지출',expense],['수입 − 지출',income-expense]].map(([label,n])=><div className="rounded-xl border bg-white p-5" key={String(label)}><p>{label}</p><strong className="text-xl">{money(Number(n))}</strong></div>)}</div><p>별도 환불 입금: {money(refund)}. 차액은 계좌 잔액·저축 가능액이 아닙니다. 이체·제외·환불은 수입−지출에서 빠집니다.</p>
      <h3 className="font-bold">어디에 많이 썼나요? (지출 분류 기준)</h3>{[...groups].sort((a,b)=>b[1]-a[1]).map(([name,n])=><div key={name}><div className="flex justify-between"><span>{name}</span><span>{money(n)} · {expense ? (n/expense*100).toFixed(1):0}%</span></div><div className="h-2 rounded bg-blue-100"><div className="h-2 rounded bg-brand" style={{width:`${expense?n/expense*100:0}%`}}/></div></div>)}
      <div className="overflow-x-auto"><table className="w-full text-sm"><caption className="py-3 text-left">거래 분류 수정 (페이지당 50건)</caption><thead><tr>{['날짜','내용','입금','출금','분류','항목'].map(h=><th className="p-2 text-left" key={h}>{h}</th>)}</tr></thead><tbody>{filtered.slice(page*50,page*50+50).map(r=>{const index=rows.indexOf(r);return <tr key={index} className="border-t"><td className="p-2 whitespace-nowrap">{r.date}</td><td className="p-2 max-w-48 break-words">{r.memo}</td><td>{money(r.incoming)}</td><td>{money(r.outgoing)}</td><td><select aria-label={`${index+1}번째 거래 분류`} className="border p-2" value={r.kind} onChange={e=>setRows(rows.map((v,i)=>i===index?{...v,kind:e.target.value as Kind}:v))}>{kinds.filter(k=>k!=='수입'&&k!=='환불'||r.incoming>0).filter(k=>k!=='지출'||r.outgoing>0).map(k=><option key={k}>{k}</option>)}</select></td><td><input aria-label={`${index+1}번째 거래 항목`} className="w-32 border p-2" maxLength={40} value={r.category} onChange={e=>setRows(rows.map((v,i)=>i===index?{...v,category:e.target.value||'미분류'}:v))}/></td></tr>;})}</tbody></table></div>
      <div className="flex flex-wrap items-center gap-3"><button className={button} disabled={page===0} onClick={()=>setPage(page-1)}>이전</button><span>{page+1} / {Math.max(1,Math.ceil(filtered.length/50))}</span><button className={button} disabled={(page+1)*50>=filtered.length} onClick={()=>setPage(page+1)}>다음</button><button className={button} onClick={download}>선택 월 결과 CSV 저장</button></div>
    </section>}
  </div>;
}
