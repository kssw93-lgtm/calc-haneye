import type { ReactNode } from "react";
import { calculators } from "@/lib/constants/calculatorMetadata";
import { supplementalGuides } from "@/lib/constants/supplementalGuides";
import { RelatedCalculationContent } from "@/components/calculator/RelatedCalculationContent";
export default function CalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}<RelatedCalculationContent tools={calculators.map(({ slug, href, title, category, guideHref }) => ({ slug, href, title, category, guideHref }))} articles={supplementalGuides.map(({ slug, title, calculator }) => ({ slug, title, calculator }))} /></>;
}
