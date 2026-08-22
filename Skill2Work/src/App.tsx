import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { 
  Role, 
  User, 
  Job,
  NotificationItem,
  SkillDemandStat
} from './types';
import { sqliteManager } from './db/sqliteManager';
import { syncService, type ConnectionStatus } from './services/syncService';
import { enrichJobsForSeeker } from './services/matchingService';
import { VELLORE_LOCATIONS } from './services/geoService';
import { useLanguage } from './i18n/LanguageContext';
import { localizeContent } from './i18n/translations';
import { triggerOfflineSms } from './utils/smsHelper';

// Components
import { Navbar } from './components/Navbar';
import { RadiusFilter } from './components/SeekerDashboard/RadiusFilter';
import { JobList } from './components/SeekerDashboard/JobList';
import { JobDetailsModal } from './components/SeekerDashboard/JobDetailsModal';
import { SeekerProfileModal } from './components/SeekerDashboard/SeekerProfileModal';
import { MyClaimedJobs } from './components/SeekerDashboard/MyClaimedJobs';
import { SkillGapRecommendations } from './components/SeekerDashboard/SkillGapRecommendations';
import { PostJobModal } from './components/RecruiterDashboard/PostJobModal';
import { RecruiterJobList } from './components/RecruiterDashboard/RecruiterJobList';
import { VelloreMapView } from './components/MapView/VelloreMapView';
import { SqliteConsoleModal } from './components/SqliteConsoleModal';
import { LoginPage } from './components/LoginPage';
import { NotificationsModal } from './components/NotificationsModal';
import { FeedbackRatingModal } from './components/FeedbackRatingModal';
import { CommunityDemandModal } from './components/CommunityDemandModal';
import { DeviceSyncModal } from './components/DeviceSyncModal';
import { LiveGigAlert } from './components/LiveGigAlert';

// Icons
import { 
  Radio, 
  List, 
  Map as MapIcon, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  BarChart3
} from 'lucide-react';

