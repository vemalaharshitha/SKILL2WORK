import React from 'react';
import type { Job, User } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare
} from 'lucide-react';
import { formatDistance } from '../../services/geoService';
import { useLanguage } from '../../i18n/LanguageContext';
import { localizeContent } from '../../i18n/translations';
import { triggerOfflineSms } from '../../utils/smsHelper';
import { sqliteManager } from '../../db/sqliteManager';

interface MyClaimedJobsProps {
  jobs: Job[];
  currentUser: User;
  onViewDetails: (job: Job) => void;
  onExploreGigs: () => void;
}

export const MyClaimedJobs: React.FC<MyClaimedJobsProps> = ({
  jobs,
  currentUser,
  onViewDetails,
  onExploreGigs
}) => {
  const { t, language } = useLanguage();

  const myClaimed = jobs.filter(j => j.claimed_by === currentUser.id);

  if (myClaimed.length === 0) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-dashed border-slate-200 text-center space-y-4 bg-white">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-600">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h3 className="font-heading text-lg font-bold text-slate-900">
          {t.noClaimedGigsTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {t.noClaimedGigsDesc}
        </p>
        <button
          onClick={onExploreGigs}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20 transition-all"
        >
          {t.allGigsTab}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <span>{t.myGigsTab} ({myClaimed.length})</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t.myClaimedSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myClaimed.map((job) => {
          const isCompleted = job.status === 'COMPLETED';
          const recruiterObj = sqliteManager.getUserById(job.recruiter_id);
          const recruiterPhone = recruiterObj?.phone || job.recruiter_phone || '9944011223';
          const recruiterName = recruiterObj?.name || job.recruiter_name || 'Vellore Recruiter';
          const localizedTitle = localizeContent(job.title, language);

          return (
            <div
              key={job.id}
              onClick={() => onViewDetails(job)}
              className="glass-panel rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all cursor-pointer space-y-4 relative overflow-hidden bg-white"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                    {localizeContent(job.category, language)}
                  </span>
                  <h3 className="font-heading text-base font-bold text-slate-900 mt-1">
                    {localizedTitle}
                  </h3>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border ${
                  isCompleted
                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}>
                  {isCompleted ? t.completedBadge : t.statusClaimed}
                </span>
              </div>

              {/* Landmark & Distance */}
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  <span>{localizeContent(job.landmark_area, language)}</span>
                </div>
                {job.distanceKm !== undefined && (
                  <div className="flex items-center gap-1 text-sky-600 font-semibold">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{formatDistance(job.distanceKm)}</span>
                  </div>
                )}
              </div>

              {/* Pay & Recruiter */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">{t.earnings}</div>
                  <div className="text-base font-extrabold text-sky-600">
                    ₹{job.payout_amount} <span className="text-xs font-normal text-slate-500">/ {localizeContent(job.payout_unit, language)}</span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => window.open(`tel:${recruiterPhone}`, '_self')}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                    title={t.callRecruiterBtn}
                  >
                    <Phone className="w-4 h-4 text-sky-600" />
                  </button>

                  <button
                    onClick={() => {
                      const cleanPhone = recruiterPhone.replace(/[^0-9]/g, '');
                      const msg = encodeURIComponent(`Hello ${recruiterName}, regarding "${localizedTitle}" that I accepted on Skill2Work.`);
                      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
                    }}
                    className="p-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-sm"
                    title={t.whatsappRecruiterBtn}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const msg = `Hi ${recruiterName}, I have claimed your gig "${localizedTitle}" on Skill2Work. My Name: ${currentUser.name}, Phone: ${currentUser.phone}. Please contact me!`;
                      triggerOfflineSms(recruiterPhone, msg);
                    }}
                    className="px-2.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-xs active:scale-95"
                    title="Send direct offline cellular SMS to recruiter"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Offline SMS</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
