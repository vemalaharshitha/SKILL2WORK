import React from 'react';
import { Award, Plus, Sparkles } from 'lucide-react';
import type { User, Job, Language } from '../../types';
import { localizeContent } from '../../i18n/translations';
import { useLanguage } from '../../i18n/LanguageContext';

interface SkillGapRecommendationsProps {
  currentUser: User;
  jobs: Job[];
  language: Language;
  onAddSkill: (skill: string) => void;
  onOpenProfile: () => void;
}

export const SkillGapRecommendations: React.FC<SkillGapRecommendationsProps> = ({
  currentUser,
  jobs,
  language,
  onAddSkill,
  onOpenProfile
}) => {
  const { t } = useLanguage();

  // Aggregate missing skills across high-paying local gigs
  const userSkillsLower = (currentUser.skills || []).map(s => s.toLowerCase().trim());
  const missingSkillFrequency: Record<string, { count: number; avgPay: number; exampleGigs: string[] }> = {};

  jobs.forEach(job => {
    job.required_skills.forEach(skill => {
      const sLower = skill.toLowerCase().trim();
      const hasSkill = userSkillsLower.some(us => us.includes(sLower) || sLower.includes(us));
      if (!hasSkill) {
        if (!missingSkillFrequency[skill]) {
          missingSkillFrequency[skill] = { count: 0, avgPay: 0, exampleGigs: [] };
        }
        missingSkillFrequency[skill].count += 1;
        missingSkillFrequency[skill].avgPay = Math.max(missingSkillFrequency[skill].avgPay, job.payout_amount);
        if (missingSkillFrequency[skill].exampleGigs.length < 2) {
          missingSkillFrequency[skill].exampleGigs.push(job.title);
        }
      }
    });
  });

  const recommendedSkills = Object.entries(missingSkillFrequency)
    .map(([skill, data]) => ({
      skill,
      count: data.count,
      avgPay: data.avgPay,
      exampleGigs: data.exampleGigs
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  if (recommendedSkills.length === 0) {
    return (
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              {t.allStarTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.allStarDesc}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenProfile}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          {t.viewProfile}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50/70 via-white to-sky-50/40 shadow-xs space-y-4 mb-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-base font-bold text-slate-900">
                {t.skillGapTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-300">
                {t.skillGapBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {t.skillGapDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-colors shrink-0"
        >
          {t.manageProfile}
        </button>
      </div>

      {/* Recommended Skill Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {recommendedSkills.map(({ skill, count, avgPay, exampleGigs }) => (
          <div
            key={skill}
            className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-slate-900 truncate">
                  {localizeContent(skill, language)}
                </span>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  ₹{avgPay}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                {t.neededInGigs} {count} ({localizeContent(exampleGigs[0] || 'Vellore', language)})
              </p>
            </div>

            <button
              onClick={() => onAddSkill(skill)}
              className="w-full py-1.5 rounded-lg text-xs font-bold bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-700 border border-sky-200 transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addToMySkills}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
