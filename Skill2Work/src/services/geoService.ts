import type { VelloreLocation } from '../types';

/**
 * Real Vellore District Landmarks with exact GPS coordinates
 */
export const VELLORE_LOCATIONS: VelloreLocation[] = [
  {
    id: 'vit_vellore',
    name: 'VIT University Campus',
    area: 'Katpadi, Vellore',
    lat: 12.9692,
    lng: 79.1559,
    category: 'campus',
    popular: true
  },
  {
    id: 'katpadi_jn',
    name: 'Katpadi Railway Junction',
    area: 'Katpadi, Vellore',
    lat: 12.9734,
    lng: 79.1384,
    category: 'transit',
    popular: true
  },
  {
    id: 'gandhi_nagar',
    name: 'Gandhi Nagar Main Road',
    area: 'Katpadi / Gandhi Nagar',
    lat: 12.9621,
    lng: 79.1412,
    category: 'commercial',
    popular: true
  },
  {
    id: 'cmc_hospital',
    name: 'CMC Hospital (Central)',
    area: 'Ida Scudder Rd, Vellore',
    lat: 12.9248,
    lng: 79.1348,
    category: 'landmark',
    popular: true
  },
  {
    id: 'vellore_fort',
    name: 'Vellore Fort & Museum',
    area: 'Officers Line, Vellore',
    lat: 12.9202,
    lng: 79.1298,
    category: 'landmark',
    popular: true
  },
  {
    id: 'sathuvachari',
    name: 'Sathuvachari Collectorate Phase 1 & 2',
    area: 'Sathuvachari, Vellore',
    lat: 12.9366,
    lng: 79.1685,
    category: 'commercial',
    popular: true
  },
  {
    id: 'new_bus_stand',
    name: 'Green Circle & New Bus Stand',
    area: 'Chelliamman Nagar, Vellore',
    lat: 12.9412,
    lng: 79.1415,
    category: 'transit',
    popular: true
  },
  {
    id: 'thottapalayam',
    name: 'Thottapalayam Vegetable Market',
    area: 'Thottapalayam, Vellore',
    lat: 12.9301,
    lng: 79.1389,
    category: 'commercial',
    popular: false
  },
  {
    id: 'bagayam_cmc',
    name: 'Bagayam CMC Campus & Otteri',
    area: 'Bagayam, South Vellore',
    lat: 12.8712,
    lng: 79.1378,
    category: 'campus',
    popular: true
  },
  {
    id: 'dharapadavedu',
    name: 'Dharapadavedu Market',
    area: 'Katpadi North, Vellore',
    lat: 12.9785,
    lng: 79.1482,
    category: 'commercial',
    popular: false
  },
  {
    id: 'salavanpet',
    name: 'Salavanpet Bazar',
    area: 'Salavanpet, Vellore',
    lat: 12.9122,
    lng: 79.1278,
    category: 'commercial',
    popular: false
  },
  {
    id: 'thorapadi',
    name: 'Thorapadi & Jail Road',
    area: 'Thorapadi, Vellore',
    lat: 12.9034,
    lng: 79.1189,
    category: 'landmark',
    popular: false
  }
];

export const VELLORE_DEFAULT_CENTER = {
  lat: 12.9366,
  lng: 79.1559,
  name: 'Vellore Central'
};

/**
 * Calculates Haversine Distance between two GPS coordinates in kilometers
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Rounded to 2 decimal places
}

/**
 * Formats distance nicely (e.g. "850 m" or "2.4 km")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Finds the closest Vellore Landmark name for a coordinate
 */
export function getClosestLandmark(lat: number, lng: number): string {
  let closest = VELLORE_LOCATIONS[0];
  let minDistance = calculateHaversineDistance(lat, lng, closest.lat, closest.lng);

  for (const loc of VELLORE_LOCATIONS) {
    const dist = calculateHaversineDistance(lat, lng, loc.lat, loc.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }

  if (minDistance < 0.5) {
    return closest.name;
  }
  return `${closest.name} (${formatDistance(minDistance)} away)`;
}
