export type MapLocation = {
  id: string;
  name: string;
  /** Percentage coordinates (0-100) relative to the map image. */
  x: number;
  y: number;
  episodeId?: string;
};

/**
 * Map markers rendered on top of the Greece map.
 * Structured as data so an admin panel can later add / edit / remove entries.
 */
export const mapLocations: MapLocation[] = [
  { id: "athens", name: "Athens", x: 44, y: 66 },
  { id: "thessaloniki", name: "Thessaloniki", x: 42, y: 24 },
];