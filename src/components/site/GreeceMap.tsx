import greeceMapAsset from "@/assets/map/greece-map.png.asset.json";

export type MapPin = {
  id: string;
  name: string;
  x: number; // 0-100
  y: number; // 0-100
  onClick?: () => void;
  active?: boolean;
};

export function GreeceMap({ pins = [] }: { pins?: MapPin[] }) {
  return (
    <div className="relative w-full aspect-square">
      <img
        src={greeceMapAsset.url}
        alt="Map of Greece"
        className="absolute inset-0 w-full h-full object-contain opacity-90 [filter:invert(1)_brightness(1.1)_sepia(0.3)_hue-rotate(140deg)_saturate(2)]"
      />
      {pins.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={p.onClick}
          aria-label={p.name}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className="relative block">
            <span className={`absolute inset-0 rounded-full bg-blue-500/40 ${p.active ? "animate-ping" : ""}`} />
            <span className={`relative block rounded-full bg-blue-500 ring-4 shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-all ${
              p.active ? "size-5 ring-turquoise/50" : "size-4 ring-blue-500/25"
            }`} />
          </span>
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-cream/90 opacity-0 group-hover:opacity-100 transition-opacity">
            {p.name}
          </span>
        </button>
      ))}
    </div>
  );
}