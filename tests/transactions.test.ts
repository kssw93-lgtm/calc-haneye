import { expect, it } from 'vitest';
import { amount, classify, exportCsv, parseCsv, transactionDate, duplicateCount } from '../lib/transactions';
it('normalizes common bank date formats',()=>{
  for (const value of ['20260901','2026.9.1 12:30:00','2026/9/1','2026년 9월 1일','2026-09-01T12:00:00']) expect(transactionDate(value)).toBe('2026-09-01');
  expect(transactionDate('2024-02-29')).toBe('2024-02-29');
  for(const value of ['2026-02-29','2026-13-01','2026-04-31','garbage','2026-09-01junk']) expect(()=>transactionDate(value)).toThrow();
});
it('warns about duplicate candidates without deleting transactions',()=>{
  const row = {date:'2026-09-01',memo:'카페',incoming:0,outgoing:5000,kind:'지출' as const,category:'식비'};
  const rows=[row,{...row},{...row,outgoing:6000}];
  expect(duplicateCount(rows)).toBe(1);expect(rows).toHaveLength(3);
});
it('reads quoted commas, newlines, escapes and BOM',()=>{expect(parseCsv('\uFEFFa,b\r\n"c,d","e""f"\n"g\nh",i')).toEqual([['a','b'],['c,d','e"f'],['g\nh','i']]);});
it('rejects malformed and negative amounts',()=>{expect(()=>parseCsv('"a')).toThrow();expect(()=>amount('-100')).toThrow();expect(()=>amount('abc')).toThrow();expect(amount('1,000원')).toBe(1000);});
it('does not claim incoming money or transfers are income',()=>{expect(classify('급여',300).kind).toBe('확인 필요');expect(classify('내 계좌 이체',0).kind).toBe('확인 필요');expect(classify('카페',0).category).toBe('식비');});
it('escapes formula injection on export',()=>{expect(exportCsv([{date:'2026-01-01',memo:'=1+1',incoming:1,outgoing:0,kind:'수입',category:'기타'}])).toContain('"\'=1+1"');});
