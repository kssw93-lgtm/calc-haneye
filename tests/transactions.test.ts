import { expect, it } from 'vitest';
import { amount, classify, exportCsv, parseCsv } from '../lib/transactions';
it('reads quoted commas, newlines, escapes and BOM',()=>{expect(parseCsv('\uFEFFa,b\r\n"c,d","e""f"\n"g\nh",i')).toEqual([['a','b'],['c,d','e"f'],['g\nh','i']]);});
it('rejects malformed and negative amounts',()=>{expect(()=>parseCsv('"a')).toThrow();expect(()=>amount('-100')).toThrow();expect(()=>amount('abc')).toThrow();expect(amount('1,000원')).toBe(1000);});
it('does not claim incoming money or transfers are income',()=>{expect(classify('급여',300).kind).toBe('확인 필요');expect(classify('내 계좌 이체',0).kind).toBe('확인 필요');expect(classify('카페',0).category).toBe('식비');});
it('escapes formula injection on export',()=>{expect(exportCsv([{date:'2026-01-01',memo:'=1+1',incoming:1,outgoing:0,kind:'수입',category:'기타'}])).toContain('"\'=1+1"');});
