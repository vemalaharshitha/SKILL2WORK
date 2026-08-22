import React from 'react';
import { BarChart3, TrendingUp, MapPin, IndianRupee, Zap, X } from 'lucide-react';
import type { SkillDemandStat, Language } from '../types';
import { localizeContent } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

interface CommunityDemandModalProps {
  stats: SkillDemandStat[];
  language: Language;
  onClose: () => void;
  onSelectSkillFilter?: (skill: string) => void;
}

export const CommunityDemandModal: React.FC<CommunityDemandModalProps> = ({
  stats,
  language,
  onClose,
  onSelectSkillFilter: _onSelectSkillFilter
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-3xl border border-slate-200 shadow-2xl bg-white overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  {t.demandModalTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
                  {t.demandRegionBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t.demandModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Key Insight Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 space-y-1">
              <div className="text-[10px] text-sky-700 font-bold uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{t.topInDemandRole}</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                {localizeContent(stats[0]?.skill || 'Delivery', language)}
              </div>
              <div className="text-[11px] text-sky-600 font-semibold">
                {stats[0]?.growthRate || '+28% growth'}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-sky-500" />
                <span>{t.avgHourlyPayout}</span>
              </div>
              <div className="text-lg font-extrabold text-sky-600">
                ₹175 - ₹350 <span className="text-xs font-normal text-slate-500">/ {t.perHour}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {t.hourlyPaySub}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.peakHiringWindows}</span>
              </div>
              <div className="text-base font-extrabold text-slate-900">
                5 PM - 9 PM & {t.perShift}
              </div>
              <div className="text-[11px] text-slate-500">
                {t.peakHiringSub}
              </div>
            </div>
          </div>

          {/* Skill Demand Breakdown Progress Bars */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-slate-900">
                {t.skillDemandRanking}
              </h3>
            </div>

            <div className="space-y-2.5">
              {stats.map((item, index) => {
                const localizedSkill = localizeContent(item.skill, language);
                const localizedLandmark = localizeContent(item.topLandmark, language);

                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{localizedSkill}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                          ₹{item.avgHourlyPay} / {t.perHour}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {item.demandPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
                        style={{ width: `${item.demandPercentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        <span>{t.topAreaLabel} {localizedLandmark}</span>
                      </span>
                      <span className="font-semibold text-sky-600">
                        {item.openGigsCount} {t.openGigsSuffix} ({t.growthLabel} {item.growthRate})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
