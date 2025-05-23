
import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";

export default function CarbonScoreMeter({ score }: { score: number }) {
  // Animate the gauge fill
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf: number | null = null;
    let start = display;
    let diff = score - display;
    let step = 0;
    function animate() {
      if (Math.abs(display - score) < 1 || step > 50) {
        setDisplay(score);
        return;
      }
      setDisplay(last => last + diff / (60 - step));
      step++;
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
    // We want to animate every time score changes, not when display changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);
  const color =
    score >= 85
      ? "text-green-500"
      : score >= 70
      ? "text-yellow-500"
      : "text-red-500";

  // SVG Gauge
  const percent = Math.max(0, Math.min(display, 100));
  const circ = 120;
  const dash = (percent / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative">
        <svg width="60" height="60" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="19"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          <circle
            cx="21"
            cy="21"
            r="19"
            fill="none"
            stroke={score >= 85 ? "#22c55e" : score >= 70 ? "#eab308" : "#ef4444"}
            strokeWidth="4"
            strokeDasharray={`${circ},${circ}`}
            strokeDashoffset={circ - dash}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.41,1.22,.61,1.06)" }}
          />
          <text
            x="21"
            y="25"
            textAnchor="middle"
            fontSize="1.3em"
            fontWeight={700}
            fill="#333"
          >
            {Math.round(score)}
          </text>
        </svg>
        <Gauge className={`absolute top-3 left-3 w-8 h-8 opacity-20 pointer-events-none ${color}`} />
      </div>
      <p className={`mt-2 font-semibold ${color}`} style={{ fontFamily: "sans-serif" }}>
        Carbon Score
      </p>
    </div>
  );
}
