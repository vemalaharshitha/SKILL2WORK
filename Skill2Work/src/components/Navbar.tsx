import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  UserCircle, 
  Database, 
  Radio, 
  Sparkles,
  Bell,
  BarChart3,
  Languages,
  ChevronDown,
  LogOut,
  UserCheck,
  Wifi,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Role, User, Language } from '../types';
import type { ConnectionStatus } from '../services/syncService';

interface NavbarProps {
  currentRole: Role;
  onRoleChange?: (role: Role) => void;
  currentUser: User | null;
  unreadNotifsCount?: number;
  isOnline: boolean;
  onToggleOnline: () => void;
  onOpenProfile: () => void;
  onOpenSqlConsole: () => void;
  onOpenPostJob: () => void;
  onOpenNotifications: () => void;
  onOpenCommunityDemand: () => void;
  onOpenDeviceSync: () => void;
  syncStatus?: ConnectionStatus;
  connectedDevicesCount?: number;
  onLogout: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'ta', label: 'தமிழ்', nativeName: 'தமிழ் (Tamil)' },
  { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు', nativeName: 'తెలుగు (Telugu)' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentUser,
  unreadNotifsCount = 0,
  isOnline,
  onToggleOnline,
  onOpenProfile,
  onOpenSqlConsole,
  onOpenPostJob,
  onOpenNotifications,
  onOpenCommunityDemand,
  onOpenDeviceSync,
  syncStatus = 'connected',
  connectedDevicesCount = 1,
  onLogout
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Region */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-400 to-sky-200 shadow-md shadow-sky-500/15 p-[2px] transition-transform hover:scale-105">
              <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-0.5">
                <img 
                  src="/logo.png" 
                  alt="Skill2Work Logo" 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading text-lg sm:text-2xl font-black tracking-tight text-slate-900 flex items-center">
                  <span>Skill</span>
                  <span className="text-sky-500 font-extrabold mx-0.5">2</span>
                  <span>Work</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  {t.regionTag}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden md:flex items-center gap-1.5 font-medium">
                <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px]">{t.footerTagline}</span>
                <span>•</span>
                <span>Vellore</span>
              </p>
            </div>
          </div>

          {/* Center: Dedicated Role Badge (Strict Seeker / Recruiter separation) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
            {currentRole === 'seeker' ? (
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-sky-700">
                <div className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span>{t.roleSeeker} Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-700">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span>{t.roleRecruiter} Portal</span>
              </div>
            )}
          </div>

          {/* Right: Actions (Language, Multi-Device Sync, Network, Notifications, SQLite, Profile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Multi-Device Live Sync Hub Indicator Button */}
            <button
              onClick={onOpenDeviceSync}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 hover:from-emerald-500/20 hover:via-teal-500/20 hover:to-indigo-500/20 text-emerald-800 border border-emerald-300/80 shadow-xs flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
              title={`Multi-Device Real-Time Sync Hub (${syncStatus} • ${connectedDevicesCount} active)`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Live Sync</span>
              <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {connectedDevicesCount}
              </span>
            </button>

            {/* 4-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-xs"
                title="Change Language (English, தமிழ், हिन्दी, తెలుగు)"
              >
                <Languages className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-slate-900 font-extrabold">{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 animate-fadeIn">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Select Language
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

            {/* Network Online / Offline Interactive Toggle Switch */}
            <button 
              type="button"
              onClick={onToggleOnline}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isOnline 
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-amber-500/20'
              }`}
              title={isOnline ? "Online Mode (Click to switch to Offline SMS Mode)" : "Offline SMS Mode Active (Click to switch to Online Mode)"}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-white'}`} />
              <Wifi className="w-3.5 h-3.5" />
              <span>{isOnline ? 'Online' : 'Offline SMS'}</span>
            </button>

            {/* Community Skill Trends Analytics Trigger */}
            <button
              onClick={onOpenCommunityDemand}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1"
              title={t.demandModalTitle}
            >
              <BarChart3 className="w-4 h-4 text-sky-600" />
              <span className="hidden xl:inline">{t.trends}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all"
              title={t.notificationsTitle}
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* SQLite Terminal Inspector Button */}
            <button
              onClick={onOpenSqlConsole}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shadow-xs group"
              title="Inspect SQLite WASM database"
            >
              <Database className="w-3.5 h-3.5 text-sky-500 group-hover:rotate-12 transition-transform" />
              <span className="hidden xl:inline">{t.sqlTerminal}</span>
            </button>

            {/* Recruiter Post Job quick button */}
            {currentRole === 'recruiter' && (
              <button
                onClick={onOpenPostJob}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.postNewGigBtn}</span>
                <span className="sm:hidden">+</span>
              </button>
            )}

            {/* User Profile & Account Dropdown Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-all shadow-xs"
              >
                <UserCircle className="w-4 h-4 text-sky-500" />
                <span className="hidden md:inline font-bold">{currentUser?.name?.split(' ')[0] || t.profileBtn}</span>
                <ChevronDown className="w-3 h-3 text-sky-500" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Vellore User'}</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentUser?.phone}</p>
                    <span className={`inline-block mt-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      currentUser?.role === 'seeker' ? 'bg-sky-100 text-sky-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {currentUser?.role === 'seeker' ? 'Job Seeker' : 'Recruiter'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <UserCheck className="w-4 h-4 text-sky-500" />
                    <span>View / Edit Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left mt-1 border-t border-slate-100 pt-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out / Switch Account</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
