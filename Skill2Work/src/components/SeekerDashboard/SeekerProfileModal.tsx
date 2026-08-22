import React, { useState } from 'react';
import { 
  X, 
  UserCircle, 
  MapPin, 
  Navigation, 
  Check, 
  Plus, 
  Save
} from 'lucide-react';
import type { User, TimeSlot } from '../../types';
import { ALL_SKILL_OPTIONS, TIME_SLOT_OPTIONS, localizeContent } from '../../i18n/translations';
import { VELLORE_LOCATIONS, getClosestLandmark } from '../../services/geoService';
import { useLanguage } from '../../i18n/LanguageContext';

interface SeekerProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const SeekerProfileModal: React.FC<SeekerProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave
}) => {
  const { t, language } = useLanguage();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [phone, setPhone] = useState(user.phone);
  const [skillsList, setSkillsList] = useState<string[]>(() => {
    const combined = [...ALL_SKILL_OPTIONS];
    (user.skills || []).forEach(s => {
      if (!combined.includes(s)) combined.push(s);
    });
    return combined;
  });
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [freeTimeSlots, setFreeTimeSlots] = useState<TimeSlot[]>(user.free_time_slots || []);
  const [latitude, setLatitude] = useState(user.latitude);
  const [longitude, setLongitude] = useState(user.longitude);
  const [customSkill, setCustomSkill] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

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

  const toggleTimeSlot = (slot: TimeSlot) => {
    if (freeTimeSlots.includes(slot)) {
      setFreeTimeSlots(freeTimeSlots.filter(s => s !== slot));
    } else {
      setFreeTimeSlots([...freeTimeSlots, slot]);
    }
  };

  const setLocationByLandmark = (loc: typeof VELLORE_LOCATIONS[0]) => {
    setLatitude(loc.lat);
    setLongitude(loc.lng);
  };

  const fetchLiveGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setIsLocating(false);
      },
      (err) => {
        console.warn('GPS Error or simulated fallback:', err);
        setLatitude(12.9692);
        setLongitude(79.1559);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      name,
      age: Number(age),
      phone,
      skills,
      free_time_slots: freeTimeSlots,
      latitude,
      longitude
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="glass-panel w-full max-w-xl max-h-[90vh] rounded-3xl border border-slate-200 shadow-2xl bg-white overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-slate-900">
                {t.profileTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.profileDesc}
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

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.fullName}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{t.age}</label>
              <input
                type="number"
                min="16"
                max="80"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">{t.phoneNumber}</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500"
              placeholder="+91 98401 23456"
            />
          </div>

          {/* Skills Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t.mySkills}
              </label>
              <span className="text-[11px] text-sky-600 font-semibold">{skills.length} {t.skillsSelected}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              {skillsList.map((skill) => {
                const isSelected = skills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-sky-500 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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

          {/* Free-Time Availability Slots */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.myAvailability}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOT_OPTIONS.map((slot) => {
                const isSelected = freeTimeSlots.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => toggleTimeSlot(slot)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{localizeContent(slot, language)}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location / Landmark GPS Selector */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t.myLocation}
                </label>
                <div className="text-xs text-sky-600 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{localizeContent(getClosestLandmark(latitude, longitude), language)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchLiveGPS}
                disabled={isLocating}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? t.locating : t.useCurrentGps}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 pt-1 font-medium">
              {t.selectLandmark}:
            </div>

            {/* Vellore Landmark Quick Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-32 overflow-y-auto">
              {VELLORE_LOCATIONS.map((loc) => {
                const isSelected = Math.abs(loc.lat - latitude) < 0.001 && Math.abs(loc.lng - longitude) < 0.001;
                return (
                  <button
                    type="button"
                    key={loc.id}
                    onClick={() => setLocationByLandmark(loc)}
                    className={`p-2 rounded-lg text-[11px] font-medium text-left transition-all border ${
                      isSelected
                        ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                    }`}
                  >
                    <div className="truncate font-semibold">{localizeContent(loc.name, language)}</div>
                    <div className="text-[10px] text-slate-400 truncate">{localizeContent(loc.area, language)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveProfileBtn}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
