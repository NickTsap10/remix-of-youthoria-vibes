import greeceMapAsset from "@/assets/map/greece-map.png.asset.json";
import { mapLocations, type MapLocation } from "@/data/mapLocations";

type Props = {
  locations?: MapLocation[];
};

/**
 * Greece map rendered from a royalty-free image with data-driven markers on top.
 * Marker positions are percentage-based so they scale with the container.
 * Structured so a future admin panel can supply the `locations` prop from a DB.
 */
export function GreeceMap({ locations = mapLocations }: Props) {
  return (
    <div className="relative w-full aspect-square">
      <img
        src={greeceMapAsset.url}
        alt="Map of Greece"
        className="absolute inset-0 w-full h-full object-contain opacity-90 [filter:invert(1)_brightness(1.1)_sepia(0.3)_hue-rotate(140deg)_saturate(2)]"
      />
      {locations.map((loc) => (
        <button
          key={loc.id}
          type="button"
          aria-label={loc.name}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
        >
          <span className="relative block">
            <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
            <span className="relative block size-4 rounded-full bg-blue-500 ring-4 ring-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
          </span>
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-cream/90 opacity-0 group-hover:opacity-100 transition-opacity">
            {loc.name}
          </span>
        </button>
      ))}
    </div>
  );
}