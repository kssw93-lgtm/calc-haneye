interface MarketChartGraphicProps {
  trend?: "down" | "up";
  className?: string;
}

/**
 * 실제 기사 사진 대신 사용하는 자체 제작 시황 그래픽입니다(저작권 이슈 없는 대체 이미지).
 */
export function MarketChartGraphic({
  trend = "down",
  className,
}: MarketChartGraphicProps) {
  const lineColor = trend === "down" ? "#D92D20" : "#0F9D63";
  const fillId = trend === "down" ? "newsChartDown" : "newsChartUp";
  const path =
    trend === "down"
      ? "M0 40 L40 55 L80 30 L120 62 L160 48 L200 90 L240 78 L280 118 L320 104 L360 150"
      : "M0 150 L40 128 L80 138 L120 96 L160 108 L200 68 L240 78 L280 40 L320 52 L360 20";
  const areaPath =
    trend === "down"
      ? `${path} L360 170 L0 170 Z`
      : `${path} L360 170 L0 170 Z`;

  return (
    <div
      aria-hidden="true"
      className={`flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-card border border-hairline bg-white ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 360 170"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="360" height="170" fill="#F7F8FA" />
        {[34, 68, 102, 136].map((y) => (
          <line
            key={y}
            x1="0"
            x2="360"
            y1={y}
            y2={y}
            stroke="#E7E9EE"
            strokeWidth="1"
          />
        ))}
        <path d={areaPath} fill={`url(#${fillId})`} />
        <path
          d={path}
          fill="none"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="360"
          cy={trend === "down" ? 150 : 20}
          r="5"
          fill={lineColor}
        />
      </svg>
    </div>
  );
}
