import type { Job, User, TimeSlot } from '../types';
import { calculateHaversineDistance } from './geoService';

export interface MatchResult {
  matchScore: number;
  distanceKm: number;
  breakdown: {
    skillScore: number; // 0 to 1
    distanceScore: number; // 0 to 1
    timeScore: number; // 0 to 1
    matchedSkills: string[];
    missingSkills: string[];
  };
}

/**
 * Calculates multi-factor match score between a Job Seeker and a Job
 */
export function calculateJobMatch(user: User, job: Job): MatchResult {
  // 1. Calculate Haversine Distance
  const distanceKm = calculateHaversineDistance(
    user.latitude,
    user.longitude,
    job.latitude,
    job.longitude
  );

  // 2. Skill Alignment Calculation (Weight: 50%)
  const userSkillsNorm = (user.skills || []).map(s => s.trim().toLowerCase());

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  job.required_skills.forEach((rawSkill) => {
    const sNorm = rawSkill.trim().toLowerCase();
    // Direct match or partial substring match (e.g. 'Tamil' matches 'Tamil Speaking')
    const isMatch = userSkillsNorm.some(us => us.includes(sNorm) || sNorm.includes(us));
    if (isMatch) {
      matchedSkills.push(rawSkill);
    } else {
      missingSkills.push(rawSkill);
    }
  });

  const skillScore = job.required_skills.length > 0
    ? matchedSkills.length / job.required_skills.length
    : 0.8; // default if no specific skills required

  // 3. Distance Score Calculation (Weight: 30%)
  // Perfect 1.0 at 0km, decays smoothly over 3km radius
  let distanceScore = 1.0;
  if (distanceKm <= 0.5) {
    distanceScore = 1.0;
  } else if (distanceKm <= 1.5) {
    distanceScore = 0.9 - ((distanceKm - 0.5) / 1.0) * 0.15;
  } else if (distanceKm <= 3.0) {
    distanceScore = 0.75 - ((distanceKm - 1.5) / 1.5) * 0.35;
  } else {
    // Beyond 3km
    distanceScore = Math.max(0.05, 0.40 - ((distanceKm - 3.0) / 7.0) * 0.35);
  }

  // 4. Free-Time Schedule Fit Calculation (Weight: 20%)
  let timeScore = 0.6; // baseline
  const userSlots: TimeSlot[] = user.free_time_slots || [];

  if (userSlots.includes('Immediate')) {
    timeScore = 1.0;
  } else if (userSlots.length > 0) {
    // Check if category or description suggests evening/weekend/morning
    const desc = (job.description + ' ' + job.title + ' ' + job.category).toLowerCase();
    const hasEvening = userSlots.includes('Evening') && (desc.includes('evening') || desc.includes('night') || desc.includes('delivery'));
    const hasWeekend = userSlots.includes('Weekend') && (desc.includes('weekend') || desc.includes('event') || desc.includes('catering'));
    const hasMorning = userSlots.includes('Morning') && (desc.includes('morning') || desc.includes('store') || desc.includes('helper'));

    if (hasEvening || hasWeekend || hasMorning) {
      timeScore = 0.95;
    } else {
      timeScore = 0.75;
    }
  }

  // Combined weighted score
  const totalScoreRaw = (skillScore * 0.50) + (distanceScore * 0.30) + (timeScore * 0.20);
  const matchScore = Math.min(99, Math.max(18, Math.round(totalScoreRaw * 100)));

  return {
    matchScore,
    distanceKm,
    breakdown: {
      skillScore: Math.round(skillScore * 100),
      distanceScore: Math.round(distanceScore * 100),
      timeScore: Math.round(timeScore * 100),
      matchedSkills,
      missingSkills
    }
  };
}

/**
 * Enriches a list of jobs with live distance and match scores for a given seeker
 */
export function enrichJobsForSeeker(jobs: Job[], user: User): Job[] {
  return jobs.map(job => {
    const { matchScore, distanceKm, breakdown } = calculateJobMatch(user, job);
    return {
      ...job,
      distanceKm,
      matchScore,
      matchBreakdown: breakdown
    };
  });
}
