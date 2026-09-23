export function CalculatorSkeleton() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2" aria-hidden="true">
      <div className="h-80 animate-pulse rounded-card border border-hairline bg-white" />
      <div className="h-80 animate-pulse rounded-card border border-hairline bg-surface-subtle" />
    </div>
  );
}
