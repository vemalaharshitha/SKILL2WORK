import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Navigation, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Job, User } from '../../types';
import { formatDistance } from '../../services/geoService';
import { useLanguage } from '../../i18n/LanguageContext';
import { localizeContent } from '../../i18n/translations';

interface JobCardProps {
  job: Job;
  currentUser: User | null;
  onClaim: (jobId: string) => void;
  onViewDetails: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  currentUser,
  onClaim,
  onViewDetails
}) => {
  const { t, language } = useLanguage();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const isClaimedByMe = currentUser && job.claimed_by === currentUser.id;
  const isClaimedByOther = job.status === 'CLAIMED' && !isClaimedByMe;
  const isCompleted = job.status === 'COMPLETED';

  const matchScore = job.matchScore || 50;

  const handleClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClaiming(true);
    
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#38bdf8', '#0ea5e9', '#ffffff', '#e0f2fe']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onClaim(job.id);
      setIsClaiming(false);
    }, 250);
  };

  const getMatchScoreBadge = () => {
    if (matchScore >= 85) {
      return 'bg-sky-50 text-sky-700 border-sky-200 shadow-xs';
    } else if (matchScore >= 70) {
      return 'bg-slate-100 text-slate-700 border-slate-200';
    } else {
      return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(job)}
      className="glass-panel rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:border-sky-400 hover:shadow-md hover:shadow-sky-500/10 cursor-pointer relative overflow-hidden bg-white group border-slate-200"
    >
      {/* Top row: Category, Landmark & Match Score */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            {localizeContent(job.category, language)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-[240px]">{localizeContent(job.landmark_area, language)}</span>
          </span>
        </div>

        {/* Match score pill */}
        <div className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border flex items-center gap-1 shadow-xs shrink-0 ${getMatchScoreBadge()}`}>
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>{matchScore}% {t.matchScore}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
        {localizeContent(job.title, language)}
      </h3>

      {/* Description Snippet */}
      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
        {localizeContent(job.description, language)}
      </p>

      {/* Required Skills Chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.required_skills.map((skill, idx) => {
          const isSkillMatched = currentUser?.skills.some(
            us => us.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(us.toLowerCase())
          );

          return (
            <span
              key={idx}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                isSkillMatched
                  ? 'bg-sky-50 text-sky-700 border-sky-200 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {isSkillMatched && <CheckCircle className="w-3 h-3 text-sky-500" />}
              {localizeContent(skill, language)}
            </span>
          );
        })}
      </div>

      {/* Distance, Payout & Claim Action */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex items-center gap-4">
          {/* Pay Rate */}
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.payout}</div>
            <div className="text-base sm:text-lg font-extrabold text-sky-600 flex items-center">
              <span>₹{job.payout_amount}</span>
              <span className="text-xs font-normal text-slate-500 ml-1">/ {localizeContent(job.payout_unit, language)}</span>
            </div>
          </div>

          {/* Distance */}
          {job.distanceKm !== undefined && (
            <div className="border-l border-slate-200 pl-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.proximity}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-sky-500" />
                <span>{formatDistance(job.distanceKm)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBreakdown(!showBreakdown);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Toggle Match Score Breakdown"
          >
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {job.status === 'OPEN' && (
            <button
              onClick={handleClaim}
              disabled={isClaiming}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isClaiming ? t.claiming : t.claimJobBtn}</span>
            </button>
          )}

          {isClaimedByMe && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              {t.claimedBadge}
            </span>
          )}

          {isClaimedByOther && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {t.claimedOtherBadge}
            </span>
          )}

          {isCompleted && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {t.completedBadge}
            </span>
          )}

        </div>

      </div>

      {/* Match Score Breakdown Accordion */}
      {showBreakdown && job.matchBreakdown && (
        <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-2 bg-slate-50 p-3.5 rounded-xl">
          <div className="font-bold text-slate-900 flex items-center justify-between">
            <span>{t.breakdownTitle}</span>
            <span className="text-sky-600 font-extrabold">{job.matchScore}% {t.overall}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <div className="text-[10px] text-slate-500">{t.skillFit} (50%)</div>
              <div className="font-bold text-sky-600 text-sm">{job.matchBreakdown.skillScore}%</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <div className="text-[10px] text-slate-500">{t.distanceFit} (30%)</div>
              <div className="font-bold text-slate-900 text-sm">{job.matchBreakdown.distanceScore}%</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <div className="text-[10px] text-slate-500">{t.scheduleFit} (20%)</div>
              <div className="font-bold text-sky-600 text-sm">{job.matchBreakdown.timeScore}%</div>
            </div>
          </div>

          {job.matchBreakdown.missingSkills.length > 0 && (
            <div className="text-[11px] text-slate-600 pt-1">
              <span className="text-sky-600 font-medium">{t.missingSkillsLabel}: </span>
              {job.matchBreakdown.missingSkills.map(s => localizeContent(s, language)).join(', ')}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