export const App: React.FC = () => {
  const { t, language } = useLanguage();

  // App State
  const [isDbReady, setIsDbReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('skill2work_active_user_id'));
  });
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [currentRole, setCurrentRole] = useState<Role>('seeker');
  const [users, setUsers] = useState<User[]>([]);
  const [rawJobs, setRawJobs] = useState<Job[]>([]);
  
  // Active Logged-in User ID
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    return localStorage.getItem('skill2work_active_user_id');
  });

  // Filters & Views
  const [radiusKm, setRadiusKm] = useState<number>(3);
  const [seekerActiveTab, setSeekerActiveTab] = useState<'all' | 'my-gigs'>('all');
  const [viewMode, setViewMode] = useState<'both' | 'list' | 'map'>('both');

  // Active user object derived from SQLite DB users
  const currentUser = useMemo(() => {
    if (currentUserId) {
      const found = users.find(u => u.id === currentUserId) || sqliteManager.getUserById(currentUserId);
      if (found) return found;
    }
    return null;
  }, [users, currentUserId]);

  const effectiveRole: Role = currentUser?.role || currentRole;

  const currentSeeker = useMemo<User>(() => {
    if (currentUser?.role === 'seeker') return currentUser;
    const found = users.find(u => u.role === 'seeker');
    if (found) return found;
    return currentUser || users[0];
  }, [users, currentUser]);

  const currentRecruiter = useMemo<User>(() => {
    if (currentUser?.role === 'recruiter') return currentUser;
    const found = users.find(u => u.role === 'recruiter');
    if (found) return found;
    return currentUser || users[0];
  }, [users, currentUser]);

  // Modals & New Features
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isSqlConsoleOpen, setIsSqlConsoleOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCommunityDemandOpen, setIsCommunityDemandOpen] = useState(false);
  const [isDeviceSyncOpen, setIsDeviceSyncOpen] = useState(false);
  const [liveAlertJob, setLiveAlertJob] = useState<Job | null>(null);
  const [syncStatus, setSyncStatus] = useState<ConnectionStatus>(syncService.getConnectionStatus());
  const [connectedDevicesCount, setConnectedDevicesCount] = useState<number>(syncService.getConnectedDevicesCount());
  const [jobForReview, setJobForReview] = useState<Job | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [skillDemandStats, setSkillDemandStats] = useState<SkillDemandStat[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Reload data from SQLite
  const reloadData = useCallback(() => {
    const fetchedUsers = sqliteManager.getUsers();
    const fetchedJobs = sqliteManager.getJobs();
    const fetchedTrends = sqliteManager.getCommunitySkillTrends();
    setUsers(fetchedUsers);
    setRawJobs(fetchedJobs);
    setSkillDemandStats(fetchedTrends);
  }, []);

  // Init DB and Subscribe
  useEffect(() => {
    sqliteManager.whenReady().then(() => {
      reloadData();
      setIsDbReady(true);
    });

    const unsubscribe = sqliteManager.subscribe(() => {
      reloadData();
    });

    return () => unsubscribe();
  }, [reloadData]);

  // Subscribe to Real-Time Device Sync status & remote gig announcements
  useEffect(() => {
    const unsubStatus = syncService.subscribeStatus((newStatus, count) => {
      setSyncStatus(newStatus);
      setConnectedDevicesCount(count);
    });

    const unsubSync = syncService.subscribe((msg) => {
      if (msg.type === 'JOB_CREATED' && msg.data) {
        setLiveAlertJob(msg.data);
        showToast(`⚡ Real-Time Alert: New Gig "${msg.data.title}" posted!`);
      }
    });

    return () => {
      unsubStatus();
      unsubSync();
    };
  }, [showToast]);

  // Fetch notifications for current user
  useEffect(() => {
    if (currentUser) {
      setNotifications(sqliteManager.getNotifications(currentUser.id));
    }
  }, [currentUser, users, rawJobs]);

  useEffect(() => {
    const updateConnection = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  const unreadNotifsCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  // Compute enriched jobs for seeker (distance + match score)
  const enrichedJobs = useMemo(() => {
    if (!currentSeeker) return rawJobs;
    return enrichJobsForSeeker(rawJobs, currentSeeker);
  }, [rawJobs, currentSeeker]);

  // Jobs within selected radius
  const jobsWithinRadius = useMemo(() => {
    return enrichedJobs.filter(j => {
      if (j.distanceKm === undefined) return true;
      return j.distanceKm <= radiusKm;
    });
  }, [enrichedJobs, radiusKm]);

  // Actions
  const handleClaimJob = (jobId: string) => {
    if (!currentSeeker) return;
    try {
      sqliteManager.claimJob(jobId, currentSeeker.id);
      
      const targetJob = rawJobs.find(j => j.id === jobId) || enrichedJobs.find(j => j.id === jobId);
      const recruiter = targetJob ? sqliteManager.getUserById(targetJob.recruiter_id) : null;
      const recruiterName = recruiter?.name || targetJob?.recruiter_name || 'Recruiter';
      const recruiterPhone = recruiter?.phone || targetJob?.recruiter_phone || '';

      // 1. Add notification for seeker with exact recruiter profile info
      sqliteManager.addNotification({
        user_id: currentSeeker.id,
        title: '🎉 Gig Claimed Successfully!',
        message: `You claimed "${targetJob?.title || 'Gig'}". Recruiter ${recruiterName} (${recruiterPhone}) has received your profile details (${currentSeeker.phone}).`,
        type: 'claim',
        is_read: false,
        linkJobId: jobId
      });

      // 2. Add notification / message for Recruiter's user inbox
      if (targetJob) {
        sqliteManager.addNotification({
          user_id: targetJob.recruiter_id,
          title: `📩 New Applicant! ${currentSeeker.name} claimed "${targetJob.title}"`,
          message: `Applicant: ${currentSeeker.name} | Phone: ${currentSeeker.phone} | Age: ${currentSeeker.age} | Skills: ${(currentSeeker.skills || []).join(', ') || 'General'}. Click to call, WhatsApp, or Offline SMS them directly!`,
          type: 'claim',
          is_read: false,
          linkJobId: jobId
        });
      }

      showToast(t.toastClaimSuccess);

      // In Offline Mode, automatically trigger native cellular SMS to Recruiter's phone number
      if (!isOnline && recruiterPhone) {
        const cleanRecruiterPhone = recruiterPhone.replace(/[^0-9+]/g, '');
        const smsMsg = `Hi ${recruiterName}, I have claimed your gig "${targetJob?.title || 'Gig'}" on Skill2Work. My Name: ${currentSeeker.name}, Phone: ${currentSeeker.phone}. Please contact me!`;
        triggerOfflineSms(cleanRecruiterPhone, smsMsg, showToast);
      }
      if (selectedJob && selectedJob.id === jobId) {
        setSelectedJob(prev => prev ? { 
          ...prev, 
          status: 'CLAIMED', 
          claimed_by: currentSeeker.id,
          claimed_by_name: currentSeeker.name,
          claimed_by_phone: currentSeeker.phone
        } : null);
      }
    } catch (err: any) {
      alert('Error claiming job: ' + err.message);
    }
  };

  const handleUpdateJobStatus = (jobId: string, status: 'OPEN' | 'CLAIMED' | 'COMPLETED') => {
    try {
      sqliteManager.updateJobStatus(jobId, status);
      const statusLabel = status === 'OPEN' ? t.statusOpen : status === 'CLAIMED' ? t.statusClaimed : t.statusCompleted;
      showToast(`${t.toastStatusUpdated} ${statusLabel}`);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      try {
        sqliteManager.deleteJob(jobId);
        showToast(t.toastJobDeleted);
      } catch (err: any) {
        alert('Error deleting job: ' + err.message);
      }
    }
  };

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'created_at'>) => {
    try {
      const newJobId = sqliteManager.createJob(jobData);
      
      // Send broadcast notification
      sqliteManager.addNotification({
        user_id: 'all',
        title: `🔥 New Gig Posted in ${jobData.landmark_area}!`,
        message: `${jobData.title} is now open for applicants (₹${jobData.payout_amount}/${jobData.payout_unit}).`,
        type: 'job_alert',
        is_read: false,
        linkJobId: newJobId
      });

      showToast(t.toastJobPosted);
    } catch (err: any) {
      alert('Error posting job: ' + err.message);
    }
  };

  const handleSaveProfile = (updatedUser: User) => {
    try {
      sqliteManager.upsertUser(updatedUser);
      showToast(t.toastProfileUpdated);
    } catch (err: any) {
      alert('Error saving profile: ' + err.message);
    }
  };

  const handleAddSkillToProfile = (skill: string) => {
    if (!currentSeeker) return;
    const currentSkills = currentSeeker.skills || [];
    if (!currentSkills.includes(skill)) {
      const updatedUser: User = {
        ...currentSeeker,
        skills: [...currentSkills, skill]
      };
      handleSaveProfile(updatedUser);
      const localizedSkill = localizeContent(skill, language);
      showToast(`✨ "${localizedSkill}" ${t.toastSkillAdded}`);
    }
  };

  const handleSubmitReview = (reviewData: {
    job_id: string;
    job_title: string;
    from_user_id: string;
    from_user_name: string;
    to_user_id: string;
    rating: number;
    tags: string[];
    comment: string;
  }) => {
    try {
      sqliteManager.addReview(reviewData);
      showToast(t.toastReviewSaved);
      setJobForReview(null);
    } catch (err: any) {
      alert('Error saving review: ' + err.message);
    }
  };

  const handleRegisterUser = useCallback((userData: Omit<User, 'id' | 'created_at'>): User => {
    const newUser = sqliteManager.createUser(userData);
    reloadData();
    setCurrentUserId(newUser.id);
    setCurrentRole(newUser.role);
    setIsAuthenticated(true);
    localStorage.setItem('skill2work_active_user_id', newUser.id);
    showToast(`🎉 Account created for ${newUser.name}! Saved to SQLite DB.`);
    return newUser;
  }, [reloadData, showToast]);

  const handleLoginUser = useCallback((user: User) => {
    reloadData();
    setCurrentUserId(user.id);
    setCurrentRole(user.role);
    setIsAuthenticated(true);
    localStorage.setItem('skill2work_active_user_id', user.id);
    showToast(`👋 Welcome back, ${user.name}!`);
  }, [reloadData, showToast]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
    localStorage.removeItem('skill2work_active_user_id');
    showToast('Signed out successfully.');
  }, [showToast]);

  if (!isDbReady) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-slate-900 space-y-4 p-4">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200 p-2 shadow-xl shadow-sky-500/10 animate-pulse">
          <img src="/logo.png" alt="Skill2Work Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="font-heading text-xl font-bold flex items-center gap-1 text-slate-900">
          <span>Skill</span><span className="text-sky-500">2</span><span>Work</span>
        </h2>
        <p className="text-xs text-sky-600 font-bold tracking-wider uppercase">{t.footerTagline}</p>
        <p className="text-[11px] text-slate-500">Loading Vellore SQLite Local Database & 3km Radar Engine...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLoginUser}
        onCreateAccount={handleRegisterUser}
        users={users}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {!isOnline && (
        <div className="sticky top-0 z-[60] w-full bg-sky-500 px-4 py-2 text-center text-xs font-bold text-white shadow-sm">
          {t.offlineAlert}
        </div>
      )}
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-900/20 border border-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentRole={effectiveRole}
        onRoleChange={setCurrentRole}
        currentUser={currentUser}
        unreadNotifsCount={unreadNotifsCount}
        isOnline={isOnline}
        onToggleOnline={() => {
          setIsOnline(prev => {
            const nextState = !prev;
            showToast(nextState ? '⚡ Online Mode Active' : '📶 Offline SMS Mode Active — All messages route to native SMS app');
            return nextState;
          });
        }}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenSqlConsole={() => setIsSqlConsoleOpen(true)}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenCommunityDemand={() => setIsCommunityDemandOpen(true)}
        onOpenDeviceSync={() => setIsDeviceSyncOpen(true)}
        syncStatus={syncStatus}
        connectedDevicesCount={connectedDevicesCount}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ===================== SEEKER PORTAL ===================== */}
        {effectiveRole === 'seeker' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Navigation Tabs & View Toggles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Tabs: Find Gigs vs My Claimed Gigs */}
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
                <button
                  onClick={() => setSeekerActiveTab('all')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    seekerActiveTab === 'all'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>{t.allGigsTab}</span>
                </button>

                <button
                  onClick={() => setSeekerActiveTab('my-gigs')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    seekerActiveTab === 'my-gigs'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.myGigsTab}</span>
                </button>
              </div>

              {/* View Mode (List vs Map vs Both on Desktop) */}
              {seekerActiveTab === 'all' && (
                <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold self-end sm:self-auto">
                  <button
                    onClick={() => setViewMode('both')}
                    className={`hidden lg:block px-3 py-1.5 rounded-lg transition-colors ${
                      viewMode === 'both' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.splitView}
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                      viewMode === 'list' ? 'bg-sky-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>{t.listViewTab}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                      viewMode === 'map' ? 'bg-sky-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>{t.mapViewTab}</span>
                  </button>
                </div>
              )}

            </div>

            {/* Tab: All Gigs */}
            {seekerActiveTab === 'all' && (
              <>
                {/* AI Skill Gap & Career Recommendations */}
                <SkillGapRecommendations
                  currentUser={currentSeeker}
                  jobs={rawJobs}
                  language={language}
                  onAddSkill={handleAddSkillToProfile}
                  onOpenProfile={() => setIsProfileModalOpen(true)}
                />

                {/* 3km Radius Radar Controller */}
                <RadiusFilter
                  radiusKm={radiusKm}
                  onRadiusChange={setRadiusKm}
                  currentUser={currentSeeker}
                  onOpenProfile={() => setIsProfileModalOpen(true)}
                  matchedCount={jobsWithinRadius.length}
                />

                {/* Content based on View Mode */}
                {viewMode === 'both' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Cards List (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <JobList
                        jobs={enrichedJobs}
                        currentUser={currentSeeker}
                        onClaimJob={handleClaimJob}
                        onViewDetails={(job) => setSelectedJob(job)}
                        radiusKm={radiusKm}
                      />
                    </div>

                    {/* Right: Sticky Map (5 cols) */}
                    <div className="lg:col-span-5 h-[620px] sticky top-24">
                      <VelloreMapView
                        user={currentSeeker}
                        jobs={jobsWithinRadius}
                        radiusKm={radiusKm}
                        selectedJobId={selectedJob?.id}
                        onSelectJob={(job) => setSelectedJob(job)}
                        onClaimJob={handleClaimJob}
                        quickLocations={VELLORE_LOCATIONS}
                        onSelectCoordinates={(lat, lng) => {
                          handleSaveProfile({ ...currentSeeker, latitude: lat, longitude: lng });
                        }}
                      />
                    </div>
                  </div>
                ) : viewMode === 'list' ? (
                  <JobList
                    jobs={enrichedJobs}
                    currentUser={currentSeeker}
                    onClaimJob={handleClaimJob}
                    onViewDetails={(job) => setSelectedJob(job)}
                    radiusKm={radiusKm}
                  />
                ) : (
                  <div className="h-[600px]">
                    <VelloreMapView
                      user={currentSeeker}
                      jobs={jobsWithinRadius}
                      radiusKm={radiusKm}
                      selectedJobId={selectedJob?.id}
                      onSelectJob={(job) => setSelectedJob(job)}
                      onClaimJob={handleClaimJob}
                      quickLocations={VELLORE_LOCATIONS}
                      onSelectCoordinates={(lat, lng) => {
                        handleSaveProfile({ ...currentSeeker, latitude: lat, longitude: lng });
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Tab: My Claimed Gigs */}
            {seekerActiveTab === 'my-gigs' && (
              <MyClaimedJobs
                jobs={enrichedJobs}
                currentUser={currentSeeker}
                onViewDetails={(job) => setSelectedJob(job)}
                onExploreGigs={() => setSeekerActiveTab('all')}
              />
            )}

          </div>
        )}

        {/* ===================== RECRUITER PORTAL ===================== */}
        {effectiveRole === 'recruiter' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Recruiter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky-500" />
                  <span>{t.recruiterHeading}</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {t.activeRecruiter}: <span className="text-slate-900 font-bold">{currentRecruiter.name}</span> • {currentRecruiter.phone}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCommunityDemandOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <span>{t.marketDemand}</span>
                </button>

                <button
                  onClick={() => setIsPostJobModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.postNewGigBtn}</span>
                </button>
              </div>
            </div>

            {/* Recruiter Job List */}
            <RecruiterJobList
              jobs={rawJobs}
              recruiter={currentRecruiter}
              onOpenPostModal={() => setIsPostJobModalOpen(true)}
              onUpdateStatus={handleUpdateJobStatus}
              onDeleteJob={handleDeleteJob}
              onOpenReviewModal={(job) => setJobForReview(job)}
            />

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Skill2Work" className="w-8 h-8 rounded-lg object-contain bg-slate-50 p-0.5 border border-slate-200" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">Skill2Work</span>
                <span>•</span>
                <span className="text-sky-600 font-bold uppercase tracking-wider text-[10px]">{t.footerTagline}</span>
              </div>
              <p className="text-[11px] text-slate-500">{t.footerEngineDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsCommunityDemandOpen(true)}
              className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-500" />
              {t.trends}
            </button>
            <button
              onClick={() => setIsSqlConsoleOpen(true)}
              className="text-sky-600 hover:text-sky-700 hover:underline font-semibold"
            >
              {t.sqlInspector}
            </button>
          </div>
        </div>
      </footer>

      {/* ===================== MODALS ===================== */}

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        currentUser={currentUser}
        onClose={() => setSelectedJob(null)}
        onClaim={handleClaimJob}
      />

      {/* Seeker Profile & Location Modal */}
      {currentSeeker && (
        <SeekerProfileModal
          user={currentSeeker}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Recruiter Post Job Modal */}
      {currentRecruiter && (
        <PostJobModal
          recruiter={currentRecruiter}
          isOpen={isPostJobModalOpen}
          onClose={() => setIsPostJobModalOpen(false)}
          onSubmit={handleCreateJob}
        />
      )}

      {/* SQLite Console / Terminal Modal */}
      <SqliteConsoleModal
        isOpen={isSqlConsoleOpen}
        onClose={() => setIsSqlConsoleOpen(false)}
      />

      {/* Notifications Modal */}
      {isNotificationsOpen && (
        <NotificationsModal
          notifications={notifications}
          language={language}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAsRead={(id) => sqliteManager.markNotificationAsRead(id)}
          onMarkAllAsRead={() => sqliteManager.markAllNotificationsAsRead(currentUser?.id || 'all')}
          onSelectJob={(jobId) => {
            const foundJob = enrichedJobs.find(j => j.id === jobId) || rawJobs.find(j => j.id === jobId);
            if (foundJob) setSelectedJob(foundJob);
          }}
        />
      )}

      {/* Community Demand & Skill Trends Modal */}
      {isCommunityDemandOpen && (
        <CommunityDemandModal
          stats={skillDemandStats}
          language={language}
          onClose={() => setIsCommunityDemandOpen(false)}
        />
      )}

      {/* Feedback & Rating Modal */}
      {jobForReview && currentUser && (
        <FeedbackRatingModal
          job={jobForReview}
          currentUser={currentUser}
          language={language}
          onClose={() => setJobForReview(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* Multi-Device Real-Time Sync Hub Modal */}
      <DeviceSyncModal
        isOpen={isDeviceSyncOpen}
        onClose={() => setIsDeviceSyncOpen(false)}
      />

      {/* Real-time Gig Radar Alert Notification */}
      <LiveGigAlert
        job={liveAlertJob}
        onViewJob={(job) => {
          setSelectedJob(job);
          setLiveAlertJob(null);
        }}
        onDismiss={() => setLiveAlertJob(null)}
      />

    </div>
  );
};
