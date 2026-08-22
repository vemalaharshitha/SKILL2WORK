export type Role = 'seeker' | 'recruiter';
export type Language = 'en' | 'ta' | 'hi' | 'te';
export type JobStatus = 'OPEN' | 'CLAIMED' | 'COMPLETED';

export type TimeSlot = 
  | 'Morning' 
  | 'Afternoon' 
  | 'Evening' 
  | 'Night' 
  | 'Weekend' 
  | 'Immediate';

export interface User {
  id: string;
  role: Role;
  name: string;
  age: number;
  phone: string;
  skills: string[]; // parsed from JSON array
  free_time_slots: TimeSlot[]; // parsed from JSON array
  preferred_language: Language;
  latitude: number;
  longitude: number;
  created_at?: string;
}

export interface Job {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  category: string;
  required_skills: string[]; // parsed from JSON array
  payout_amount: number;
  payout_unit: 'hour' | 'task' | 'day' | 'shift';
  latitude: number;
  longitude: number;
  landmark_area: string;
  status: JobStatus;
  claimed_by: string | null;
  created_at: string;
  // Computed client-side fields
  distanceKm?: number;
  matchScore?: number;
  matchBreakdown?: {
    skillScore: number;
    distanceScore: number;
    timeScore: number;
    matchedSkills: string[];
    missingSkills: string[];
  };
  recruiter_name?: string;
  recruiter_phone?: string;
  claimed_by_name?: string;
  claimed_by_phone?: string;
}

export interface VelloreLocation {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  category?: 'landmark' | 'transit' | 'campus' | 'commercial';
  popular?: boolean;
}

export interface FilterState {
  maxDistanceKm: number;
  category: string;
  minPayout: number;
  timeSlot: string;
  searchQuery: string;
  onlyWithin3km: boolean;
  statusFilter: 'ALL' | 'OPEN' | 'CLAIMED' | 'COMPLETED';
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'job_alert' | 'claim' | 'completed' | 'rating' | 'system';
  is_read: boolean;
  created_at: string;
  linkJobId?: string;
}

export interface FeedbackReview {
  id: string;
  job_id: string;
  job_title: string;
  from_user_id: string;
  from_user_name: string;
  to_user_id: string;
  rating: number; // 1 to 5
  tags: string[];
  comment: string;
  created_at: string;
}

export interface SkillDemandStat {
  skill: string;
  demandPercentage: number;
  openGigsCount: number;
  avgHourlyPay: number;
  topLandmark: string;
  growthRate: string;
}
