/**
 * UTD building abbreviations and coordinates for resolving event locations to lat/lng.
 * Used for travel-time and "leave now" notifications.
 */

export interface BuildingCoords {
  abbr: string;
  lat: number;
  lng: number;
}

// Buildings with abbreviations (used to resolve "ECSS 2.123" -> coords)
const BUILDINGS_WITH_ABBR: BuildingCoords[] = [
  { abbr: 'BE', lat: 32.987717, lng: -96.750458 },
  { abbr: 'AD', lat: 32.989712, lng: -96.748367 },
  { abbr: 'MC', lat: 32.986958, lng: -96.747620 },
  { abbr: 'AB', lat: 32.985210, lng: -96.749306 },
  { abbr: 'BSB', lat: 32.991535, lng: -96.750046 },
  { abbr: 'CR', lat: 32.992481, lng: -96.748535 },
  { abbr: 'CRA', lat: 32.991722, lng: -96.748421 },
  { abbr: 'DGA', lat: 32.986183, lng: -96.746574 },
  { abbr: 'RHC', lat: 32.991550, lng: -96.751419 },
  { abbr: 'RHV', lat: 32.991116, lng: -96.754646 },
  { abbr: 'RHA', lat: 32.990520, lng: -96.754654 },
  { abbr: 'RHH', lat: 32.989975, lng: -96.753296 },
  { abbr: 'RHS', lat: 32.989975, lng: -96.751366 },
  { abbr: 'CH6', lat: 32.980637, lng: -96.755341 },
  { abbr: 'CH7', lat: 32.981586, lng: -96.755264 },
  { abbr: 'ATC', lat: 32.986137, lng: -96.747566 },
  { abbr: 'ECSS', lat: 32.986240, lng: -96.750420 },
  { abbr: 'ECSW', lat: 32.986191, lng: -96.751671 },
  { abbr: 'JO', lat: 32.988895, lng: -96.748863 },
  { abbr: 'FM', lat: 32.992294, lng: -96.746658 },
  { abbr: 'FO', lat: 32.987701, lng: -96.749069 },
  { abbr: 'FN', lat: 32.988144, lng: -96.749359 },
  { abbr: 'FA', lat: 32.987690, lng: -96.749886 },
  { abbr: 'HH', lat: 32.986992, lng: -96.751633 },
  { abbr: 'ML1', lat: 32.986870, lng: -96.752625 },
  { abbr: 'ML2', lat: 32.986870, lng: -96.753288 },
  { abbr: 'RL', lat: 32.992561, lng: -96.750443 },
  { abbr: 'JSOM', lat: 32.985046, lng: -96.746803 },
  { abbr: 'ECSN', lat: 32.986992, lng: -96.750366 },
  { abbr: 'NL', lat: 32.990318, lng: -96.749214 },
  { abbr: 'NB', lat: 32.990067, lng: -96.749397 },
  { abbr: 'PHA', lat: 32.989506, lng: -96.749931 },
  { abbr: 'PHY', lat: 32.989441, lng: -96.750381 },
  { abbr: 'ROC', lat: 32.986290, lng: -96.757126 },
  { abbr: 'ROW', lat: 32.986259, lng: -96.758545 },
  { abbr: 'SG', lat: 32.990902, lng: -96.746864 },
  { abbr: 'SLC', lat: 32.988235, lng: -96.750397 },
  { abbr: 'SB', lat: 32.991299, lng: -96.746429 },
  { abbr: 'SSB', lat: 32.985943, lng: -96.748840 },
  { abbr: 'SSA', lat: 32.986092, lng: -96.749435 },
  { abbr: 'SU', lat: 32.986942, lng: -96.748840 },
  { abbr: 'SPN', lat: 32.994007, lng: -96.752197 },
  { abbr: 'SP2', lat: 32.995022, lng: -96.753319 },
  { abbr: 'PD', lat: 32.991692, lng: -96.745720 },
  { abbr: 'WSTC', lat: 32.991985, lng: -96.757393 },
  { abbr: 'CB', lat: 32.989700, lng: -96.749344 },
  { abbr: 'GR', lat: 32.988659, lng: -96.747871 },
  { abbr: 'TH', lat: 32.988445, lng: -96.748718 },
  { abbr: 'APC', lat: 32.983860, lng: -96.747261 },
  { abbr: 'TI-BMES', lat: 32.818932, lng: -96.837891 },
  { abbr: 'WAAC', lat: 32.990391, lng: -96.758049 },
  { abbr: 'ACB', lat: 32.984619, lng: -96.749641 },
  { abbr: 'CM1', lat: 32.992615, lng: -96.746956 },
  { abbr: 'FMCS', lat: 32.991722, lng: -96.747299 },
  { abbr: 'FMSB', lat: 32.992222, lng: -96.746979 },
  { abbr: 'FME', lat: 32.992744, lng: -96.746628 },
  { abbr: 'FMF', lat: 32.992416, lng: -96.745827 },
  { abbr: 'FMPB', lat: 32.992287, lng: -96.746353 },
  { abbr: 'FMGH', lat: 32.992737, lng: -96.746231 },
  { abbr: 'CM2', lat: 32.992706, lng: -96.746956 },
  { abbr: 'CM3', lat: 32.992802, lng: -96.746948 },
  { abbr: 'SCI', lat: 32.988945, lng: -96.750320 },
];

const ABBR_MAP = new Map(BUILDINGS_WITH_ABBR.map((b) => [b.abbr.toUpperCase(), b]));

/**
 * Resolve a location string (e.g. "ECSS 2.123", "ECSS", "TBD") to coordinates.
 * Returns null if unknown or TBD.
 */
export function getCoordsForLocation(location: string): { lat: number; lng: number } | null {
  const trimmed = (location || '').trim();
  if (!trimmed || trimmed.toUpperCase() === 'TBD') return null;
  const firstWord = trimmed.split(/\s+/)[0]?.toUpperCase();
  if (!firstWord) return null;
  const building = ABBR_MAP.get(firstWord) ?? ABBR_MAP.get(trimmed.toUpperCase());
  return building ? { lat: building.lat, lng: building.lng } : null;
}

/**
 * Haversine distance in km between two points.
 */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Walking speed assumption (km/h) for travel time estimate. */
export const WALKING_SPEED_KMH = 5;

/** Buffer (minutes) to arrive before event start. */
export const ARRIVAL_BUFFER_MINUTES = 10;

/** Consider "at venue" if within this distance (km). */
export const AT_VENUE_RADIUS_KM = 0.2;
