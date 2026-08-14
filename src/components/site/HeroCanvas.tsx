import { useEffect, useState } from "react";

/**
 * Atmospheric editorial backdrop for the homepage hero.
 * Pure SVG/CSS — no images, no libraries. Subtle parallax on scroll.
 */
export function HeroCanvas() {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* depth wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,rgba(247,245,239,0.16),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_92%_100%,rgba(44,55,66,0.35),transparent_65%)]" />

      {/* giant abstract Y */}
      <svg
        className="absolute -right-[12%] top-1/2 h-[135%] w-auto -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 200 260"
        fill="none"
        style={{ transform: `translateY(calc(-50% + ${y * -0.06}px))` }}
      >
        <path d="M12 14 L100 132 L188 14" stroke="#F7F5EF" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 132 L100 250" stroke="#F7F5EF" strokeWidth="6" strokeLinecap="round" />
      </svg>

      {/* organic low-opacity shapes */}
      <div
        className="absolute -left-32 top-[8%] size-[34rem] rounded-full border border-[#CCC7B7]/15"
        style={{ transform: `translateY(${y * 0.05}px)` }}
      />
      <div
        className="absolute left-[54%] -bottom-40 size-[26rem] rounded-[46%_54%_38%_62%/52%_44%_56%_48%] bg-[#EAE0C7]/[0.05]"
        style={{ transform: `translateY(${y * -0.04}px)` }}
      />

      {/* waveform-inspired curves */}
      <svg
        className="absolute inset-x-0 bottom-[12%] h-56 w-full opacity-[0.22]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
        style={{ transform: `translateY(${y * 0.08}px)` }}
      >
        {[0, 18, 36, 54].map((o, i) => (
          <path
            key={o}
            d={`M0 ${120 + o} C 220 ${40 + o} 400 ${180 + o} 640 ${110 + o} S 1100 ${30 + o} 1440 ${100 + o}`}
            stroke="#CCC7B7"
            strokeOpacity={0.5 - i * 0.09}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* thin editorial rules */}
      <div className="absolute inset-y-0 left-6 w-px bg-[#CCC7B7]/15 sm:left-10" />
      <div className="absolute inset-y-0 right-6 w-px bg-[#CCC7B7]/15 sm:right-10" />
      <div className="absolute inset-x-6 top-[26%] h-px bg-[#CCC7B7]/12 sm:inset-x-10" />

      {/* grain */}
      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
