import React from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Navigation, 
  Building2, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Job, User } from '../../types';
import { formatDistance } from '../../services/geoService';
import { useLanguage } from '../../i18n/LanguageContext';
import { localizeContent } from '../../i18n/translations';
import { triggerOfflineSms } from '../../utils/smsHelper';
import { sqliteManager } from '../../db/sqliteManager';

interface JobDetailsModalProps {
  job: Job | null;
  currentUser: User | null;
  onClose: () => void;
  onClaim: (jobId: string) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  currentUser,
  onClose,
  onClaim
}) => {
  const { t, language } = useLanguage();

  if (!job) return null;

  const isClaimedByMe = currentUser && job.claimed_by === currentUser.id;

  const recruiterObj = sqliteManager.getUserById(job.recruiter_id);
  const recruiterPhone = recruiterObj?.phone || job.recruiter_phone || '9944011223';
  const recruiterName = recruiterObj?.name || job.recruiter_name || 'Vellore Business Partner';

  const handleClaim = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    onClaim(job.id);
  };

  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`;
    window.open(url, '_blank');
  };

  const openWhatsApp = () => {
    const cleanPhone = recruiterPhone.replace(/[^0-9]/g, '');
    const localizedTitle = localizeContent(job.title, language);
    const msg = encodeURIComponent(`Hello ${recruiterName}, I saw your part-time gig listing "${localizedTitle}" on Skill2Work Vellore and would like to connect.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-3xl border border-slate-200 shadow-2xl bg-white overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-white">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                {localizeContent(job.category, language)}
              </span>
              {job.matchScore && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-500" />
                  {job.matchScore}% {t.matchScore}
                </span>
              )}
              {job.status === 'CLAIMED' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {isClaimedByMe ? t.claimedBadge : t.claimedOtherBadge}
                </span>
              )}
            </div>

            <h2 className="font-heading text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
              {localizeContent(job.title, language)}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{t.payRate}</div>
              <div className="text-lg font-extrabold text-sky-600 mt-0.5">
                ₹{job.payout_amount} <span className="text-xs font-normal text-slate-500">/ {localizeContent(job.payout_unit, language)}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{t.distance}</div>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5 flex items-center gap-1">
                <Navigation className="w-4 h-4 text-sky-500" />
                <span>{job.distanceKm !== undefined ? formatDistance(job.distanceKm) : 'Vellore'}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{t.postedDate}</div>
              <div className="text-sm font-bold text-slate-800 mt-1 truncate">
                {job.created_at?.split(' ')[0] || 'Today'}
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {t.descriptionLabel}
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {localizeContent(job.description, language)}
            </p>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {t.requiredSkillsLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map((skill, idx) => {
                const isMatched = currentUser?.skills.some(
                  s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase())
                );

                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                      isMatched
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {isMatched ? <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>}
                    {localizeContent(skill, language)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Location & Directions */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.gigLocation}</div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{localizeContent(job.landmark_area, language)}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {t.coordinates}: {job.latitude.toFixed(4)}° N, {job.longitude.toFixed(4)}° E
                </div>
              </div>

              <button
                onClick={openGoogleMapsDirections}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-sky-700 border border-slate-200 flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-500" />
                <span>{t.directionsBtn}</span>
              </button>
            </div>
          </div>

          {/* Recruiter Contact Box */}
          <div className="bg-gradient-to-r from-sky-50 via-sky-100/30 to-white p-4 rounded-2xl border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] text-sky-700 font-semibold uppercase tracking-wider">{t.postedByRecruiter}</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>{recruiterName}</span>
              </div>
              <div className="text-xs text-slate-500">{recruiterPhone}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(`tel:${recruiterPhone}`, '_self')}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.callRecruiterBtn}</span>
              </button>

              <button
                onClick={openWhatsApp}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-sky-500/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.whatsappRecruiterBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const msg = `Hi ${recruiterName}, I am interested in your gig '${job.title}' on Skill2Work. My Name: ${currentUser?.name || 'Job Seeker'}, Phone: ${currentUser?.phone || ''}. Please contact me!`;
                  triggerOfflineSms(recruiterPhone, msg);
                }}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Offline SMS</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {t.close}
          </button>

          {job.status === 'OPEN' ? (
            <button
              onClick={handleClaim}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.claimJobBtn}</span>
            </button>
          ) : isClaimedByMe ? (
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-4 py-2 rounded-xl border border-sky-200">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>{t.claimedBadge}</span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-slate-500">
              {job.status === 'COMPLETED' ? t.completedBadge : t.claimedOtherBadge}
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
