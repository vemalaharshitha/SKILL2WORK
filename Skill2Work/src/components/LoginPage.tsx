import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  BriefcaseBusiness, 
  Eye, 
  EyeOff, 
  LockKeyhole, 
  MapPin, 
  Radio, 
  UserRound,
  Languages,
  ChevronDown,
  Sparkles,
  Phone,
  Navigation,
  Plus,
  UserPlus,
  LogIn,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Role, Language, User, TimeSlot } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { VELLORE_LOCATIONS } from '../services/geoService';
import { ALL_SKILL_OPTIONS, TIME_SLOT_OPTIONS, localizeContent } from '../i18n/translations';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onCreateAccount: (userData: Omit<User, 'id' | 'created_at'>) => User;
  users: User[];
}

const LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'ta', label: 'தமிழ்', nativeName: 'தமிழ் (Tamil)' },
  { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు', nativeName: 'తెలుగు (Telugu)' }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onCreateAccount, users }) => {
  const { language, setLanguage, t } = useLanguage();
  
  // Auth Mode: 'signin' or 'signup'
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<Role>('seeker');

  // Common Form Fields
  const [showPassword, setShowPassword] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup Form Fields
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(22);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('vit_vellore');
  const [latitude, setLatitude] = useState<number>(12.9692);
  const [longitude, setLongitude] = useState<number>(79.1559);
  const [skillsList, setSkillsList] = useState<string[]>(ALL_SKILL_OPTIONS);
  const [skills, setSkills] = useState<string[]>(['Driving', 'Delivery', 'Tamil Speaking']);
  const [customSkill, setCustomSkill] = useState('');
  const [freeTimeSlots, setFreeTimeSlots] = useState<TimeSlot[]>(['Evening', 'Weekend', 'Immediate']);
  const [isLocating, setIsLocating] = useState(false);

  // Dropdown UI
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  // Quick Select Location
  const handleLocationChange = (locId: string) => {
    setSelectedLocationId(locId);
    const loc = VELLORE_LOCATIONS.find(l => l.id === locId);
    if (loc) {
      setLatitude(loc.lat);
      setLongitude(loc.lng);
    }
  };

  // Fetch GPS
  const handleFetchGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  // Toggle Skill
  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed) {
      if (!skillsList.includes(trimmed)) {
        setSkillsList(prev => [trimmed, ...prev]);
      }
      if (!skills.includes(trimmed)) {
        setSkills(prev => [...prev, trimmed]);
      }
      setCustomSkill('');
    }
  };

  // Toggle Time Slot
  const toggleTimeSlot = (slot: TimeSlot) => {
    if (freeTimeSlots.includes(slot)) {
      setFreeTimeSlots(freeTimeSlots.filter(s => s !== slot));
    } else {
      setFreeTimeSlots([...freeTimeSlots, slot]);
    }
  };

  // Handle Form Submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === 'signup') {
      if (!name.trim()) {
        alert('Please enter your name or business name.');
        return;
      }
      if (!phoneOrEmail.trim()) {
        alert('Please enter your mobile phone number.');
        return;
      }

      // Collect active skills including any pending custom skill text
      let finalSkills = [...skills];
      if (customSkill.trim()) {
        const trimmed = customSkill.trim();
        if (!finalSkills.includes(trimmed)) {
          finalSkills.push(trimmed);
        }
      }

      // Create new user in SQLite Database
      const newUser = onCreateAccount({
        role,
        name: name.trim(),
        age: role === 'seeker' ? Number(age) : 30,
        phone: phoneOrEmail.trim(),
        skills: role === 'seeker' ? finalSkills : ['Recruiter'],
        free_time_slots: role === 'seeker' ? freeTimeSlots : ['Morning', 'Evening'],
        preferred_language: language,
        latitude,
        longitude
      });

      // Confetti Effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }

      onLogin(newUser);
    } else {
      // Sign In mode
      const cleanInput = phoneOrEmail.trim().toLowerCase();
      
      // Try to find matching user in DB
      let matchedUser = users.find(u => 
        u.phone.replace(/\s+/g, '').includes(cleanInput.replace(/\s+/g, '')) ||
        u.id.toLowerCase() === cleanInput ||
        u.name.toLowerCase().includes(cleanInput)
      );

      if (!matchedUser) {
        // Fallback to role-based default user if no exact match found
        matchedUser = users.find(u => u.role === role) || users[0];
      }

      onLogin(matchedUser);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,.12),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(56,189,248,.08),transparent_28%)]" />
      <div className="absolute w-96 h-96 rounded-full border border-sky-500/10 -top-36 -left-24" />
      <div className="absolute w-80 h-80 rounded-full border border-slate-200 -bottom-28 -right-16" />

      {/* Language Selector in top right corner of login screen */}
      <div className="absolute top-4 right-4 z-20" ref={langDropdownRef}>
        <button
          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white/90 hover:bg-white text-slate-800 border border-slate-200 rounded-2xl text-xs font-bold transition-all shadow-sm backdrop-blur-md"
        >
          <Languages className="w-4 h-4 text-sky-600" />
          <span>{currentLangObj.nativeName}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {isLangDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 animate-fadeIn">
            <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
              Language / மொழி / भाषा / భాష
            </div>
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  setLanguage(opt.code);
                  setIsLangDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
                  language === opt.code
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{opt.nativeName}</span>
                {language === opt.code && (
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="relative z-10 w-full max-w-5xl grid lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 backdrop-blur-xl">
        
        {/* Left Hero Brand Panel (5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 bg-gradient-to-br from-sky-50/80 via-sky-100/30 to-white border-r border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Skill2Work" className="w-12 h-12 rounded-2xl bg-white p-1.5 object-contain border border-slate-200 shadow-sm" />
              <span className="font-heading text-2xl font-black text-slate-900">Skill<span className="text-sky-500">2</span>Work</span>
            </div>
            <div className="mt-10">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full w-fit">
                <MapPin className="w-4 h-4 text-sky-600" />
                {t.regionTag}
              </p>
              <h1 className="font-heading text-3xl leading-tight font-bold mt-4 text-slate-900">
                {t.loginHeroTitle1}<br />
                {t.loginHeroTitle2}<br />
                <span className="text-sky-600">{t.loginHeroTitleHighlight}</span>
              </h1>
              <p className="mt-4 max-w-sm text-slate-600 leading-relaxed text-xs sm:text-sm">
                {t.loginHeroDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-between overflow-y-auto max-h-[90vh]">
          <div>
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6 font-heading text-2xl font-black text-slate-900">
              <img src="/logo.png" alt="" className="w-10 h-10 object-contain" />
              Skill<span className="text-sky-500">2</span>Work
            </div>

            {/* Mode Switcher Tabs: Sign In vs Create Account */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'signin'
                    ? 'bg-white text-sky-600 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.tabSignIn}</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.tabCreateAccount}</span>
              </button>
            </div>

            <p className="text-sky-600 text-xs font-bold tracking-wider uppercase">
              {mode === 'signin' ? t.loginWelcome : t.newUserRegistration}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-1 text-slate-900">
              {mode === 'signin' ? t.loginHeading : t.joinSkill2Work}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {mode === 'signin' 
                ? t.loginSubtitle 
                : t.createAccountSubtitle}
            </p>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setRole('seeker')} 
                className={`rounded-2xl border p-3 text-left transition ${
                  role === 'seeker' 
                    ? 'border-sky-500 bg-sky-50/80 text-slate-900 shadow-xs ring-2 ring-sky-500/20' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Radio className={`w-5 h-5 mb-1.5 ${role === 'seeker' ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="block text-xs sm:text-sm font-bold text-slate-900">{t.roleSeeker}</span>
                <span className="text-[11px] text-slate-500">{t.loginSeekerDesc}</span>
              </button>

              <button 
                type="button" 
                onClick={() => setRole('recruiter')} 
                className={`rounded-2xl border p-3 text-left transition ${
                  role === 'recruiter' 
                    ? 'border-sky-500 bg-sky-50/80 text-slate-900 shadow-xs ring-2 ring-sky-500/20' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <BriefcaseBusiness className={`w-5 h-5 mb-1.5 ${role === 'recruiter' ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="block text-xs sm:text-sm font-bold text-slate-900">{t.roleRecruiter}</span>
                <span className="text-[11px] text-slate-500">{t.loginRecruiterDesc}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* Full Name / Company Name (Signup only) */}
              {mode === 'signup' && (
                <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                  {role === 'seeker' ? t.fullNameLabel : t.companyNameLabel} *
                  <div className="relative mt-1.5">
                    <UserRound className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      value={name} 
                      onChange={event => setName(event.target.value)} 
                      required 
                      placeholder={role === 'seeker' ? t.fullNamePlaceholder : t.companyNamePlaceholder} 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20" 
                    />
                  </div>
                </label>
              )}

              {/* Phone / Mobile Number */}
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                {mode === 'signup' ? `${t.mobilePhoneLabel} *` : t.loginEmailLabel}
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    value={phoneOrEmail} 
                    onChange={event => setPhoneOrEmail(event.target.value)} 
                    required 
                    placeholder={mode === 'signup' ? t.mobilePhonePlaceholder : t.loginEmailPlaceholder} 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20" 
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                {t.loginPasswordLabel}
                <div className="relative mt-1.5">
                  <LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    value={password} 
                    onChange={event => setPassword(event.target.value)} 
                    required 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder={t.loginPasswordPlaceholder} 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </label>

              {/* Additional Signup Fields */}
              {mode === 'signup' && (
                <>
                  {/* Age (Seekers only) */}
                  {role === 'seeker' && (
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                      {t.ageLabel}
                      <input 
                        type="number"
                        min="16"
                        max="80"
                        value={age} 
                        onChange={e => setAge(Number(e.target.value))} 
                        required 
                        className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20" 
                      />
                    </label>
                  )}

                  {/* Preferred Vellore Location */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-700">
                        {t.selectVelloreLocation}
                      </label>
                      <button
                        type="button"
                        onClick={handleFetchGps}
                        disabled={isLocating}
                        className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{isLocating ? t.locating : t.useGpsBtn}</span>
                      </button>
                    </div>

                    <select
                      value={selectedLocationId}
                      onChange={e => handleLocationChange(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                    >
                      {VELLORE_LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>
                          {localizeContent(loc.name, language)} ({localizeContent(loc.area, language)})
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {t.coordinates}: {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
                    </p>
                  </div>

                  {/* Skills Selection (Seekers only) */}
                  {role === 'seeker' && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                        {t.skillsOffered} ({skills.length} {t.skillsSelected})
                      </label>
                      
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                        {skillsList.map(skill => {
                          const isSelected = skills.includes(skill);
                          const localizedSkill = localizeContent(skill, language);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-sky-500 text-white font-bold shadow-xs'
                                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              <span>{localizedSkill}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Skill Adder */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <input
                          type="text"
                          placeholder={t.addCustomSkillPlaceholder}
                          value={customSkill}
                          onChange={e => setCustomSkill(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCustomSkill();
                            }
                          }}
                          className="flex-1 rounded-xl border border-slate-200 bg-white py-1.5 px-3 text-xs outline-none focus:border-sky-500"
                        />
                        <button
                          type="button"
                          onClick={addCustomSkill}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Time Slots (Seekers only) */}
                  {role === 'seeker' && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                        {t.availableTimeSlots}
                      </label>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {TIME_SLOT_OPTIONS.map(slot => {
                          const isSelected = freeTimeSlots.includes(slot as TimeSlot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => toggleTimeSlot(slot as TimeSlot)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                isSelected
                                  ? 'bg-sky-500 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {localizeContent(slot, language)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Remember me & Forgot Password (Signin only) */}
              {mode === 'signin' && (
                <div className="flex justify-between text-xs items-center">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input type="checkbox" className="accent-sky-500 rounded" defaultChecked />
                    <span>{t.loginRememberMe}</span>
                  </label>
                  <button type="button" className="text-sky-600 hover:text-sky-700 font-medium">
                    {t.loginForgotPassword}
                  </button>
                </div>
              )}

              {/* Action Submit Button */}
              <button 
                type="submit" 
                className="w-full rounded-xl py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg shadow-sky-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {mode === 'signup'
                    ? (role === 'seeker' ? t.createSeekerAccountBtn : t.createRecruiterAccountBtn)
                    : (role === 'seeker' ? t.loginSignInSeeker : t.loginSignInRecruiter)}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Registered SQLite Accounts Picker (All Modes) */}
            {users.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  {t.orSignInRegistered} ({users.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => onLogin(u)}
                      className={`text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        u.role === 'seeker'
                          ? 'bg-sky-50/50 hover:bg-sky-50 border-sky-200/80 text-sky-900'
                          : 'bg-indigo-50/50 hover:bg-indigo-50 border-indigo-200/80 text-indigo-900'
                      }`}
                    >
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${u.role === 'seeker' ? 'bg-sky-500' : 'bg-indigo-500'}`}></span>
                          <span className="text-xs font-bold truncate">{u.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">{u.phone}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        u.role === 'seeker' ? 'bg-sky-100 text-sky-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {u.role === 'seeker' ? t.roleSeeker : t.roleRecruiter}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Sign In / Sign Up Link */}
            <p className="mt-6 text-center text-xs text-slate-500">
              {mode === 'signin' ? t.loginNewPrompt : t.alreadyRegisteredPrompt} {' '}
              <button 
                type="button" 
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="font-bold text-sky-600 hover:text-sky-700 underline"
              >
                {mode === 'signin' ? t.loginCreateAccount : t.signInNowBtn}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
