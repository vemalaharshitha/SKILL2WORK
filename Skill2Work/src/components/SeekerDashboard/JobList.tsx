import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  AlertCircle
} from 'lucide-react';
import type { Job, User } from '../../types';
import { JobCard } from './JobCard';
import { CATEGORIES, localizeContent } from '../../i18n/translations';
import { useLanguage } from '../../i18n/LanguageContext';

interface JobListProps {
  jobs: Job[];
  currentUser: User | null;
  onClaimJob: (jobId: string) => void;
  onViewDetails: (job: Job) => void;
  radiusKm: number;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  currentUser,
  onClaimJob,
  onViewDetails,
  radiusKm
}) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'pay'>('match');

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // 1. Radius Filter
    result = result.filter(j => {
      if (j.distanceKm === undefined) return true;
      return j.distanceKm <= radiusKm;
    });

    // 2. Search query (title, landmark, skills, description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j => {
        const localizedTitle = localizeContent(j.title, language).toLowerCase();
        const localizedLandmark = localizeContent(j.landmark_area, language).toLowerCase();
        const localizedCategory = localizeContent(j.category, language).toLowerCase();
        const localizedDesc = localizeContent(j.description, language).toLowerCase();
        const localizedSkills = j.required_skills.map(s => localizeContent(s, language).toLowerCase());

        return (
          j.title.toLowerCase().includes(q) ||
          localizedTitle.includes(q) ||
          j.landmark_area.toLowerCase().includes(q) ||
          localizedLandmark.includes(q) ||
          j.category.toLowerCase().includes(q) ||
          localizedCategory.includes(q) ||
          j.required_skills.some(s => s.toLowerCase().includes(q)) ||
          localizedSkills.some(s => s.includes(q)) ||
          j.description.toLowerCase().includes(q) ||
          localizedDesc.includes(q)
        );
      });
    }

    // 3. Category Filter
    if (selectedCategory !== 'ALL') {
      result = result.filter(j => j.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        return (b.matchScore || 0) - (a.matchScore || 0);
      } else if (sortBy === 'distance') {
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      } else if (sortBy === 'pay') {
        return b.payout_amount - a.payout_amount;
      }
      return 0;
    });

    return result;
  }, [jobs, radiusKm, searchQuery, selectedCategory, sortBy, language]);

  return (
    <div className="space-y-4">
      
      {/* Search, Filter Bar & Sort */}
      <div className="glass-panel-light p-3 sm:p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-2.5">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-slate-500 hidden sm:inline">{t.sortBy}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="match" className="bg-white text-slate-900">{t.sortMatchScore}</option>
              <option value="distance" className="bg-white text-slate-900">{t.sortDistance}</option>
              <option value="pay" className="bg-white text-slate-900">{t.sortHighestPay}</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-sky-500 text-white font-bold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t.allCategories}
          </button>
          
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {localizeContent(cat, language)}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              currentUser={currentUser}
              onClaim={onClaimJob}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-dashed border-slate-200 text-center space-y-3 bg-white">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-base font-bold text-slate-900">
            {language === 'ta'
              ? `உங்கள் ${radiusKm} கி.மீ வரம்பில் அல்லது வடிகட்டலில் வேலைகள் இல்லை.`
              : language === 'hi'
              ? `आपके ${radiusKm} किमी दायरे या फ़िल्टर में कोई गिग नहीं मिला।`
              : language === 'te'
              ? `మీ ${radiusKm} కిమీ పరిధిలో లేదా ఫిల్టర్‌లలో పనులు లేవు.`
              : `No gigs match your ${radiusKm}km radius or filter criteria.`}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'ta'
              ? `ரேடார் தூரத்தை (${radiusKm} கி.மீ இலிருந்து அதிகரிக்கவும்) அல்லது தேடல் வடிகட்டல்களை அழிக்கவும்!`
              : language === 'hi'
              ? `रडार की दूरी (${radiusKm} किमी से आगे बढ़ाएं) या खोज फ़िल्टर साफ़ करें!`
              : language === 'te'
              ? `రాడార్ దూరాన్ని (${radiusKm} కిమీ కంటే పెంచండి) లేదా ఫిల్టర్‌లను క్లియర్ చేయండి!`
              : `Try expanding the radar distance beyond ${radiusKm}km or clearing search filters!`}
          </p>
        </div>
      )}

    </div>
  );
};
