export function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = [], cell = '', quoted = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && (c === ',' || c === '\n' || c === '\r')) {
      row.push(cell); cell = '';
      if (c !== ',') { if (row.some(v => v.trim())) rows.push(row); row = []; if (c === '\r' && input[i + 1] === '\n') i++; }
    } else cell += c;
  }
  if (quoted) throw new Error('따옴표가 닫히지 않은 CSV입니다. 파일 형식을 확인하세요.');
  row.push(cell); if (row.some(v => v.trim())) rows.push(row);
  if (rows.length > 5001) throw new Error('거래는 최대 5,000행까지 지원합니다.');
  return rows;
}
export function amount(value: string): number {
  const s = value.trim().replace(/,/g, '').replace(/[₩원\s]/g, '');
  if (!s || s === '-') return 0;
  if (!/^\d+(\.\d{1,2})?$/.test(s)) throw new Error('금액은 음수 없는 숫자로 입력하세요.');
  const n = Number(s); if (!Number.isFinite(n) || n > 1e12) throw new Error('금액 범위를 확인하세요.');
  return Math.round(n * 100) / 100;
}
export type Kind = '수입' | '지출' | '이체' | '환불' | '확인 필요' | '제외';
export type Transaction = { date: string; memo: string; incoming: number; outgoing: number; kind: Kind; category: string };
export function transactionDate(value: string): string {
  const raw = value.trim();
  const match = /^(\d{4})(?:[-./년]\s*)(\d{1,2})(?:[-./월]\s*)(\d{1,2})(?:일)?(?:\s.*|T.*)?$/.exec(raw)
    || /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
  if (!match) throw new Error('날짜 형식을 확인하세요. 예: 2026-09-01 또는 20260901');
  const date = `${match[1]}-${match[2]!.padStart(2, '0')}-${match[3]!.padStart(2, '0')}`;
  const parsed = new Date(date + 'T00:00:00Z');
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error('존재하지 않는 날짜입니다.');
  return date;
}
export function duplicateCount(rows: Transaction[]): number {
  const seen = new Set<string>();
  let count = 0;
  for (const row of rows) {
    const key = JSON.stringify([row.date, row.memo, row.incoming, row.outgoing]);
    if (seen.has(key)) count++;
    else seen.add(key);
  }
  return count;
}
export function classify(memo: string, incoming: number): Pick<Transaction, 'kind' | 'category'> {
  if (/이체|송금|카드대금|대출|현금인출/.test(memo)) return { kind: '확인 필요', category: '이체·대출·결제 확인' };
  if (/환불|취소/.test(memo)) return { kind: '확인 필요', category: '환불 확인' };
  if (incoming) return { kind: '확인 필요', category: '입금 성격 확인' };
  const categories: [string, RegExp][] = [['식비', /식당|카페|커피|배달|음식/], ['교통', /택시|버스|지하철|주유/], ['주거', /월세|관리비|전기|가스/], ['쇼핑', /마트|쇼핑|백화점/]];
  return { kind: '지출', category: categories.find(([, re]) => re.test(memo))?.[0] || '미분류' };
}
export function exportCsv(rows: Transaction[]) {
  const safe = (v: string) => '"' + (/^[\s]*[=+@-]/.test(v) ? "'" + v : v).replace(/"/g, '""') + '"';
  return '\uFEFF' + [['날짜','내용','입금','출금','분류','항목'], ...rows.map(r => [r.date,r.memo,String(r.incoming),String(r.outgoing),r.kind,r.category])].map(row => row.map(safe).join(',')).join('\r\n');
}
