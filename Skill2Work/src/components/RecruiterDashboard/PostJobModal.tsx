import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  Plus, 
  Check, 
  Save, 
  Layers 
} from 'lucide-react';
import type { Job, User } from '../../types';
import { ALL_SKILL_OPTIONS, CATEGORIES, localizeContent } from '../../i18n/translations';
import { VELLORE_LOCATIONS, getClosestLandmark } from '../../services/geoService';
import { useLanguage } from '../../i18n/LanguageContext';
import { VelloreMapView } from '../MapView/VelloreMapView';

interface PostJobModalProps {
  recruiter: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: Omit<Job, 'id' | 'created_at'>) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  recruiter,
  isOpen,
  onClose,
  onSubmit
}) => {
  const { t, language } = useLanguage();

  const [title, setTitle] = useState('');
  const [categoriesList, setCategoriesList] = useState<string[]>(CATEGORIES);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [payoutAmount, setPayoutAmount] = useState<number>(180);
  const [payoutUnit, setPayoutUnit] = useState<'hour' | 'task' | 'shift'>('hour');
  const [skillsList, setSkillsList] = useState<string[]>(ALL_SKILL_OPTIONS);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['Tamil Speaking']);
  const [customSkill, setCustomSkill] = useState('');
  const [latitude, setLatitude] = useState(recruiter.latitude || 12.9692);
  const [longitude, setLongitude] = useState(recruiter.longitude || 79.1559);
  const [landmarkArea, setLandmarkArea] = useState('Katpadi, near VIT Main Gate');
  const [showMapPicker, setShowMapPicker] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (requiredSkills.includes(skill)) {
      setRequiredSkills(requiredSkills.filter(s => s !== skill));
    } else {
      setRequiredSkills([...requiredSkills, skill]);
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed) {
      if (!skillsList.includes(trimmed)) {
        setSkillsList(prev => [trimmed, ...prev]);
      }
      if (!requiredSkills.includes(trimmed)) {
        setRequiredSkills(prev => [...prev, trimmed]);
      }
      setCustomSkill('');
    }
  };

  // Helper to suggest job title based on category & language
  const getSuggestedJobTitle = (catName: string, lang: typeof language): string => {
    const localizedCat = localizeContent(catName, lang);
    if (lang === 'ta') return `${localizedCat} ஆள் தேவைப்படுகிறது`;
    if (lang === 'hi') return `${localizedCat} सहायक की आवश्यकता है`;
    if (lang === 'te') return `${localizedCat} సహాయకుడు అవసరం`;
    return `${catName} Helper Needed`;
  };

  // Helper to suggest job description template
  const getSuggestedDescription = (catName: string, lang: typeof language): string => {
    const localizedCat = localizeContent(catName, lang);
    if (lang === 'ta') return `வேலூரில் ${localizedCat} பணிக்கான பகுதிநேர பணியாளர் தேவை. விருப்பமுள்ளவர்கள் தொடர்பு கொள்ளவும்.`;
    if (lang === 'hi') return `वेल्लोर में ${localizedCat} कार्य के लिए भाग-समय सहायक की आवश्यकता है।`;
    if (lang === 'te') return `వెల్లూరులో ${localizedCat} పని కొరకు పార్ట్-టైమ్ సహాయకుడు అవసరం.`;
    return `Looking for a reliable ${catName} helper in Vellore for local shift/task work.`;
  };

  // Helper to suggest default skills for category
  const getCategoryDefaultSkills = (catName: string): string[] => {
    const catLower = catName.toLowerCase();
    if (catLower.includes('delivery') || catLower.includes('rider')) return ['Delivery', 'Driving', 'Bike Rider', 'Tamil Speaking'];
    if (catLower.includes('store') || catLower.includes('billing')) return ['Store Helper', 'Cashier & Billing', 'Inventory', 'Tamil Speaking'];
    if (catLower.includes('electrical') || catLower.includes('electrician')) return ['Electrician Basics', 'Physically Active', 'Tamil Speaking'];
    if (catLower.includes('plumbing')) return ['Plumbing', 'Physically Active', 'Tamil Speaking'];
    if (catLower.includes('catering') || catLower.includes('cook')) return ['Cooking / Catering', 'Kitchen Helper', 'Food Serving'];
    if (catLower.includes('security')) return ['Security Guard', 'Physically Active', 'Tamil Speaking'];
    if (catLower.includes('cleaning') || catLower.includes('housekeeping')) return ['Cleaning & Housekeeping', 'Physically Active'];
    if (catLower.includes('tutoring')) return ['Tutoring', 'English Speaking', 'Tamil Speaking'];
    if (catLower.includes('data entry')) return ['Data Entry', 'Computer Basics', 'Tamil Speaking'];
    return ['Tamil Speaking', catName];
  };

  // Handle Category Selection & Auto-Fill
  const handleSelectCategory = (catName: string) => {
    setCategory(catName);
    
    // Auto fill Job Title
    const autoTitle = getSuggestedJobTitle(catName, language);
    setTitle(autoTitle);

    // Auto fill Description if empty
    if (!description.trim()) {
      const autoDesc = getSuggestedDescription(catName, language);
      setDescription(autoDesc);
    }

    // Auto select skills
    const defaultSkills = getCategoryDefaultSkills(catName);
    setRequiredSkills(defaultSkills);

    // Add category to skillsList if custom
    if (!skillsList.includes(catName)) {
      setSkillsList(prev => [catName, ...prev]);
    }
  };

  const addCustomCategory = () => {
    const trimmed = customCategory.trim();
    if (trimmed) {
      if (!categoriesList.includes(trimmed)) {
        setCategoriesList(prev => [...prev, trimmed]);
      }
      handleSelectCategory(trimmed);
      setCustomCategory('');
    }
  };

  const selectLandmarkPreset = (loc: typeof VELLORE_LOCATIONS[0]) => {
    setLatitude(loc.lat);
    setLongitude(loc.lng);
    setLandmarkArea(loc.name + ', ' + loc.area);
  };

  const handleMapCoordinateSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    const closest = getClosestLandmark(lat, lng);
    setLandmarkArea(closest);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      recruiter_id: recruiter.id,
      title: title.trim(),
      description: description.trim(),
      category,
      required_skills: requiredSkills,
      payout_amount: Number(payoutAmount),
      payout_unit: payoutUnit,
      latitude,
      longitude,
      landmark_area: landmarkArea || 'Vellore Central',
      status: 'OPEN',
      claimed_by: null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="glass-panel w-full max-w-2xl max-h-[92vh] rounded-3xl border border-slate-200 shadow-2xl bg-white overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-slate-900">
                {t.postModalTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.postModalSubtitle}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Job Title & Category */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.jobTitleLabel}</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.jobTitlePlaceholder}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.categoryLabel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoriesList.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                      category === cat
                        ? 'bg-sky-500 text-white font-bold shadow-xs border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {localizeContent(cat, language)}
                  </button>
                ))}
              </div>

              {/* Add Custom Category Input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Add custom category (e.g. Plumbing, Security, Catering)..."
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomCategory();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCustomCategory}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-bold border border-sky-200 flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Category</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">{t.descriptionLabel}</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Payout & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.payoutLabel}</label>
              <input
                type="number"
                min="50"
                step="10"
                required
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.payoutUnitLabel}</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['hour', 'task', 'shift'] as const).map((unit) => (
                  <button
                    type="button"
                    key={unit}
                    onClick={() => setPayoutUnit(unit)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      payoutUnit === unit
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {unit === 'hour' ? t.perHour : unit === 'task' ? t.perTask : t.perShift}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.requiredSkillsLabel}
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              {skillsList.map((skill) => {
                const isSelected = requiredSkills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-sky-500 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white font-black" />}
                    <span>{localizeContent(skill, language)}</span>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Skill */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder={t.addCustomSkillPlaceholder}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-sky-700 rounded-lg text-xs font-bold border border-slate-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.add}</span>
              </button>
            </div>
          </div>

          {/* Landmark & Map Coordinates */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t.landmarkAreaLabel}
                </label>
                <div className="text-xs text-sky-600 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{localizeContent(landmarkArea, language)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowMapPicker(!showMapPicker)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-sky-500" />
                <span>{showMapPicker ? t.close : 'Pin Map GPS'}</span>
              </button>
            </div>

            {/* Landmark Presets */}
            <div className="text-xs text-slate-500 pt-1 font-medium">{t.selectLandmark}:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-28 overflow-y-auto">
              {VELLORE_LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc.id}
                  onClick={() => selectLandmarkPreset(loc)}
                  className={`p-2 rounded-lg text-[11px] font-medium text-left transition-all border ${
                    landmarkArea.includes(loc.name)
                      ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <div className="truncate font-semibold">{localizeContent(loc.name, language)}</div>
                  <div className="text-[10px] text-slate-400 truncate">{localizeContent(loc.area, language)}</div>
                </button>
              ))}
            </div>

            {/* Embedded Interactive Map for Exact Pinning */}
            {showMapPicker && (
              <div className="mt-3 space-y-1.5">
                <p className="text-[11px] text-slate-500 italic">
                  {t.clickMapInstruction}
                </p>
                <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                  <VelloreMapView
                    user={recruiter}
                    jobs={[]}
                    radiusKm={5}
                    selectableLocation={true}
                    selectedCoordinates={{ lat: latitude, lng: longitude }}
                    onSelectCoordinates={handleMapCoordinateSelect}
                    quickLocations={VELLORE_LOCATIONS}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{t.publishJobBtn}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
