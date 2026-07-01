/**
 * Recognizable outline of Greece rendered from a compact SVG path.
 * Includes mainland, Peloponnese, Crete and Aegean/Ionian island hints.
 */
export function GreeceMap() {
  return (
    <div className="relative w-full aspect-[4/5]">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full"
        aria-label="Map of Greece"
      >
        <defs>
          <radialGradient id="greeceGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#039397" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#039397" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCF4E9" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#039397" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="500" fill="url(#greeceGlow)" />

        <g fill="url(#landFill)" stroke="#039397" strokeWidth="1.2" strokeLinejoin="round">
          {/* Northern mainland: Macedonia / Thrace */}
          <path d="M60,90 L120,70 L170,80 L210,65 L260,72 L305,88 L340,95 L338,120 L300,130 L270,125 L245,140 L220,138 L200,150 L185,148 L170,160 L150,158 L130,170 L118,190 L110,215 L120,240 L140,255 L165,258 L180,270 L175,290 L160,305 L150,325 L155,345 L140,360 L125,355 L108,335 L95,300 L80,260 L70,220 L58,175 L52,135 Z" />
          {/* Peloponnese */}
          <path d="M118,360 L145,368 L165,362 L182,375 L188,395 L175,415 L155,425 L135,420 L118,405 L108,388 Z" />
          {/* Attica peninsula */}
          <path d="M180,275 L205,272 L218,285 L212,300 L195,305 L185,295 Z" />
          {/* Chalkidiki hints */}
          <path d="M158,158 L172,162 L168,180 L155,175 Z" />
          <path d="M180,155 L192,158 L188,178 L176,172 Z" />
          <path d="M198,152 L212,157 L210,180 L196,172 Z" />
          {/* Evia */}
          <path d="M210,235 L240,255 L245,275 L232,278 L212,258 Z" />
          {/* Crete */}
          <path d="M180,455 L240,450 L285,455 L305,465 L280,475 L230,472 L190,470 Z" />
          {/* Corfu / Ionian */}
          <path d="M55,205 L68,208 L66,235 L54,232 Z" />
          <path d="M60,255 L72,258 L70,278 L58,275 Z" />
          {/* Cyclades cluster */}
          <circle cx="255" cy="330" r="6" />
          <circle cx="272" cy="345" r="5" />
          <circle cx="288" cy="325" r="7" />
          <circle cx="300" cy="352" r="4" />
          <circle cx="245" cy="360" r="5" />
          <circle cx="278" cy="370" r="4" />
          {/* Dodecanese */}
          <circle cx="335" cy="360" r="5" />
          <circle cx="352" cy="380" r="6" />
          <circle cx="345" cy="400" r="8" />
          {/* North Aegean: Lesbos, Chios, Samos */}
          <path d="M295,215 L318,220 L316,240 L295,238 Z" />
          <path d="M310,255 L325,260 L322,278 L308,275 Z" />
          <path d="M328,295 L348,300 L346,315 L328,312 Z" />
          {/* Rhodes */}
          <path d="M362,415 L378,420 L376,440 L360,436 Z" />
        </g>

        {/* Decorative stars */}
        <g fill="#039397" opacity="0.6">
          <text x="200" y="440" textAnchor="middle" fontSize="14">✦</text>
        </g>
      </svg>
    </div>
  );
}