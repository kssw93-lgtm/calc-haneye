import { Banknote, BriefcaseBusiness, GraduationCap, House, Landmark, Users, type LucideIcon } from "lucide-react";
import clsx from "clsx";

const categoryIcons: Record<string, LucideIcon> = {
  "주거·부동산": House,
  "대출·금융": Landmark,
  "근로·소득": BriefcaseBusiness,
  "청년·가족": Users,
  "교육·취업": GraduationCap,
  "생활지원": Banknote,
};

const categoryColors: Record<string, string> = {
  "주거·부동산": "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "대출·금융": "bg-blue-50 text-blue-700 ring-blue-100",
  "근로·소득": "bg-amber-50 text-amber-700 ring-amber-100",
  "청년·가족": "bg-violet-50 text-violet-700 ring-violet-100",
  "교육·취업": "bg-cyan-50 text-cyan-700 ring-cyan-100",
  "생활지원": "bg-rose-50 text-rose-700 ring-rose-100",
};

export function PolicyCategoryIcon({ category, large = false }: { category: string; large?: boolean }) {
  const Icon = categoryIcons[category] ?? Banknote;
  return <div aria-hidden="true" className={clsx("flex shrink-0 items-center justify-center rounded-2xl ring-1", categoryColors[category] ?? "bg-brand-light text-brand ring-brand/10", large ? "h-16 w-16" : "h-11 w-11")}><Icon strokeWidth={1.8} className={large ? "h-8 w-8" : "h-5 w-5"} /></div>;
}
