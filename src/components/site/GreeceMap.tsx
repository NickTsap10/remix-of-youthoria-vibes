import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { regions } from "@/data/atlas";
import { useI18n } from "@/lib/i18n";

/**
 * Stylized decorative map of Greece with plotted regions.
 * Not geographically accurate — an editorial abstraction. Regions with
 * an episodeId are highlighted turquoise/blue and clickable; others are muted.
 */
export function GreeceMap({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useI18n();
  const [hover, setHover] = useState<string | null>(null);
  const active = regions.find((r) => r.id === hover);

  return (
    <div className="relative w-full aspect-square">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-label="Map of Greece"
      >
        {/* Decorative concentric rings */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#039397" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#039397" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#glow)" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(252,244,233,0.06)" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(252,244,233,0.05)" strokeWidth="0.15" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(252,244,233,0.04)" strokeWidth="0.1" />

        {/* Abstract landmass silhouette (stylized Greece) */}
        <path
          d="M 20 22 Q 30 14 42 18 L 48 16 Q 54 20 50 26 Q 56 30 52 36 L 58 40 Q 46 46 44 54 L 42 62 Q 34 66 30 72 L 34 80 Q 28 84 24 78 Q 18 68 22 58 Q 16 48 20 40 Z"
          fill="rgba(252,244,233,0.04)"
          stroke="rgba(252,244,233,0.12)"
          strokeWidth="0.25"
        />
        {/* Aegean islands hint */}
        <path d="M 60 45 Q 66 44 68 48 Q 72 52 68 56 Q 62 58 60 54 Z" fill="rgba(252,244,233,0.04)" stroke="rgba(252,244,233,0.1)" strokeWidth="0.2" />
        <path d="M 78 78 Q 88 76 90 82 Q 88 88 82 88 Q 76 84 78 78 Z" fill="rgba(252,244,233,0.04)" stroke="rgba(252,244,233,0.1)" strokeWidth="0.2" />
        <path d="M 40 88 Q 55 86 62 90 Q 55 94 42 92 Z" fill="rgba(252,244,233,0.04)" stroke="rgba(252,244,233,0.1)" strokeWidth="0.2" />

        {/* Region dots */}
        {regions.map((r) => {
          const active = !!r.episodeId;
          const isHover = hover === r.id;
          return (
            <g key={r.id} transform={`translate(${r.x} ${r.y})`}>
              {active && (
                <circle
                  r={isHover ? 3.5 : 2.6}
                  fill="#039397"
                  opacity="0.25"
                  className="transition-all"
                />
              )}
              <circle
                r={active ? 1.3 : 0.7}
                fill={active ? "#039397" : "rgba(252,244,233,0.35)"}
                stroke={active ? "#FCF4E9" : "none"}
                strokeWidth="0.2"
                className={active ? "cursor-pointer" : ""}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover((h) => (h === r.id ? null : h))}
              />
              {active && (
                <text
                  y={-2.2}
                  textAnchor="middle"
                  fontSize="2.2"
                  fontWeight="600"
                  fill="#FCF4E9"
                  className="pointer-events-none select-none"
                >
                  {r.name[lang]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {!compact && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-4 justify-between text-[10px] font-semibold uppercase tracking-widest text-cream/50">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-turquoise" /> {t("atlas.legend.available")}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-cream/30" /> {t("atlas.legend.soon")}
          </span>
        </div>
      )}

      {/* Hover info */}
      {active?.episodeId && (
        <Link
          to="/episodes"
          hash={active.episodeId}
          className="absolute top-3 left-3 max-w-[60%] rounded-2xl bg-midnight/90 backdrop-blur border border-turquoise/30 p-3 text-left animate-fade-up"
        >
          <div className="label-eyebrow">{t("atlas.legend.available")}</div>
          <div className="font-display text-xl mt-1">{active.name[lang]}</div>
          {active.description && (
            <div className="text-xs text-cream/60 mt-1">{active.description[lang]}</div>
          )}
        </Link>
      )}
    </div>
  );
}