import Link from "next/link";
import { ArrowUpRight, MoonStar } from "lucide-react";
import { Container } from "./Container";
import { contactEmail, siteName } from "@/lib/constants/site";

const footerLinks = [
  { label: "금융", href: "/finance" },
  { label: "급여·노동", href: "/salary-work" },
  { label: "세금·부동산", href: "/property-tax" },
  { label: "지원정책", href: "/policies" },
  { label: "서비스 소개", href: "/about" },
  { label: "문의", href: "/contact" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "면책고지", href: "/disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface-subtle">
      <Container className="py-10">
        <aside aria-label="운영자의 다른 서비스" className="mb-10">
          <a
            href="https://www.sajudalyeok.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-sm transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex items-center gap-5">
              <span className="hidden rounded-2xl border border-white/15 bg-white/5 p-4 sm:block" aria-hidden="true">
                <MoonStar className="h-10 w-10 text-amber-200" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs text-indigo-200">운영자가 함께 만드는 서비스 · 사주달력</p>
                <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">잠깐 쉬어가며, 나의 사주가 궁금하다면</p>
                <p className="mt-2 text-sm text-slate-300">사주 · 만세력 · 타로를 사주달력에서 만나보세요.</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-amber-100 px-5 py-3 text-sm font-bold text-slate-950 transition group-hover:bg-amber-200 sm:self-auto">
              사주달력 보러가기 <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(새 창)</span>
            </span>
          </a>
        </aside>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-ink">{siteName}</p>
            <p className="mt-1 text-sm text-ink-soft">
              금융·세금 계산은 참고용 예상 결과입니다.
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              문의:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="underline underline-offset-2 hover:text-ink"
              >
                {contactEmail}
              </a>
            </p>
          </div>

          <nav aria-label="정책 및 안내" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft hover:text-ink hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-muted">
          제도와 기준은 변경될 수 있습니다. 실제 계약·신고·의사결정 전에는 금융기관,
          세무전문가, 고용노동부 또는 관할기관의 최신 안내를 확인하세요.
        </p>

        <p className="mt-4 text-xs text-ink-muted">
          © {year} {siteName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
