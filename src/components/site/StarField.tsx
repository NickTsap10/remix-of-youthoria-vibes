type Star = { top: string; left: string; size: string; delay: string; color: string };

const STARS: Star[] = [
  { top: "12%", left: "8%", size: "text-xl", delay: "0s", color: "text-slate/35" },
  { top: "22%", left: "82%", size: "text-sm", delay: "1s", color: "text-mist/50" },
  { top: "48%", left: "18%", size: "text-lg", delay: "2s", color: "text-stone" },
  { top: "68%", left: "72%", size: "text-xs", delay: "0.5s", color: "text-slate/30" },
  { top: "82%", left: "40%", size: "text-2xl", delay: "1.5s", color: "text-stone" },
  { top: "35%", left: "55%", size: "text-sm", delay: "2.5s", color: "text-mist/40" },
  { top: "58%", left: "92%", size: "text-lg", delay: "3s", color: "text-slate/25" },
  { top: "8%", left: "48%", size: "text-xs", delay: "1.2s", color: "text-stone" },
];

export function StarField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute animate-star ${s.size} ${s.color}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
