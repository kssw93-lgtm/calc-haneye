/**
 * timezone 영향 없이 "YYYY-MM-DD" 문자열을 날짜(UTC 자정 기준)로 파싱합니다.
 */
export function parseDateOnly(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * 시작일과 종료일을 모두 포함한 일수를 반환합니다.
 */
export function inclusiveDaysBetween(start: Date, end: Date): number {
  const diff = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  return diff + 1;
}

export interface CalendarDuration {
  years: number;
  months: number;
  days: number;
}

/**
 * 두 날짜 사이의 기간을 "N년 N개월 N일" 형태로 계산합니다(달력 기준 차이).
 *
 * 월별 일수가 달라(28~31일) 시작일이 29~31일인 경우 단순 필드 뺄셈은 음수
 * 일수를 만들어낼 수 있어(예: 2020-01-31 → 2020-03-01), 개월 수를 하나씩
 * 줄여가며 "시작일 + N개월"이 종료일을 넘지 않는 지점을 찾은 뒤 남은 일수를
 * 실제 날짜 차이로 계산합니다.
 */
export function calendarDuration(start: Date, end: Date): CalendarDuration {
  let totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());

  let anchor = new Date(
    Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth() + totalMonths,
      start.getUTCDate()
    )
  );

  while (anchor.getTime() > end.getTime()) {
    totalMonths -= 1;
    anchor = new Date(
      Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth() + totalMonths,
        start.getUTCDate()
      )
    );
  }

  const days = Math.round((end.getTime() - anchor.getTime()) / MS_PER_DAY);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths - years * 12;

  return { years, months, days };
}

export function formatCalendarDuration(duration: CalendarDuration): string {
  return `${duration.years}년 ${duration.months}개월 ${duration.days}일`;
}
