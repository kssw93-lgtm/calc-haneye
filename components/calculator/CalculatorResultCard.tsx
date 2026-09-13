import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/cn";

interface CalculatorResultCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function CalculatorResultCard({
  title = "계산 결과",
  children,
  className,
}: CalculatorResultCardProps) {
  return (
    <Card className={cn("bg-surface-subtle/60", className)}>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 text-xs leading-6 text-ink-muted">참고용 예상 계산입니다. 실제 지급액·확정 세액·계약금액과 다를 수 있습니다.</p>
      <div className="mt-5">{children}</div>
    </Card>
  );
}
