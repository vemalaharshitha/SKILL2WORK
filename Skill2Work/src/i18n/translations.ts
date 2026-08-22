import type { Language } from '../types';
import { autoTranslateString } from './autoTranslate';

export interface TranslationDictionary {
  // App header & Global
  appName: string;
  regionTag: string;
  tagline: string;
  offlineStatus: string;
  sqlTerminal: string;
  roleSeeker: string;
  roleRecruiter: string;
  switchRole: string;
  offlineAlert: string;
  marketDemand: string;
  notificationsTitle: string;
  notificationsSubtitle: string;
  markAllRead: string;
  noNotifications: string;
  trends: string;
  sqlInspector: string;
  splitView: string;
  close: string;
  cancel: string;
  save: string;
  delete: string;
  add: string;
  all: string;
  search: string;
  earnings: string;
  postedDate: string;
  payRate: string;
  distance: string;
  coordinates: string;
  gigLocation: string;
  postedByRecruiter: string;
  viewProfile: string;
  manageProfile: string;

  // Login Page
  loginWelcome: string;
  loginHeading: string;
  loginSubtitle: string;
  loginSeekerDesc: string;
  loginRecruiterDesc: string;
  loginEmailLabel: string;
  loginEmailPlaceholder: string;
  loginPasswordLabel: string;
  loginPasswordPlaceholder: string;
  loginRememberMe: string;
  loginForgotPassword: string;
  loginSignInSeeker: string;
  loginSignInRecruiter: string;
  loginNewPrompt: string;
  loginCreateAccount: string;
  loginHeroTitle1: string;
  loginHeroTitle2: string;
  loginHeroTitleHighlight: string;
  loginHeroDesc: string;
  loginStatRadar: string;
  loginStatRadarSub: string;
  loginStatOpp: string;
  loginStatOppSub: string;
  tabSignIn: string;
  tabCreateAccount: string;
  newUserRegistration: string;
  joinSkill2Work: string;
  createAccountSubtitle: string;
  fullNameLabel: string;
  companyNameLabel: string;
  fullNamePlaceholder: string;
  companyNamePlaceholder: string;
  mobilePhoneLabel: string;
  mobilePhonePlaceholder: string;
  ageLabel: string;
  selectVelloreLocation: string;
  useGpsBtn: string;
  skillsOffered: string;
  availableTimeSlots: string;
  createSeekerAccountBtn: string;
  createRecruiterAccountBtn: string;
  alreadyRegisteredPrompt: string;
  signInNowBtn: string;
  orSignInRegistered: string;
  sqliteSavedFeature: string;
  radar3kmFeature: string;

  // Seeker Tab
  radarHeading: string;
  radarSubtitle: string;
  withinRadius: string;
  radiusSlider: string;
  allVellore: string;
  matchScore: string;
  claimJobBtn: string;
  claimedBadge: string;
  claimedOtherBadge: string;
  completedBadge: string;
  jobDetailsTitle: string;
  directionsBtn: string;
  callRecruiterBtn: string;
  whatsappRecruiterBtn: string;
  myGigsTab: string;
  allGigsTab: string;
  mapViewTab: string;
  listViewTab: string;
  profileBtn: string;
  gigsFound: string;
  changeLocation: string;
  sortBy: string;
  sortMatchScore: string;
  sortDistance: string;
  sortHighestPay: string;
  payout: string;
  proximity: string;
  claiming: string;
  overall: string;
  noClaimedGigsTitle: string;
  noClaimedGigsDesc: string;
  myClaimedSubtitle: string;

  // Profile Modal
  profileTitle: string;
  profileDesc: string;
  fullName: string;
  age: string;
  phoneNumber: string;
  mySkills: string;
  skillsSelected: string;
  addCustomSkillPlaceholder: string;
  myAvailability: string;
  myLocation: string;
  useCurrentGps: string;
  locating: string;
  selectLandmark: string;
  saveProfileBtn: string;

  // Skill Gap & AI Recommendations
  skillGapTitle: string;
  skillGapBadge: string;
  skillGapDesc: string;
  addToMySkills: string;
  neededInGigs: string;
  allStarTitle: string;
  allStarDesc: string;

  // Recruiter Portal
  recruiterHeading: string;
  recruiterSubtitle: string;
  activeRecruiter: string;
  postNewGigBtn: string;
  postedGigsCount: string;
  statusOpen: string;
  statusClaimed: string;
  statusCompleted: string;
  markCompletedBtn: string;
  deleteGigBtn: string;
  claimantDetails: string;
  noClaimantYet: string;
  rateClaimantBtn: string;
  callClaimantBtn: string;
  whatsappClaimantBtn: string;
  allGigsFilter: string;
  metricTotalGigs: string;
  metricOpenGigs: string;
  metricAssignedGigs: string;
  metricCompletedGigs: string;
  noRecruiterGigs: string;

  // Post Gig Form
  postModalTitle: string;
  postModalSubtitle: string;
  jobTitleLabel: string;
  jobTitlePlaceholder: string;
  categoryLabel: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  payoutLabel: string;
  payoutUnitLabel: string;
  perHour: string;
  perTask: string;
  perShift: string;
  perDay: string;
  requiredSkillsLabel: string;
  landmarkAreaLabel: string;
  clickMapInstruction: string;
  publishJobBtn: string;

  // Categories
  catDelivery: string;
  catStoreHelper: string;
  catDataEntry: string;
  catEventHand: string;
  catTutoring: string;
  catElectrical: string;

  // Filter & Search
  searchPlaceholder: string;
  categoryFilter: string;
  allCategories: string;
  minPayFilter: string;
  noJobsFound: string;

  // Match breakdown
  breakdownTitle: string;
  skillFit: string;
  distanceFit: string;
  scheduleFit: string;
  matchedSkillsLabel: string;
  missingSkillsLabel: string;

  // Community Demand Modal
  demandModalTitle: string;
  demandModalSubtitle: string;
  demandRegionBadge: string;
  topInDemandRole: string;
  avgHourlyPayout: string;
  peakHiringWindows: string;
  hourlyPaySub: string;
  peakHiringSub: string;
  skillDemandRanking: string;
  openGigsSuffix: string;
  topAreaLabel: string;
  growthLabel: string;

  // Feedback Modal
  feedbackTitle: string;
  feedbackSubtitle: string;
  ratingScoreLabel: string;
  feedbackTagsLabel: string;
  commentLabel: string;
  commentPlaceholder: string;
  submitReviewBtn: string;

  // SQLite Console Modal
  sqlConsoleTitle: string;
  sqlConsoleSubtitle: string;
  sqlEngineBadge: string;
  presetQueriesLabel: string;
  executeBtn: string;
  exportBtn: string;
  resetBtn: string;
  execTime: string;
  rowsReturned: string;
  noResults: string;

  // Footer & Toasts
  footerTagline: string;
  footerEngineDesc: string;
  toastClaimSuccess: string;
  toastStatusUpdated: string;
  toastJobDeleted: string;
  toastJobPosted: string;
  toastProfileUpdated: string;
  toastSkillAdded: string;
  toastReviewSaved: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    // App header & Global
    appName: 'Skill2Work',
    regionTag: 'Vellore Region (வேலூர்)',
    tagline: 'Right Skills. Right Job. Real Impact. • Vellore',
    offlineStatus: 'Offline-First SQLite Mode',
    sqlTerminal: 'SQLite Inspector',
    roleSeeker: 'Job Seeker',
    roleRecruiter: 'Recruiter',
    switchRole: 'Switch Role',
    offlineAlert: 'You are offline. Your saved gigs and profiles are available locally; maps and external links will reconnect when internet returns.',
    marketDemand: 'Market Demand',
    notificationsTitle: 'Notifications & Alerts',
    notificationsSubtitle: 'Real-time gig alerts, match recommendations & rating updates',
    markAllRead: 'Mark all as read',
    noNotifications: 'No notifications at this time.',
    trends: 'Trends',
    sqlInspector: 'SQL Inspector',
    splitView: 'Split View',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    add: 'Add',
    all: 'All',
    search: 'Search',
    earnings: 'Earnings',
    postedDate: 'Posted Date',
    payRate: 'Pay Rate',
    distance: 'Distance',
    coordinates: 'Coordinates',
    gigLocation: 'Gig Location',
    postedByRecruiter: 'Posted by Recruiter',
    viewProfile: 'View Profile',
    manageProfile: 'Manage Profile',

    // Login Page
    loginWelcome: 'WELCOME BACK',
    loginHeading: 'Sign in to continue',
    loginSubtitle: 'Choose your account type and access your workspace.',
    loginSeekerDesc: 'Find local gigs',
    loginRecruiterDesc: 'Post a gig',
    loginEmailLabel: 'Email or mobile number',
    loginEmailPlaceholder: 'you@example.com',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Enter your password',
    loginRememberMe: 'Remember me',
    loginForgotPassword: 'Forgot password?',
    loginSignInSeeker: 'Sign in as Job Seeker',
    loginSignInRecruiter: 'Sign in as Recruiter',
    loginNewPrompt: 'New to Skill2Work?',
    loginCreateAccount: 'Create an account',
    loginHeroTitle1: 'Right skills.',
    loginHeroTitle2: 'Right job.',
    loginHeroTitleHighlight: 'Real impact.',
    loginHeroDesc: 'Discover trusted local gigs or find the skilled people your business needs, all in one place.',
    loginStatRadar: '3 km',
    loginStatRadarSub: 'local radar',
    loginStatOpp: '24/7',
    loginStatOppSub: 'opportunities',
    tabSignIn: 'Sign In',
    tabCreateAccount: 'Create Account',
    newUserRegistration: 'New User Registration',
    joinSkill2Work: 'Join Skill2Work Vellore',
    createAccountSubtitle: 'Create your account to get matched with 3km hyper-local gigs or post jobs in Vellore.',
    fullNameLabel: 'Full Name',
    companyNameLabel: 'Company / Business Name',
    fullNamePlaceholder: 'e.g. Karthik Raja',
    companyNamePlaceholder: 'e.g. Vellore Fresh Mart',
    mobilePhoneLabel: 'Mobile Phone Number',
    mobilePhonePlaceholder: '+91 98401 23456',
    ageLabel: 'Age',
    selectVelloreLocation: 'Select Primary Vellore Location / Area',
    useGpsBtn: 'Use GPS',
    skillsOffered: 'Skills & Services Offered',
    availableTimeSlots: 'Available Time Slots',
    createSeekerAccountBtn: 'Create Seeker Account & Save to DB',
    createRecruiterAccountBtn: 'Create Recruiter Account & Save to DB',
    alreadyRegisteredPrompt: 'Already registered?',
    signInNowBtn: 'Sign In Now',
    orSignInRegistered: 'Or Sign In as a Registered SQLite User',
    sqliteSavedFeature: 'Saved instantly in SQLite WASM Database',
    radar3kmFeature: 'Hyper-local 3km Radar gig matching',

    // Seeker Tab
    radarHeading: 'Live Gig Radar (Vellore)',
    radarSubtitle: 'Find informal gigs & part-time shifts nearest to you',
    withinRadius: 'within',
    radiusSlider: 'Radius Filter',
    allVellore: 'All Vellore',
    matchScore: 'Match',
    claimJobBtn: 'Accept / Claim Gig',
    claimedBadge: 'Claimed by You',
    claimedOtherBadge: 'Assigned',
    completedBadge: 'Completed',
    jobDetailsTitle: 'Gig Details & Contact',
    directionsBtn: 'Get Directions',
    callRecruiterBtn: 'Call Recruiter',
    whatsappRecruiterBtn: 'WhatsApp',
    myGigsTab: 'My Claimed Gigs',
    allGigsTab: 'Find Local Gigs',
    mapViewTab: 'Map Radar',
    listViewTab: 'List View',
    profileBtn: 'My Profile & GPS',
    gigsFound: 'Gigs Found',
    changeLocation: 'Change',
    sortBy: 'Sort:',
    sortMatchScore: '🔥 Match Score',
    sortDistance: '⚡ Distance (Nearest)',
    sortHighestPay: '💰 Highest Payout',
    payout: 'Payout',
    proximity: 'Proximity',
    claiming: 'Claiming...',
    overall: 'Overall',
    noClaimedGigsTitle: 'No Claimed Gigs Yet',
    noClaimedGigsDesc: 'Explore the live 3km radar to accept quick hourly gigs in Katpadi, CMC, and Vellore.',
    myClaimedSubtitle: 'Track your accepted gigs and connect with local recruiters',

    // Profile Modal
    profileTitle: 'Seeker Profile & Location',
    profileDesc: 'Set your skills and availability to maximize your 3km match score',
    fullName: 'Full Name',
    age: 'Age',
    phoneNumber: 'Phone Number (with WhatsApp)',
    mySkills: 'My Skill Set (Select all that apply)',
    skillsSelected: 'selected',
    addCustomSkillPlaceholder: 'Add other skill (e.g. Electrician, Tutoring)...',
    myAvailability: 'Free-Time Availability',
    myLocation: 'Current Vellore Location / GPS',
    useCurrentGps: 'Fetch Live GPS',
    locating: 'Locating...',
    selectLandmark: 'Or Pick Vellore Landmark',
    saveProfileBtn: 'Save Profile & Update Radar',

    // Skill Gap & AI Recommendations
    skillGapTitle: 'AI Skill Gap & Career Recommendations',
    skillGapBadge: '+35% Match Score Boost',
    skillGapDesc: 'Add these high-demand skills to your profile to instantly unlock 90%+ match scores on top Vellore gigs.',
    addToMySkills: 'Add to My Skills',
    neededInGigs: 'Needed in',
    allStarTitle: 'All-Star Skill Profile!',
    allStarDesc: 'Your profile covers 100% of the active skills requested across nearby Vellore gigs.',

    // Recruiter Portal
    recruiterHeading: 'Recruiter Management Hub',
    recruiterSubtitle: 'Post quick part-time gigs across Katpadi, CMC, VIT & Vellore',
    activeRecruiter: 'Active Recruiter',
    postNewGigBtn: 'Post a New Gig',
    postedGigsCount: 'Active Posted Gigs',
    statusOpen: 'Open for Claim',
    statusClaimed: 'Claimed / Assigned',
    statusCompleted: 'Work Completed',
    markCompletedBtn: 'Mark as Completed',
    deleteGigBtn: 'Delete Gig',
    claimantDetails: 'Claimant Details',
    noClaimantYet: 'Waiting for nearby seeker to accept',
    rateClaimantBtn: 'Rate & Review',
    callClaimantBtn: 'Call',
    whatsappClaimantBtn: 'WhatsApp',
    allGigsFilter: 'All Gigs',
    metricTotalGigs: 'Total Gigs',
    metricOpenGigs: 'Open (Searching)',
    metricAssignedGigs: 'Assigned',
    metricCompletedGigs: 'Completed',
    noRecruiterGigs: 'You have not posted any gigs yet. Click "Post a New Gig" to get started!',

    // Post Gig Form
    postModalTitle: 'Post a Local Gig (Vellore)',
    postModalSubtitle: 'Post an informal gig with instant 3km radar discovery in Vellore',
    jobTitleLabel: 'Job Title',
    jobTitlePlaceholder: 'e.g., Delivery Assistant, Store Billing Hand, Event Setup',
    categoryLabel: 'Category',
    descriptionLabel: 'Description & Instructions',
    descriptionPlaceholder: 'Explain what the helper will do, shift timings, and reporting point...',
    payoutLabel: 'Payout Amount (₹)',
    payoutUnitLabel: 'Payout Type',
    perHour: 'per hour',
    perTask: 'per task',
    perShift: 'per shift',
    perDay: 'per day',
    requiredSkillsLabel: 'Required Skills (Select tags)',
    landmarkAreaLabel: 'Landmark / Area in Vellore',
    clickMapInstruction: 'Click on the map or select a Vellore landmark below to set exact coordinates',
    publishJobBtn: 'Publish Gig to SQLite',

    // Categories
    catDelivery: 'Delivery & Transport',
    catStoreHelper: 'Store Helper & Retail',
    catDataEntry: 'Data Entry & Office',
    catEventHand: 'Event & Catering Hand',
    catTutoring: 'Tutoring & Support',
    catElectrical: 'Technical & Maintenance',

    // Filter & Search
    searchPlaceholder: 'Search jobs, skills, or Vellore landmarks...',
    categoryFilter: 'Category',
    allCategories: 'All Categories',
    minPayFilter: 'Min Pay (₹)',
    noJobsFound: 'No gigs match your 3km radius or filter criteria. Try expanding the radar distance or clearing filters!',

    // Match breakdown
    breakdownTitle: 'Match Score Breakdown',
    skillFit: 'Skill Fit',
    distanceFit: 'Distance Fit',
    scheduleFit: 'Schedule Fit',
    matchedSkillsLabel: 'Matched Skills',
    missingSkillsLabel: 'Missing Skills',

    // Community Demand Modal
    demandModalTitle: 'Community Demand & Skill Trends',
    demandModalSubtitle: 'Live demand aggregation across Katpadi, CMC, VIT, and Sathuvachari',
    demandRegionBadge: 'Vellore District Real-Time AI Radar',
    topInDemandRole: 'Top In-Demand Role',
    avgHourlyPayout: 'Avg. Hourly Payout',
    peakHiringWindows: 'Peak Hiring Windows',
    hourlyPaySub: 'Instant same-day completion',
    peakHiringSub: 'Part-time flexible shifts',
    skillDemandRanking: 'Vellore In-Demand Skills & Pay Rate',
    openGigsSuffix: 'open gigs',
    topAreaLabel: 'Top Area:',
    growthLabel: 'Growth:',

    // Feedback Modal
    feedbackTitle: 'Rate & Review Experience',
    feedbackSubtitle: 'Help build community trust and enhance future AI match scoring',
    ratingScoreLabel: 'Overall Rating',
    feedbackTagsLabel: 'What went well? (Select tags)',
    commentLabel: 'Detailed Feedback / Notes',
    commentPlaceholder: 'Share specific details about timeliness, skill accuracy, and work quality...',
    submitReviewBtn: 'Submit Feedback & Update Trust Score',

    // SQLite Console Modal
    sqlConsoleTitle: 'SQLite In-Browser WASM Console',
    sqlConsoleSubtitle: 'Execute live queries directly on the local offline-first SQLite database',
    sqlEngineBadge: 'SQLite 3 Engine Active',
    presetQueriesLabel: 'Quick SQL Presets',
    executeBtn: 'Execute SQL Query',
    exportBtn: 'Export .sqlite Database',
    resetBtn: 'Reset Seed Data',
    execTime: 'Execution Time',
    rowsReturned: 'rows returned',
    noResults: 'Query executed successfully with no rows returned.',

    // Footer & Toasts
    footerTagline: 'Right Skills. Right Job. Real Impact.',
    footerEngineDesc: 'Hyper-Local Gig Discovery Engine — Vellore District, Tamil Nadu',
    toastClaimSuccess: '🎉 Gig accepted! Contact info unlocked for recruiter.',
    toastStatusUpdated: 'Status updated to',
    toastJobDeleted: 'Gig removed from SQLite.',
    toastJobPosted: '🚀 New Vellore gig posted and live on 3km radar!',
    toastProfileUpdated: '✅ Profile & GPS updated in SQLite WASM.',
    toastSkillAdded: 'added! AI match scores recalculated.',
    toastReviewSaved: '⭐ Rating & feedback saved! Community trust updated.'
  },

  ta: {
    // App header & Global
    appName: 'Skill2Work (வேலை2திறன்)',
    regionTag: 'வேலூர் மாவட்டம்',
    tagline: 'சரியான திறன்கள். சரியான வேலை. உண்மையான தாக்கம். • வேலூர்',
    offlineStatus: 'ஆஃப்லைன் SQLite பயன்முறை',
    sqlTerminal: 'SQLite கன்சோல்',
    roleSeeker: 'வேலை தேடுபவர்',
    roleRecruiter: 'பணியமர்த்துபவர்',
    switchRole: 'பங்கை மாற்று',
    offlineAlert: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். உங்கள் சேமிக்கப்பட்ட வேலைகள் மற்றும் விவரங்கள் உள்ளூரில் கிடைக்கின்றன.',
    marketDemand: 'சந்தை தேவை',
    notificationsTitle: 'அறிவிப்புகள் & எச்சரிக்கைகள்',
    notificationsSubtitle: 'நேரடி வேலை எச்சரிக்கைகள், பொருத்த பரிந்துரைகள் மற்றும் மதிப்பீடுகள்',
    markAllRead: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
    noNotifications: 'தற்போது எந்த அறிவிப்பும் இல்லை.',
    trends: 'போக்குகள்',
    sqlInspector: 'SQL ஆய்வாளர்',
    splitView: 'பிரிவு காட்சி',
    close: 'மூடு',
    cancel: 'ரத்து செய்',
    save: 'சேமிக்க',
    delete: 'நீக்கு',
    add: 'சேர்',
    all: 'அனைத்தும்',
    search: 'தேடு',
    earnings: 'வருமானம்',
    postedDate: 'பதிவிடப்பட்ட தேதி',
    payRate: 'ஊதிய விகிதம்',
    distance: 'தூரம்',
    coordinates: 'ஆயத்தொலைவுகள்',
    gigLocation: 'வேலை இருப்பிடம்',
    postedByRecruiter: 'பணியமர்த்துபவர் விவரம்',
    viewProfile: 'விவரக்குறிப்பைக் காண்க',
    manageProfile: 'விவரக்குறிப்பை நிர்வகி',

    // Login Page
    loginWelcome: 'நல்வரவு',
    loginHeading: 'தொடர உள்நுழையவும்',
    loginSubtitle: 'உங்கள் கணக்கு வகையைத் தேர்ந்தெடுத்து உங்கள் தளத்தை அணுகவும்.',
    loginSeekerDesc: 'உள்ளூர் வேலைகளைக் கண்டறியவும்',
    loginRecruiterDesc: 'வேலையைப் பதிவிடவும்',
    loginEmailLabel: 'மின்னஞ்சல் அல்லது மொபைல் எண்',
    loginEmailPlaceholder: 'you@example.com',
    loginPasswordLabel: 'கடவுச்சொல்',
    loginPasswordPlaceholder: 'கடவுச்சொல்லை உள்ளிடவும்',
    loginRememberMe: 'என்னை நினைவில் கொள்',
    loginForgotPassword: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    loginSignInSeeker: 'வேலை தேடுபவராக உள்நுழைக',
    loginSignInRecruiter: 'பணியமர்த்துபவராக உள்நுழைக',
    loginNewPrompt: 'Skill2Work-க்கு புதியவரா?',
    loginCreateAccount: 'புதிய கணக்கை உருவாக்கவும்',
    loginHeroTitle1: 'சரியான திறன்கள்.',
    loginHeroTitle2: 'சரியான வேலை.',
    loginHeroTitleHighlight: 'உண்மையான தாக்கம்.',
    loginHeroDesc: 'நம்பகமான உள்ளூர் பகுதி நேர வேலைகளைக் கண்டறியுங்கள் அல்லது திறமையான பணியாளர்களை ஒரே இடத்தில் பணியமர்த்துங்கள்.',
    loginStatRadar: '3 கி.மீ',
    loginStatRadarSub: 'உள்ளூர் ரேடார்',
    loginStatOpp: '24/7',
    loginStatOppSub: 'வாய்ப்புகள்',
    tabSignIn: 'உள்நுழைவு',
    tabCreateAccount: 'கணக்கை உருவாக்கு',
    newUserRegistration: 'புதிய பயனர் பதிவு',
    joinSkill2Work: 'ஸ்கில்2ஒர்க் வேலூரில் இணையுங்கள்',
    createAccountSubtitle: 'வேலூரில் 3 கி.மீ பகுதியில் உள்ள பகுதிநேர வேலைகளை பெற அல்லது பதிவிட கணக்கை உருவாக்குங்கள்.',
    fullNameLabel: 'முழு பெயர்',
    companyNameLabel: 'நிறுவனம் / வணிக பெயர்',
    fullNamePlaceholder: 'எ.கா. கார்த்திக் ராஜா',
    companyNamePlaceholder: 'எ.கா. வேலூர் ஃப்ரெஷ் மார்ட்',
    mobilePhoneLabel: 'கைபேசி எண்',
    mobilePhonePlaceholder: '+91 98401 23456',
    ageLabel: 'வயது',
    selectVelloreLocation: 'வேலூர் முதன்மை இடத்தை தேர்ந்தெடுக்கவும்',
    useGpsBtn: 'ஜிபிஎஸ் பயன்படுத்து',
    skillsOffered: 'திறன்கள் மற்றும் சேவைகள்',
    availableTimeSlots: 'கிடைக்கும் நேரங்கள்',
    createSeekerAccountBtn: 'வேலை தேடுபவர் கணக்கை உருவாக்கு (DB சேமிப்பு)',
    createRecruiterAccountBtn: 'பணியமர்த்துபவர் கணக்கை உருவாக்கு (DB சேமிப்பு)',
    alreadyRegisteredPrompt: 'ஏற்கனவே பதிவு செய்துள்ளீர்களா?',
    signInNowBtn: 'இப்போது உள்நுழையவும்',
    orSignInRegistered: 'அல்லது பதிவுசெய்யப்பட்ட பயனராக உள்நுழையவும்',
    sqliteSavedFeature: 'SQLite WASM தரவுத்தளத்தில் உடனடியாக சேமிக்கப்பட்டது',
    radar3kmFeature: 'உள்ளூர் 3 கி.மீ ரேடார் வேலை பொருத்தம்',

    // Seeker Tab
    radarHeading: 'வேலூர் நேரடி வேலை ரேடார்',
    radarSubtitle: 'உங்களுக்கு மிக அருகில் உள்ள பகுதி நேர வேலைகளைக் கண்டறியவும்',
    withinRadius: 'சுற்றளவிற்குள்',
    radiusSlider: 'தூர வடிகட்டி',
    allVellore: 'முழு வேலூர்',
    matchScore: 'பொருத்தம்',
    claimJobBtn: 'வேலையை ஏற்றுக்கொள்',
    claimedBadge: 'நீங்கள் ஏற்றுக்கொண்டவை',
    claimedOtherBadge: 'ஒதுக்கப்பட்டது',
    completedBadge: 'முடிக்கப்பட்டது',
    jobDetailsTitle: 'வேலை விவரங்கள் மற்றும் தொடர்பு',
    directionsBtn: 'வழிப்பாதை காண்க',
    callRecruiterBtn: 'அழைக்கவும்',
    whatsappRecruiterBtn: 'வாட்ஸ்அப்',
    myGigsTab: 'என் வேலைகள்',
    allGigsTab: 'உள்ளூர் வேலைகள்',
    mapViewTab: 'வரைபட ரேடார்',
    listViewTab: 'பட்டியல் காட்சி',
    profileBtn: 'என் விவரக்குறிப்பு & GPS',
    gigsFound: 'வேலைகள் கிடைத்தன',
    changeLocation: 'மாற்று',
    sortBy: 'வரிசைப்படுத்து:',
    sortMatchScore: '🔥 பொருத்த மதிப்பெண்',
    sortDistance: '⚡ தூரம் (அருகில்)',
    sortHighestPay: '💰 அதிக ஊதியம்',
    payout: 'ஊதியம்',
    proximity: 'தொலைவு',
    claiming: 'ஏற்கப்படுகிறது...',
    overall: 'மொத்தம்',
    noClaimedGigsTitle: 'இன்னும் வேலைகள் ஏற்றுக்கொள்ளப்படவில்லை',
    noClaimedGigsDesc: 'காட்பாடி, சிஎம்சி மற்றும் வேலூரில் உடனடி வேலைகளை ஏற்க 3 கிமீ நேரடி ரேடாரை ஆராயுங்கள்.',
    myClaimedSubtitle: 'ஏற்றுக்கொண்ட வேலைகளைக் கண்காணித்து உள்ளூர் பணியமர்த்துபவரைத் தொடர்பு கொள்ளவும்',

    // Profile Modal
    profileTitle: 'பயனர் விவரம் மற்றும் இருப்பிடம்',
    profileDesc: 'அதிக வேலைப் பொருத்தத்தைப் பெற உங்கள் திறன்கள் மற்றும் நேரத்தைத் தேர்வுசெய்க',
    fullName: 'முழு பெயர்',
    age: 'வயது',
    phoneNumber: 'தொலைபேசி எண் (வாட்ஸ்அப் உடன்)',
    mySkills: 'எனது திறன்கள் (பொருத்தமானவற்றைத் தேர்வுசெய்க)',
    skillsSelected: 'தேர்ந்தெடுக்கப்பட்டது',
    addCustomSkillPlaceholder: 'பிற திறனைச் சேர்க்கவும் (எ.கா: எலக்ட்ரீஷியன், டியூஷன்)...',
    myAvailability: 'கிடைக்கும் நேரம்',
    myLocation: 'தற்போதைய வேலூர் இருப்பிடம் / GPS',
    useCurrentGps: 'நேரடி GPS பெறுக',
    locating: 'கண்டறிகிறது...',
    selectLandmark: 'வேலூர் முக்கிய இடத்தை தேர்வு செய்யவும்',
    saveProfileBtn: 'விவரங்களைச் சேமித்து ரேடாரைப் புதுப்பிக்கவும்',

    // Skill Gap & AI Recommendations
    skillGapTitle: 'AI திறன் இடைவெளி & தொழில் பரிந்துரைகள்',
    skillGapBadge: '+35% பொருத்த மதிப்பெண் உயர்வு',
    skillGapDesc: 'வேலூரின் முக்கிய வேலைகளில் 90%+ பொருத்த மதிப்பெண்ணைப் பெற இந்த அதிக தேவை கொண்ட திறன்களை உங்கள் விவரக்குறிப்பில் சேர்க்கவும்.',
    addToMySkills: 'எனது திறன்களில் சேர்',
    neededInGigs: 'தேவைப்படும் வேலைகள்:',
    allStarTitle: 'சிறந்த திறன் விவரக்குறிப்பு!',
    allStarDesc: 'அருகிலுள்ள வேலூர் வேலைகளில் கேட்கப்படும் அனைத்து திறன்களையும் உங்கள் விவரக்குறிப்பு கொண்டுள்ளது.',

    // Recruiter Portal
    recruiterHeading: 'பணியமர்த்துபவர் கட்டுப்பாட்டு மையம்',
    recruiterSubtitle: 'காட்பாடி, சி.எம்.சி, வி.ஐ.டி மற்றும் வேலூரில் வேலைகளைப் பதிவிடவும்',
    activeRecruiter: 'செயலில் உள்ள பணியமர்த்துபவர்',
    postNewGigBtn: 'புதிய வேலை இடுக',
    postedGigsCount: 'பதிவிடப்பட்ட வேலைகள்',
    statusOpen: 'ஏற்றுக்கொள்ள தயார்',
    statusClaimed: 'ஏற்றுக்கொள்ளப்பட்டது',
    statusCompleted: 'பணி நிறைவடைந்தது',
    markCompletedBtn: 'பணி முடிந்தது என குறிக்க',
    deleteGigBtn: 'வேலையை நீக்கு',
    claimantDetails: 'பணியாளர் விவரங்கள்',
    noClaimantYet: 'வேலை தேடுபவர் ஏற்பிற்காக காத்திருக்கிறது',
    rateClaimantBtn: 'மதிப்பீடு வழங்குக',
    callClaimantBtn: 'அழை',
    whatsappClaimantBtn: 'வாட்ஸ்அப்',
    allGigsFilter: 'அனைத்து வேலைகள்',
    metricTotalGigs: 'மொத்த வேலைகள்',
    metricOpenGigs: 'திறந்தவை (தேடலில்)',
    metricAssignedGigs: 'ஒதுக்கப்பட்டவை',
    metricCompletedGigs: 'முடிந்தவை',
    noRecruiterGigs: 'நீங்கள் இன்னும் வேலைகளைப் பதிவிடவில்லை. தொடங்க "புதிய வேலை இடுக" என்பதை கிளிக் செய்யவும்!',

    // Post Gig Form
    postModalTitle: 'வேலூர் உள்ளூர் வேலை பதிவிடுதல்',
    postModalSubtitle: '3 கி.மீ ரேடாரில் உடனடியாகக் கண்டறிய வேலூர் உள்ளூர் வேலையைப் பதிவிடவும்',
    jobTitleLabel: 'வேலை தலைப்பு',
    jobTitlePlaceholder: 'எ.கா: டெலிவரி உதவியாளர், கடை பில்லிங், நிகழ்வு உதவி',
    categoryLabel: 'பிரிவு',
    descriptionLabel: 'விளக்கம் மற்றும் வழிகாட்டுதல்கள்',
    descriptionPlaceholder: 'செய்ய வேண்டிய வேலை, நேரம் மற்றும் தொடர்பு இடம் குறித்து விளக்குக...',
    payoutLabel: 'ஊதியம் (₹)',
    payoutUnitLabel: 'ஊதிய வகை',
    perHour: 'மணிக்கு',
    perTask: 'பணிக்கு',
    perShift: 'ஷிஃப்ட்டிற்கு',
    perDay: 'நாளுக்கு',
    requiredSkillsLabel: 'தேவைப்படும் திறன்கள்',
    landmarkAreaLabel: 'வேலூர் பகுதி / இடம்',
    clickMapInstruction: 'சரியான இடத்தை தேர்ந்தெடுக்க வரைபடத்தில் கிளிக் செய்யவும் அல்லது தேர்வு செய்யவும்',
    publishJobBtn: 'வேலையை வெளியிடுக (SQLite)',

    // Categories
    catDelivery: 'டெலிவரி மற்றும் போக்குவரத்து',
    catStoreHelper: 'கடை உதவியாளர் & சில்லறை வர்த்தகம்',
    catDataEntry: 'தரவு உள்ளீடு & அலுவலகம்',
    catEventHand: 'நிகழ்வு மற்றும் கேட்டரிங்',
    catTutoring: 'பயிற்றுவிப்பு & கல்வி உதவி',
    catElectrical: 'தொழில்நுட்பம் & பராமரிப்பு',

    // Filter & Search
    searchPlaceholder: 'வேலை, திறன் அல்லது வேலூர் பகுதியைத் தேடுங்கள்...',
    categoryFilter: 'பிரிவு',
    allCategories: 'அனைத்து பிரிவுகளும்',
    minPayFilter: 'குறைந்தபட்ச ஊதியம் (₹)',
    noJobsFound: 'தேர்ந்தெடுக்கப்பட்ட தூரத்திற்குள் வேலைகள் இல்லை. ரேடார் தூரத்தை அதிகரிக்கவும்!',

    // Match breakdown
    breakdownTitle: 'பொருத்த மதிப்பெண் விவரம்',
    skillFit: 'திறன் பொருத்தம்',
    distanceFit: 'தூர பொருத்தம்',
    scheduleFit: 'நேரப் பொருத்தம்',
    matchedSkillsLabel: 'பொருந்திய திறன்கள்',
    missingSkillsLabel: 'இல்லாத திறன்கள்',

    // Community Demand Modal
    demandModalTitle: 'சமூக தேவை மற்றும் திறன் போக்குகள்',
    demandModalSubtitle: 'காட்பாடி, சிஎம்சி, விஐடி மற்றும் சத்துவாச்சாரியில் நேரடி தேவை திரட்டு',
    demandRegionBadge: 'வேலூர் மாவட்ட நிகழ்நேர AI ரேடார்',
    topInDemandRole: 'அதிக தேவை கொண்ட வேலை',
    avgHourlyPayout: 'சராசரி மணிநேர ஊதியம்',
    peakHiringWindows: 'அதிக வேலைவாய்ப்பு நேரங்கள்',
    hourlyPaySub: 'அன்றைய தினமே உடனடி ஊதியம்',
    peakHiringSub: 'நெகிழ்வான பகுதி நேர ஷிப்டுகள்',
    skillDemandRanking: 'வேலூர் தேவைப்படும் திறன்கள் மற்றும் ஊதிய விகிதம்',
    openGigsSuffix: 'திறந்த வேலைகள்',
    topAreaLabel: 'முக்கிய பகுதி:',
    growthLabel: 'வளர்ச்சி:',

    // Feedback Modal
    feedbackTitle: 'அனுபவத்தை மதிப்பிட்டு விமர்சனம் செய்க',
    feedbackSubtitle: 'சமூக நம்பிக்கையை வளர்க்கவும் எதிர்கால AI பொருத்தத்தை மேம்படுத்தவும் உதவுங்கள்',
    ratingScoreLabel: 'ஒட்டுமொத்த மதிப்பீடு',
    feedbackTagsLabel: 'எது சிறப்பாக இருந்தது?',
    commentLabel: 'விரிவான கருத்துக்கள்',
    commentPlaceholder: 'நேரம் தவறாமை, திறன் துல்லியம் மற்றும் பணித்தரம் பற்றிய விவரங்களைப் பகிரவும்...',
    submitReviewBtn: 'மதிப்பீட்டைச் சமர்ப்பிக்கவும்',

    // SQLite Console Modal
    sqlConsoleTitle: 'SQLite உலாவி WASM கன்சோல்',
    sqlConsoleSubtitle: 'உள்ளூர் ஆஃப்லைன் SQLite தரவுத்தளத்தில் வினவல்களை இயக்கவும்',
    sqlEngineBadge: 'SQLite 3 இன்ஜின் செயலில் உள்ளது',
    presetQueriesLabel: 'முன் அமைக்கப்பட்ட SQL வினவல்கள்',
    executeBtn: 'வினவலை இயக்கு',
    exportBtn: 'தரவுத்தளத்தை ஏற்றுமதி செய்',
    resetBtn: 'தரவை மீட்டமைக்க',
    execTime: 'இயக்க நேரம்',
    rowsReturned: 'வரிசைகள் கிடைத்தன',
    noResults: 'வினவல் வெற்றிகரமாக இயங்கியது, முடிவுகள் எதுவும் இல்லை.',

    // Footer & Toasts
    footerTagline: 'சரியான திறன்கள். சரியான வேலை. உண்மையான தாக்கம்.',
    footerEngineDesc: 'வேலூர் மாவட்ட உள்ளூர் பகுதி நேர வேலை தேடுபொறி — தமிழ்நாடு',
    toastClaimSuccess: '🎉 வேலை ஏற்றுக்கொள்ளப்பட்டது! பணியமர்த்துபவருக்கு தொடர்பு விவரங்கள் பகிரப்பட்டன.',
    toastStatusUpdated: 'நிலை மாற்றப்பட்டது:',
    toastJobDeleted: 'வேலை SQLite-லிருந்து நீக்கப்பட்டது.',
    toastJobPosted: '🚀 புதிய வேலூர் வேலை பதிவிடப்பட்டது மற்றும் 3 கிமீ ரேடாரில் நேரலையில் உள்ளது!',
    toastProfileUpdated: '✅ சுயவிவரம் மற்றும் GPS புதுப்பிக்கப்பட்டது.',
    toastSkillAdded: 'சேர்க்கப்பட்டது! AI பொருத்த மதிப்பெண் மறு கணக்கீடு செய்யப்பட்டது.',
    toastReviewSaved: '⭐ மதிப்பீடு சேமிக்கப்பட்டது! சமூக நம்பிக்கை புதுப்பிக்கப்பட்டது.'
  },

  hi: {
    // App header & Global
    appName: 'Skill2Work (स्किल2वर्क)',
    regionTag: 'वेल्लोर क्षेत्र',
    tagline: 'सही कौशल। सही काम। वास्तविक प्रभाव। • वेल्लोर',
    offlineStatus: 'ऑफ़लाइन SQLite मोड',
    sqlTerminal: 'SQLite कंसोल',
    roleSeeker: 'नौकरी खोजकर्ता',
    roleRecruiter: 'नियोक्ता / भर्तीकर्ता',
    switchRole: 'भूमिका बदलें',
    offlineAlert: 'आप ऑफ़लाइन हैं। आपके सहेजे गए कार्य और प्रोफ़ाइल स्थानीय रूप से उपलब्ध हैं।',
    marketDemand: 'बाज़ार मांग',
    notificationsTitle: 'सूचनाएं और अलर्ट',
    notificationsSubtitle: 'रीयल-टाइम गिग अलर्ट, मिलान सुझाव और रेटिंग अपडेट',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noNotifications: 'इस समय कोई सूचना नहीं है।',
    trends: 'रुझान',
    sqlInspector: 'SQL इंस्पेक्टर',
    splitView: 'स्प्लिट दृश्य',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    add: 'जोड़ें',
    all: 'सभी',
    search: 'खोजें',
    earnings: 'कमाई',
    postedDate: 'पोस्ट तिथि',
    payRate: 'भुगतान दर',
    distance: 'दूरी',
    coordinates: 'निर्देशांक',
    gigLocation: 'कार्य स्थान',
    postedByRecruiter: 'नियोक्ता द्वारा पोस्ट किया गया',
    viewProfile: 'प्रोफ़ाइल देखें',
    manageProfile: 'प्रोफ़ाइल प्रबंधित करें',

    // Login Page
    loginWelcome: 'स्वागत है',
    loginHeading: 'जारी रखने के लिए साइन इन करें',
    loginSubtitle: 'अपना खाता प्रकार चुनें और अपने कार्यक्षेत्र तक पहुंचें।',
    loginSeekerDesc: 'स्थानीय कार्य खोजें',
    loginRecruiterDesc: 'काम पोस्ट करें',
    loginEmailLabel: 'ईमेल या मोबाइल नंबर',
    loginEmailPlaceholder: 'you@example.com',
    loginPasswordLabel: 'पासवर्ड',
    loginPasswordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    loginRememberMe: 'मुझे याद रखें',
    loginForgotPassword: 'पासवर्ड भूल गए?',
    loginSignInSeeker: 'नौकरी खोजकर्ता के रूप में साइन इन करें',
    loginSignInRecruiter: 'नियोक्ता के रूप में साइन इन करें',
    loginNewPrompt: 'Skill2Work पर नए हैं?',
    loginCreateAccount: 'खाता बनाएं',
    loginHeroTitle1: 'सही कौशल।',
    loginHeroTitle2: 'सही काम।',
    loginHeroTitleHighlight: 'वास्तविक प्रभाव।',
    loginHeroDesc: 'भरोसेमंद स्थानीय गिग्स खोजें या अपने व्यवसाय के लिए कुशल लोग प्राप्त करें, सब एक ही स्थान पर।',
    loginStatRadar: '3 किमी',
    loginStatRadarSub: 'स्थानीय रडार',
    loginStatOpp: '24/7',
    loginStatOppSub: 'अवसर',
    tabSignIn: 'साइन इन करें',
    tabCreateAccount: 'खाता बनाएं',
    newUserRegistration: 'नया उपयोगकर्ता पंजीकरण',
    joinSkill2Work: 'Skill2Work वेल्लोर से जुड़ें',
    createAccountSubtitle: 'वेल्लोर में 3 किमी के भीतर स्थानीय नौकरियों से जुड़ने या पोस्ट करने के लिए खाता बनाएं।',
    fullNameLabel: 'पूरा नाम',
    companyNameLabel: 'कंपनी / व्यवसाय का नाम',
    fullNamePlaceholder: 'उदा. कार्तिक राजा',
    companyNamePlaceholder: 'उदा. वेल्लोर फ्रेश मार्ट',
    mobilePhoneLabel: 'मोबाइल फोन नंबर',
    mobilePhonePlaceholder: '+91 98401 23456',
    ageLabel: 'आयु',
    selectVelloreLocation: 'मुख्य वेल्लोर स्थान चुनें',
    useGpsBtn: 'GPS का उपयोग करें',
    skillsOffered: 'कौशल और सेवाएं',
    availableTimeSlots: 'उपलब्ध समय',
    createSeekerAccountBtn: 'नौकरी चाहने वाले का खाता बनाएं (DB में सहेजें)',
    createRecruiterAccountBtn: 'नियोक्ता खाता बनाएं (DB में सहेजें)',
    alreadyRegisteredPrompt: 'क्या आप पहले से पंजीकृत हैं?',
    signInNowBtn: 'अब साइन इन करें',
    orSignInRegistered: 'या पंजीकृत SQLite उपयोगकर्ता के रूप में साइन इन करें',
    sqliteSavedFeature: 'SQLite WASM डेटाबेस में तुरंत सहेजा गया',
    radar3kmFeature: 'स्थानीय 3 किमी रडार जॉब मैचिंग',

    // Seeker Tab
    radarHeading: 'लाइव गिग रडार (वेल्लोर)',
    radarSubtitle: 'अपने सबसे नज़दीकी पार्ट-टाइम और अस्थायी काम खोजें',
    withinRadius: 'के दायरे में',
    radiusSlider: 'दूरी फ़िल्टर',
    allVellore: 'पूरा वेल्लोर',
    matchScore: 'मैच',
    claimJobBtn: 'काम स्वीकार करें',
    claimedBadge: 'आपके द्वारा स्वीकृत',
    claimedOtherBadge: 'आवंटित',
    completedBadge: 'पूर्ण',
    jobDetailsTitle: 'काम का विवरण और संपर्क',
    directionsBtn: 'दिशा-निर्देश देखें',
    callRecruiterBtn: 'कॉल करें',
    whatsappRecruiterBtn: 'व्हाट्सएप',
    myGigsTab: 'मेरे स्वीकृत कार्य',
    allGigsTab: 'स्थानीय कार्य खोजें',
    mapViewTab: 'मानचित्र रडार',
    listViewTab: 'सूची दृश्य',
    profileBtn: 'मेरी प्रोफाइल और GPS',
    gigsFound: 'कार्य मिले',
    changeLocation: 'बदलें',
    sortBy: 'क्रमबद्ध:',
    sortMatchScore: '🔥 मैच स्कोर',
    sortDistance: '⚡ दूरी (नजदीक)',
    sortHighestPay: '💰 सबसे अधिक भुगतान',
    payout: 'भुगतान',
    proximity: 'दूरी',
    claiming: 'स्वीकार किया जा रहा है...',
    overall: 'कुल',
    noClaimedGigsTitle: 'अभी तक कोई कार्य स्वीकृत नहीं',
    noClaimedGigsDesc: 'काटपाडी, सीएमसी और वेल्लोर में त्वरित प्रति घंटे के कार्यों को स्वीकार करने के लिए 3 किमी रडार का उपयोग करें।',
    myClaimedSubtitle: 'अपने स्वीकृत कार्यों को ट्रैक करें और स्थानीय नियोक्ताओं से संपर्क करें',

    // Profile Modal
    profileTitle: 'प्रोफ़ाइल और स्थान सेटिंग',
    profileDesc: 'अपने 3 किमी मैच स्कोर को अधिकतम करने के लिए कौशल और समय चुनें',
    fullName: 'पूरा नाम',
    age: 'आयु',
    phoneNumber: 'फ़ोन नंबर (व्हाट्सएप सहित)',
    mySkills: 'मेरे कौशल (कौशल चुनें)',
    skillsSelected: 'चुने गए',
    addCustomSkillPlaceholder: 'अन्य कौशल जोड़ें (उदा. इलेक्ट्रीशियन, ट्यूशन)...',
    myAvailability: 'उपलब्ध समय',
    myLocation: 'वर्तमान वेल्लोर स्थान / GPS',
    useCurrentGps: 'लाइव GPS प्राप्त करें',
    locating: 'स्थान खोजा जा रहा है...',
    selectLandmark: 'या वेल्लोर का प्रमुख स्थान चुनें',
    saveProfileBtn: 'प्रोफ़ाइल सहेजें और रडार अपडेट करें',

    // Skill Gap & AI Recommendations
    skillGapTitle: 'AI कौशल अंतराल और करियर अनुशंसाएं',
    skillGapBadge: '+35% मैच स्कोर वृद्धि',
    skillGapDesc: 'शीर्ष वेल्लोर गिग्स पर 90%+ मैच स्कोर प्राप्त करने के लिए इन उच्च-मांग वाले कौशलों को अपनी प्रोफ़ाइल में जोड़ें।',
    addToMySkills: 'कौशल में जोड़ें',
    neededInGigs: 'आवश्यकता:',
    allStarTitle: 'उत्कृष्ट कौशल प्रोफ़ाइल!',
    allStarDesc: 'आपकी प्रोफ़ाइल आस-पास के वेल्लोर गिग्स में मांगे गए 100% कौशलों को पूरा करती है।',

    // Recruiter Portal
    recruiterHeading: 'नियोक्ता प्रबंधन केंद्र',
    recruiterSubtitle: 'काटपाडी, सीएमसी, वीआईटी और वेल्लोर में गिग्स पोस्ट करें',
    activeRecruiter: 'सक्रिय नियोक्ता',
    postNewGigBtn: 'नया काम पोस्ट करें',
    postedGigsCount: 'सक्रिय पोस्ट किए गए कार्य',
    statusOpen: 'स्वीकृति के लिए उपलब्ध',
    statusClaimed: 'स्वीकृत / सौंपा गया',
    statusCompleted: 'कार्य पूर्ण',
    markCompletedBtn: 'पूर्ण के रूप में चिह्नित करें',
    deleteGigBtn: 'काम हटाएं',
    claimantDetails: 'कार्यकर्ता विवरण',
    noClaimantYet: 'सहायक द्वारा स्वीकार किए जाने की प्रतीक्षा है',
    rateClaimantBtn: 'रेटिंग और समीक्षा दें',
    callClaimantBtn: 'कॉल करें',
    whatsappClaimantBtn: 'व्हाट्सएप',
    allGigsFilter: 'सभी कार्य',
    metricTotalGigs: 'कुल कार्य',
    metricOpenGigs: 'खुले (खोज जारी)',
    metricAssignedGigs: 'सौंपे गए',
    metricCompletedGigs: 'पूर्ण हुए',
    noRecruiterGigs: 'आपने अभी तक कोई काम पोस्ट नहीं किया है। शुरू करने के लिए "नया काम पोस्ट करें" पर क्लिक करें!',

    // Post Gig Form
    postModalTitle: 'स्थानीय वेल्लोर कार्य पोस्ट करें',
    postModalSubtitle: 'वेल्लोर में तत्काल 3 किमी रडार खोज के साथ एक काम पोस्ट करें',
    jobTitleLabel: 'कार्य शीर्षक',
    jobTitlePlaceholder: 'उदा. डिलीवरी सहायक, स्टोर बिलिंग, इवेंट सहायता',
    categoryLabel: 'श्रेणी',
    descriptionLabel: 'विवरण और निर्देश',
    descriptionPlaceholder: 'काम का विवरण, समय और मिलने का स्थान बताएं...',
    payoutLabel: 'भुगतान राशि (₹)',
    payoutUnitLabel: 'भुगतान प्रकार',
    perHour: 'प्रति घंटा',
    perTask: 'प्रति कार्य',
    perShift: 'प्रति शिफ्ट',
    perDay: 'प्रति दिन',
    requiredSkillsLabel: 'आवश्यक कौशल',
    landmarkAreaLabel: 'वेल्लोर क्षेत्र / लैंडमार्क',
    clickMapInstruction: 'सटीक निर्देशांक सेट करने के लिए मानचित्र पर क्लिक करें या स्थान चुनें',
    publishJobBtn: 'कार्य प्रकाशित करें (SQLite)',

    // Categories
    catDelivery: 'डिलीवरी और परिवहन',
    catStoreHelper: 'दुकान सहायक और रिटेल',
    catDataEntry: 'डेटा एंट्री और ऑफिस',
    catEventHand: 'इवेंट और कैटरिंग सहायता',
    catTutoring: 'ट्यूशन और शिक्षण सहायता',
    catElectrical: 'तकनीकी और रखरखाव',

    // Filter & Search
    searchPlaceholder: 'कार्य, कौशल या वेल्लोर स्थान खोजें...',
    categoryFilter: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    minPayFilter: 'न्यूनतम भुगतान (₹)',
    noJobsFound: 'आपके 3 किमी दायरे में कोई काम नहीं मिला। रडार दूरी बढ़ाकर देखें!',

    // Match breakdown
    breakdownTitle: 'मैच स्कोर विश्लेषण',
    skillFit: 'कौशल मिलान',
    distanceFit: 'दूरी मिलान',
    scheduleFit: 'समय मिलान',
    matchedSkillsLabel: 'मिले हुए कौशल',
    missingSkillsLabel: 'अनुपस्थित कौशल',

    // Community Demand Modal
    demandModalTitle: 'समुदाय मांग और कौशल रुझान',
    demandModalSubtitle: 'काटपाडी, सीएमसी, वीआईटी और सतुवाचारी में रीयल-टाइम मांग विश्लेषण',
    demandRegionBadge: 'वेल्लोर जिला रीयल-टाइम AI रडार',
    topInDemandRole: 'सबसे अधिक मांग वाली भूमिका',
    avgHourlyPayout: 'औसत प्रति घंटा भुगतान',
    peakHiringWindows: 'सर्वोच्च भर्ती समय',
    hourlyPaySub: 'उसी दिन तत्काल भुगतान',
    peakHiringSub: 'लचीली पार्ट-टाइम शिफ्ट',
    skillDemandRanking: 'वेल्लोर में मांग वाले कौशल और भुगतान दर',
    openGigsSuffix: 'सक्रिय कार्य',
    topAreaLabel: 'प्रमुख क्षेत्र:',
    growthLabel: 'वृद्धि:',

    // Feedback Modal
    feedbackTitle: 'अनुभव को रेट करें और समीक्षा दें',
    feedbackSubtitle: 'सामुदायिक विश्वास बढ़ाने और भविष्य के AI मिलान को बेहतर बनाने में मदद करें',
    ratingScoreLabel: 'कुल रेटिंग',
    feedbackTagsLabel: 'क्या अच्छा रहा?',
    commentLabel: 'विस्तृत प्रतिक्रिया / नोट्स',
    commentPlaceholder: 'समय की पाबंदी, कौशल और कार्य गुणवत्ता के बारे में विवरण साझा करें...',
    submitReviewBtn: 'प्रतिक्रिया सबमिट करें',

    // SQLite Console Modal
    sqlConsoleTitle: 'SQLite इन-ब्राउज़र WASM कंसोल',
    sqlConsoleSubtitle: 'स्थानीय ऑफ़लाइन SQLite डेटाबेस पर सीधे क्वेरी निष्पादित करें',
    sqlEngineBadge: 'SQLite 3 इंजन सक्रिय',
    presetQueriesLabel: 'त्वरित SQL प्रीसेट',
    executeBtn: 'क्वेरी निष्पादित करें',
    exportBtn: 'डेटाबेस निर्यात करें',
    resetBtn: 'डेटा रीसेट करें',
    execTime: 'निष्पादन समय',
    rowsReturned: 'पंक्तियाँ प्राप्त हुईं',
    noResults: 'क्वेरी सफलतापूर्वक निष्पादित हुई, कोई पंक्ति वापस नहीं आई।',

    // Footer & Toasts
    footerTagline: 'सही कौशल। सही काम। वास्तविक प्रभाव।',
    footerEngineDesc: 'हाइपर-लोकल गिग डिस्कवरी इंजन — वेल्लोर जिला, तमिलनाडु',
    toastClaimSuccess: '🎉 काम स्वीकार कर लिया गया! नियोक्ता को संपर्क जानकारी भेज दी गई है।',
    toastStatusUpdated: 'स्थिति को अपडेट किया गया:',
    toastJobDeleted: 'काम SQLite से हटा दिया गया।',
    toastJobPosted: '🚀 नया वेल्लोर गिग पोस्ट किया गया और 3 किमी रडार पर लाइव है!',
    toastProfileUpdated: '✅ प्रोफ़ाइल और GPS अपडेट किया गया।',
    toastSkillAdded: 'जोड़ा गया! AI मैच स्कोर की पुनर्गणना की गई।',
    toastReviewSaved: '⭐ रेटिंग सहेजी गई! सामुदायिक विश्वास अपडेट किया गया।'
  },

  te: {
    // App header & Global
    appName: 'Skill2Work (స్కిల్2వర్క్)',
    regionTag: 'వెల్లూరు ప్రాంతం',
    tagline: 'సరైన నైపుణ్యాలు. సరైన పని. నిజమైన ప్రభావం. • వెల్లూరు',
    offlineStatus: 'ఆఫ్‌లైన్ SQLite మోడ్',
    sqlTerminal: 'SQLite కన్సోల్',
    roleSeeker: 'ఉద్యోగ అన్వేషకుడు',
    roleRecruiter: 'నియామకదారుడు',
    switchRole: 'పాత్రను మార్చండి',
    offlineAlert: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. మీ సేవ్ చేయబడిన గిగ్‌లు మరియు ప్రొఫైల్‌లు స్థానికంగా అందుబాటులో ఉన్నాయి.',
    marketDemand: 'మార్కెట్ డిమాండ్',
    notificationsTitle: 'నోటిఫికేషన్‌లు & అలర్ట్‌లు',
    notificationsSubtitle: 'రియల్-టైమ్ గిగ్ అలర్ట్‌లు, మ్యాచ్ సిఫార్సులు మరియు రేటింగ్ అప్‌డేట్‌లు',
    markAllRead: 'అన్నీ చదివినట్లుగా గుర్తించండి',
    noNotifications: 'ప్రస్తుతం నోటిఫికేషన్‌లు లేవు.',
    trends: 'ట్రెండ్స్',
    sqlInspector: 'SQL ఇన్‌స్పెక్టర్',
    splitView: 'స్ప్లిట్ వీక్షణ',
    close: 'మూసివేయి',
    cancel: 'రద్దు చేయి',
    save: 'సేవ్ చేయి',
    delete: 'తొలగించు',
    add: 'జోడించు',
    all: 'అన్నీ',
    search: 'వెతకండి',
    earnings: 'సంపాదన',
    postedDate: 'పోస్ట్ చేసిన తేదీ',
    payRate: 'పారితోషిక రేటు',
    distance: 'దూరం',
    coordinates: 'కోఆర్డినేట్లు',
    gigLocation: 'పని ప్రదేశం',
    postedByRecruiter: 'నియామకదారు వివరాలు',
    viewProfile: 'ప్రొఫైల్ చూడండి',
    manageProfile: 'ప్రొఫైల్ నిర్వహించండి',

    // Login Page
    loginWelcome: 'స్వాగతం',
    loginHeading: 'కొనసాగడానికి సైన్ ఇన్ చేయండి',
    loginSubtitle: 'మీ ఖాతా రకాన్ని ఎంచుకుని మీ వర్క్‌స్పేస్‌ను యాక్సెస్ చేయండి.',
    loginSeekerDesc: 'స్థానిక గిగ్‌లను కనుగొనండి',
    loginRecruiterDesc: 'గిగ్‌ను పోస్ట్ చేయండి',
    loginEmailLabel: 'ఈమెయిల్ లేదా మొబైల్ నంబర్',
    loginEmailPlaceholder: 'you@example.com',
    loginPasswordLabel: 'పాస్‌వర్డ్',
    loginPasswordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    loginRememberMe: 'నన్ను గుర్తుంచుకో',
    loginForgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    loginSignInSeeker: 'ఉద్యోగ అన్వేషకుడిగా సైన్ ఇన్ చేయండి',
    loginSignInRecruiter: 'నియామకదారుడిగా సైన్ ఇన్ చేయండి',
    loginNewPrompt: 'Skill2Work కు కొత్తవారా?',
    loginCreateAccount: 'ఖాతాను సృష్టించండి',
    loginHeroTitle1: 'సరైన నైపుణ్యాలు.',
    loginHeroTitle2: 'సరైన పని.',
    loginHeroTitleHighlight: 'నిజమైన ప్రభావం.',
    loginHeroDesc: 'నమ్మకమైన స్థానిక గిగ్‌లను కనుగొనండి లేదా మీ వ్యాపారానికి అవసరమైన నైపుణ్యం కలిగిన వ్యక్తులను ఒకే చోట పొందండి.',
    loginStatRadar: '3 కి.మీ',
    loginStatRadarSub: 'స్థానిక రాడార్',
    loginStatOpp: '24/7',
    loginStatOppSub: 'అవకాశాలు',
    tabSignIn: 'సైన్ ఇన్',
    tabCreateAccount: 'ఖాతాను సృష్టించండి',
    newUserRegistration: 'కొత్త వినియోగదారు నమోదు',
    joinSkill2Work: 'Skill2Work వెల్లూరులో చేరండి',
    createAccountSubtitle: 'వెల్లూరులో 3కిమీ పరిధిలో స్థానిక ఉద్యోగాలను పొందడానికి లేదా పోస్ట్ చేయడానికి ఖాతాను సృష్టించండి.',
    fullNameLabel: 'పూర్తి పేరు',
    companyNameLabel: 'సంస్థ / వ్యాపార పేరు',
    fullNamePlaceholder: 'ఉదా. కార్తీక్ రాజా',
    companyNamePlaceholder: 'ఉదా. వెల్లూర్ ఫ్రెష్ మార్ట్',
    mobilePhoneLabel: 'మొబైల్ ఫోన్ నంబర్',
    mobilePhonePlaceholder: '+91 98401 23456',
    ageLabel: 'వయస్సు',
    selectVelloreLocation: 'ప్రధాన వెల్లూరు ప్రాంతాన్ని ఎంచుకోండి',
    useGpsBtn: 'GPS ఉపయోగించండి',
    skillsOffered: 'నైపుణ్యాలు & సేవలు',
    availableTimeSlots: 'అందుబాటులో ఉన్న సమయాలు',
    createSeekerAccountBtn: 'ఉద్యోగార్థి ఖాతాను సృష్టించండి (DB సేవ్)',
    createRecruiterAccountBtn: 'నియామకకర్త ఖాతాను సృష్టించండి (DB సేవ్)',
    alreadyRegisteredPrompt: 'ఇప్పటికే నమోదయ్యారా?',
    signInNowBtn: 'ఇప్పుడు సైన్ ఇన్ చేయండి',
    orSignInRegistered: 'లేదా నమోదిత SQLite వినియోగదారుగా సైన్ ఇన్ చేయండి',
    sqliteSavedFeature: 'SQLite WASM డేటాబేస్‌లో తక్షణమే సేవ్ చేయబడింది',
    radar3kmFeature: 'స్థానిక 3కిమీ రాడార్ జాబ్ మ్యాచింగ్',

    // Seeker Tab
    radarHeading: 'లైవ్ గిగ్ రాడార్ (వెల్లూరు)',
    radarSubtitle: 'మీకు దగ్గరలోని పార్ట్-టైమ్ మరియు గిగ్ పనులను కనుగొనండి',
    withinRadius: 'లోపల',
    radiusSlider: 'దూరం ఫిల్టర్',
    allVellore: 'మొత్తం వెల్లూరు',
    matchScore: 'మ్యాచ్',
    claimJobBtn: 'గిగ్‌ను స్వీకరించండి',
    claimedBadge: 'మీరు స్వీకరించారు',
    claimedOtherBadge: 'కేటాయించినది',
    completedBadge: 'పూర్తయ్యింది',
    jobDetailsTitle: 'గిగ్ వివరాలు మరియు సంప్రదింపు',
    directionsBtn: 'మార్గం చూడండి',
    callRecruiterBtn: 'కాల్ చేయండి',
    whatsappRecruiterBtn: 'వాట్సాప్',
    myGigsTab: 'నా గిగ్‌లు',
    allGigsTab: 'స్థానిక గిగ్‌లు',
    mapViewTab: 'మ్యాప్ రాడార్',
    listViewTab: 'జాబితా వీక్షణ',
    profileBtn: 'నా ప్రొఫైల్ & GPS',
    gigsFound: 'గిగ్‌లు దొరికాయి',
    changeLocation: 'మార్చండి',
    sortBy: 'క్రమబద్ధీకరించు:',
    sortMatchScore: '🔥 మ్యాచ్ స్కోర్',
    sortDistance: '⚡ దూరం (దగ్గర)',
    sortHighestPay: '💰 అధిక పారితోషికం',
    payout: 'పారితోషికం',
    proximity: 'దూరం',
    claiming: 'స్వీకరిస్తున్నారు...',
    overall: 'మొత్తం',
    noClaimedGigsTitle: 'ఇంకా గిగ్‌లు స్వీకరించలేదు',
    noClaimedGigsDesc: 'కాట్పాడి, CMC మరియు వెల్లూరులో గంటవారీ పనులను అంగీకరించడానికి 3 కి.మీ లైవ్ రాడార్‌ను ఉపయోగించండి.',
    myClaimedSubtitle: 'మీరు అంగీకరించిన గిగ్‌లను ట్రాక్ చేయండి మరియు రిక్రూటర్‌లను సంప్రదించండి',

    // Profile Modal
    profileTitle: 'యూజర్ ప్రొఫైల్ మరియు లొకేషన్',
    profileDesc: 'మీ 3 కి.మీ మ్యాచ్ స్కోర్‌ను పెంచడానికి నైపుణ్యాలు మరియు సమయాన్ని ఎంచుకోండి',
    fullName: 'పూర్తి పేరు',
    age: 'వయస్సు',
    phoneNumber: 'ఫోన్ నంబర్ (వాట్సాప్‌తో)',
    mySkills: 'నా నైపుణ్యాలు (వర్తించేవన్నీ ఎంచుకోండి)',
    skillsSelected: 'ఎంచుకోబడింది',
    addCustomSkillPlaceholder: 'ఇతర నైపుణ్యాన్ని జోడించండి (ఉదా. ఎలక్ట్రీషియన్, ట్యూషన్)...',
    myAvailability: 'అందుబాటు సమయం',
    myLocation: 'ప్రస్తుత వెల్లూరు లొకేషన్ / GPS',
    useCurrentGps: 'లైవ్ GPS పొందండి',
    locating: 'గుర్తిస్తోంది...',
    selectLandmark: 'వెల్లూరు ల్యాండ్‌మార్క్‌ను ఎంచుకోండి',
    saveProfileBtn: 'ప్రొఫైల్‌ను సేవ్ చేయండి & రాడార్‌ను నవీకరించండి',

    // Skill Gap & AI Recommendations
    skillGapTitle: 'AI నైపుణ్య అంతరం & కెరీర్ సిఫార్సులు',
    skillGapBadge: '+35% మ్యాచ్ స్కోర్ బూస్ట్',
    skillGapDesc: 'టాప్ వెల్లూరు గిగ్‌లలో 90%+ మ్యాచ్ స్కోర్‌ను పొందడానికి ఈ అధిక డిమాండ్ ఉన్న నైపుణ్యాలను జోడించండి.',
    addToMySkills: 'నా నైపుణ్యాలలో జోడించండి',
    neededInGigs: 'అవసరమైన గిగ్‌లు:',
    allStarTitle: 'అద్భుతమైన నైపుణ్య ప్రొఫైల్!',
    allStarDesc: 'మీ ప్రొఫైల్ సమీపంలోని వెల్లూరు గిగ్‌లలో అభ్యర్థించిన 100% నైపుణ్యాలను కలిగి ఉంది.',

    // Recruiter Portal
    recruiterHeading: 'నియామకదారు నిర్వహణ కేంద్రం',
    recruiterSubtitle: 'కాట్పాడి, CMC, VIT మరియు వెల్లూరులో గిగ్‌లను పోస్ట్ చేయండి',
    activeRecruiter: 'యాక్టివ్ రిక్రూటర్',
    postNewGigBtn: 'కొత్త గిగ్‌ను పోస్ట్ చేయండి',
    postedGigsCount: 'పోస్ట్ చేసిన గిగ్‌లు',
    statusOpen: 'స్వీకరణకు సిద్ధంగా ఉంది',
    statusClaimed: 'స్వీకరించబడింది / కేటాయించబడింది',
    statusCompleted: 'పని పూర్తయింది',
    markCompletedBtn: 'పూర్తయినట్లుగా గుర్తించండి',
    deleteGigBtn: 'గిగ్‌ను తొలగించు',
    claimantDetails: 'పనిచేసేవారి వివరాలు',
    noClaimantYet: 'సమీప అన్వేషకుడు స్వీకరించడానికి వేచి ఉంది',
    rateClaimantBtn: 'రేటింగ్ & సమీక్ష ఇవ్వండి',
    callClaimantBtn: 'కాల్ చేయండి',
    whatsappClaimantBtn: 'వాట్సాప్',
    allGigsFilter: 'అన్ని గిగ్‌లు',
    metricTotalGigs: 'మొత్తం గిగ్‌లు',
    metricOpenGigs: 'ఓపెన్ (శోధనలో)',
    metricAssignedGigs: 'కేటాయించినవి',
    metricCompletedGigs: 'పూర్తయినవి',
    noRecruiterGigs: 'మీరు ఇంకా ఎటువంటి గిగ్‌లను పోస్ట్ చేయలేదు. ప్రారంభించడానికి "కొత్త గిగ్‌ను పోస్ట్ చేయండి" క్లిక్ చేయండి!',

    // Post Gig Form
    postModalTitle: 'స్థానిక గిగ్‌ను పోస్ట్ చేయండి (వెల్లూరు)',
    postModalSubtitle: '3 కి.మీ రాడార్‌లో తక్షణమే కనిపించేలా వెల్లూరు స్థానిక గిగ్‌ను పోస్ట్ చేయండి',
    jobTitleLabel: 'ఉద్యోగ పేరు',
    jobTitlePlaceholder: 'ఉదా. డెలివరీ సహాయకుడు, స్టోర్ బిల్లింగ్, ఈవెంట్ సహాయం',
    categoryLabel: 'వర్గం',
    descriptionLabel: 'వివరణ మరియు సూచనలు',
    descriptionPlaceholder: 'చేయవలసిన పని, సమయాలు మరియు రిపోర్టింగ్ పాయింట్‌ను వివరించండి...',
    payoutLabel: 'పారితోషికం మొత్తం (₹)',
    payoutUnitLabel: 'పారితోషికం రకం',
    perHour: 'గంటకు',
    perTask: 'పనికి',
    perShift: 'షిఫ్ట్‌కు',
    perDay: 'రోజుకు',
    requiredSkillsLabel: 'అవసరమైన నైపుణ్యాలు',
    landmarkAreaLabel: 'వెల్లూరు ప్రాంతం / ప్రదేశం',
    clickMapInstruction: 'సరైన స్థానాన్ని ఎంచుకోవడానికి మ్యాప్‌పై క్లిక్ చేయండి లేదా ఎంచుకోండి',
    publishJobBtn: 'గిగ్‌ను ప్రచురించండి (SQLite)',

    // Categories
    catDelivery: 'డెలివరీ మరియు రవాణా',
    catStoreHelper: 'స్టోర్ సహాయకుడు & రిటైల్',
    catDataEntry: 'డేటా ఎంట్రీ & కార్యాలయం',
    catEventHand: 'ఈవెంట్ మరియు క్యాటరింగ్ సహాయం',
    catTutoring: 'ట్యూషన్ & మద్దతు',
    catElectrical: 'సాంకేతిక & నిర్వహణ',

    // Filter & Search
    searchPlaceholder: 'పని, నైపుణ్యం లేదా వెల్లూరు స్థలాన్ని వెతకండి...',
    categoryFilter: 'వర్గం',
    allCategories: 'అన్ని వర్గాలు',
    minPayFilter: 'కనీస పారితోషికం (₹)',
    noJobsFound: 'ఎంచుకున్న దూరంలో పనులు లేవు. రాడార్ దూరాన్ని పెంచండి!',

    // Match breakdown
    breakdownTitle: 'మ్యాచ్ స్కోర్ వివరాలు',
    skillFit: 'నైపుణ్య సరిపోలిక',
    distanceFit: 'దూర సరిపోలిక',
    scheduleFit: 'సమయ సరిపోలిక',
    matchedSkillsLabel: 'సరిపోలిన నైపుణ్యాలు',
    missingSkillsLabel: 'లేని నైపుణ్యాలు',

    // Community Demand Modal
    demandModalTitle: 'కమ్యూనిటీ డిమాండ్ & స్కిల్ ట్రెండ్స్',
    demandModalSubtitle: 'కాట్పాడి, CMC, VIT మరియు సతువాచారిలో ప్రత్యక్ష డిమాండ్ విశ్లేషణ',
    demandRegionBadge: 'వెల్లూరు జిల్లా రియల్-టైమ్ AI రాడార్',
    topInDemandRole: 'అత్యధిక డిమాండ్ ఉన్న పని',
    avgHourlyPayout: 'సగటు గంట పారితోషికం',
    peakHiringWindows: 'గరిష్ట నియామక సమయాలు',
    hourlyPaySub: 'అదే రోజున తక్షణ పారితోషికం',
    peakHiringSub: 'సౌకర్యవంతమైన పార్ట్-టైమ్ షిఫ్టులు',
    skillDemandRanking: 'వెల్లూరులో డిమాండ్ ఉన్న నైపుణ్యాలు & వేతనం',
    openGigsSuffix: 'యాక్టివ్ గిగ్‌లు',
    topAreaLabel: 'ప్రధాన ప్రాంతం:',
    growthLabel: 'వృద్ధి:',

    // Feedback Modal
    feedbackTitle: 'అనుభవాన్ని రేట్ చేయండి మరియు సమీక్షించండి',
    feedbackSubtitle: 'కమ్యూనిటీ నమ్మకాన్ని పెంచడానికి మరియు భవిష్యత్ AI మ్యాచ్‌ను మెరుగుపరచడానికి సహాయపడండి',
    ratingScoreLabel: 'మొత్తం రేటింగ్',
    feedbackTagsLabel: 'ఏది బాగుంది?',
    commentLabel: 'వివరణాత్మక అభిప్రాయం',
    commentPlaceholder: 'సమయపాలన, నైపుణ్యం మరియు పని నాణ్యత గురించిన వివరాలను పంచుకోండి...',
    submitReviewBtn: 'ఫీడ్‌బ్యాక్ సమర్పించండి',

    // SQLite Console Modal
    sqlConsoleTitle: 'SQLite బ్రౌజర్ WASM కన్సోల్',
    sqlConsoleSubtitle: 'స్థానిక ఆఫ్‌లైన్ SQLite డేటాబేస్‌లో క్వెరీలను అమలు చేయండి',
    sqlEngineBadge: 'SQLite 3 ఇంజిన్ యాక్టివ్‌గా ఉంది',
    presetQueriesLabel: 'త్వరిత SQL ప్రీసెట్‌లు',
    executeBtn: 'క్వెరీని అమలు చేయండి',
    exportBtn: 'డేటాబేస్‌ను డౌన్‌లోడ్ చేయండి',
    resetBtn: 'డేటాను రీసెట్ చేయండి',
    execTime: 'అమలు సమయం',
    rowsReturned: 'వరుసలు వచ్చాయి',
    noResults: 'క్వెరీ విజయవంతంగా అమలు చేయబడింది, ఫలితాలు లేవు.',

    // Footer & Toasts
    footerTagline: 'సరైన నైపుణ్యాలు. సరైన పని. నిజమైన ప్రభావం.',
    footerEngineDesc: 'హైపర్-లోకల్ గిగ్ డిస్కవరీ ఇంజిన్ — వెల్లూరు జిల్లా, తమిళనాడు',
    toastClaimSuccess: '🎉 పని స్వీకరించబడింది! రిక్రూటర్‌కు సంప్రదింపు సమాచారం పంపబడింది.',
    toastStatusUpdated: 'స్థితి నవీకరించబడింది:',
    toastJobDeleted: 'గిగ్ SQLite నుండి తొలగించబడింది.',
    toastJobPosted: '🚀 కొత్త వెల్లూరు గిగ్ పోస్ట్ చేయబడింది మరియు 3 కి.మీ రాడార్‌లో ప్రత్యక్షంగా ఉంది!',
    toastProfileUpdated: '✅ ప్రొఫైల్ మరియు GPS నవీకరించబడ్డాయి.',
    toastSkillAdded: 'జోడించబడింది! AI మ్యాచ్ స్కోర్ తిరిగి లెక్కించబడింది.',
    toastReviewSaved: '⭐ రేటింగ్ సేవ్ చేయబడింది! కమ్యూనిటీ నమ్మకం నవీకరించబడింది.'
  }
};

// Comprehensive dynamic translation dictionaries for content across languages
const CONTENT_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {},
  ta: {
    // Skills
    'Driving': 'ஓட்டுதல்',
    'Tamil Speaking': 'தமிழ் பேசுதல்',
    'English Speaking': 'ஆங்கிலம் பேசுதல்',
    'Hindi Speaking': 'ஹிந்தி பேசுதல்',
    'Telugu Speaking': 'தெலுங்கு பேசுதல்',
    'Basic Accounts': 'அடிப்படை கணக்குகள்',
    'Inventory': 'சரக்கு மேலாண்மை',
    'Data Entry': 'தரவு உள்ளீடு',
    'Computer Basics': 'அடிப்படை கணினி',
    'Delivery': 'டெலிவரி',
    'Smartphone Proficient': 'ஸ்மார்ட்போன் பயன்பாடு',
    'Physically Active': 'உடல் தகுதி',
    'Customer Service': 'வாடிக்கையாளர் சேவை',
    'Event Setup': 'நிகழ்வு அமைப்பு',
    'Cooking / Catering': 'சமையல் / கேட்டரிங்',
    'Electrician Basics': 'மின்சார பணி',
    'Retail Management': 'சில்லறை மேலாண்மை',
    'Logistics': 'லாஜிஸ்டிக்ஸ்',
    'Healthcare Ops': 'சுகாதார பணிகள்',

    // Categories & Custom Job Titles
    'Store Helper': 'கடை உதவியாளர்',
    'Store': 'கடை',
    'Plumbing': 'பிளம்பிங்',
    'Plumber': 'பிளம்பர்',
    'Electrician': 'மின்சார பணியாளர்',
    'Event Hand': 'நிகழ்வு உதவி',
    'Tutoring': 'பயிற்றுவிப்பு',
    'Electrical': 'மின்சார பணி',
    'Cleaning': 'சுத்தம் செய்தல்',
    'Housekeeping': 'வீட்டுப் பராமரிப்பு',
    'HOUSEKEEPING': 'வீட்டுப் பராமரிப்பு',
    'Cleaning & Housekeeping': 'சுத்தம் செய்தல் & பராமரிப்பு',
    'needed': 'தேவைப்படுகிறது',
    'Need plumber': 'பிளம்பர் தேவைப்படுகிறது',
    'Need electrician': 'மின்சார பணியாளர் தேவைப்படுகிறது',
    'Store Helper Needed': 'கடை உதவியாளர் தேவைப்படுகிறது',
    'Plumbing Helper Needed': 'பிளம்பிங் உதவியாளர் தேவைப்படுகிறது',
    'Delivery Helper Needed': 'டெலிவரி உதவியாளர் தேவைப்படுகிறது',
    'Electrician Helper Needed': 'மின்சார உதவியாளர் தேவைப்படுகிறது',
    'Housekeeping Helper Needed': 'வீட்டுப் பராமரிப்பு உதவியாளர் தேவைப்படுகிறது',
    'Event Hand Needed': 'நிகழ்வு உதவியாளர் தேவைப்படுகிறது',
    'Tutoring Needed': 'ஆசிரியர் தேவைப்படுகிறது',
    'Catering Helper Needed': 'கேட்டரிங் உதவியாளர் தேவைப்படுகிறது',
    'Security Guard Needed': 'பாதுகாப்பு காவலர் தேவைப்படுகிறது',

    // Full Card Titles & Descriptions
    'Fresh Vegetables Sorter & Early Morning Packer': 'புதிய காய்கறி வரிசைப்படுத்துபவர் & அதிகாலை பேக்கர்',
    'Cultural Exhibition & Handloom Stall Assistant': 'கலாச்சார கண்காட்சி & கைத்தறி அரங்கு உதவியாளர்',
    'Sort, weigh, and pack early morning wholesale vegetables from Thottapalayam Mandi for retail delivery.': 'தோட்டப்பாளையம் மண்டியில் இருந்து சில்லறை விற்பனைக்கான புதிய காய்கறிகளை வரிசைப்படுத்தி, எடையும் பேக்கிங்கும் செய்ய வேண்டும்.',
    'Assist in managing customer flow, distributing pamphlets, and product display at the Vellore Fort ground handloom expo.': 'வேலூர் கோட்டை மைதான கைத்தறி கண்காட்சியில் வாடிக்கையாளர்களை நிர்வகித்தல், துண்டுப் பிரசுரங்கள் விநியோகம் செய்தல் மற்றும் பொருட்களைக் காட்சிப்படுத்துதல்.',
    'Looking for a reliable Housekeeping helper in Vellore for local shift/task work.': 'வேலூரில் உள்ளூர் ஷிஃப்ட்/பணிக்கு நம்பகமான வீட்டுப் பராமரிப்பு உதவியாளர் தேவை.',
    'Thottapalayam Vegetable Market': 'தோட்டப்பாளையம் காய்கறி சந்தை',
    'Vellore Fort Grounds, Officers Line': 'வேலூர் கோட்டை மைதானம், அதிகாரிகள் சாலை',
    'Vellore Fort Grounds': 'வேலூர் கோட்டை மைதானம்',
    'Officers Line': 'அதிகாரிகள் சாலை',
    'Thottapalayam Mandi': 'தோட்டப்பாளையம் மண்டி',
    'Thottapalayam': 'தோட்டப்பாளையம்',
    'Mandi': 'மண்டி',
    'Fresh': 'புதிய',
    'Vegetables': 'காய்கறிகள்',
    'Sorter': 'வரிசைப்படுத்துபவர்',
    'Early': 'அதிகாலை',
    'Packer': 'பேக்கர்',
    'Cultural': 'கலாச்சார',
    'Exhibition': 'கண்காட்சி',
    'Handloom': 'கைத்தறி',
    'Stall': 'அரங்கு',

    // Time Slots
    'Morning': 'காலை',
    'Afternoon': 'மதியம்',
    'Evening': 'மாலை',
    'Night': 'இரவு',
    'Weekend': 'வார இறுதி',
    'Immediate': 'உடனடி',

    // Payout units
    'hour': 'மணி',
    'task': 'பணி',
    'shift': 'ஷிஃப்ட்',
    'day': 'நாள்',

    // Landmarks
    'Katpadi, near VIT Main Gate': 'விஐடி முதன்மை வாயில் அருகில், காட்பாடி',
    'Gandhi Nagar Main Road, Katpadi': 'காந்தி நகர் மெயின் ரோடு, காட்பாடி',
    'CMC Hospital, Ida Scudder Rd': 'சிஎம்சி மருத்துவமனை, ஐடா ஸ்கடர் சாலை',
    'Sathuvachari Phase 1, Vellore': 'சத்துவாச்சாரி பகுதி 1, வேலூர்',
    'Katpadi Railway Junction': 'காட்பாடி ரயில் நிலையம்',
    'VIT Main Gate, Katpadi': 'விஐடி முதன்மை வாயில், காட்பாடி',
    'CMC Hospital, Ida Scudder Road': 'சிஎம்சி மருத்துவமனை, ஐடா ஸ்கடர் சாலை',
    'Bagayam CMC Campus': 'பாகாயம் சிஎம்சி வளாகம்',
    'Vellore Fort Main Gate': 'வேலூர் கோட்டை முதன்மை வாயில்',
    'Sathuvachari Phase 1': 'சத்துவாச்சாரி பகுதி 1',
    'Thorapadi Junction': 'தோரப்பாடி சந்திப்பு',
    'Old Bus Stand, Vellore Central': 'பழைய பேருந்து நிலையம், வேலூர் மத்திய பகுதி',
    'New Bus Stand, Katpadi Road': 'புதிய பேருந்து நிலையம், காட்பாடி சாலை',
    'Sripuram Golden Temple Road': 'ஸ்ரீபுரம் பொற்கோயில் சாலை',
    'Katpadi Junction': 'காட்பாடி சந்திப்பு',
    'Katpadi': 'காட்பாடி',
    'Vellore Central': 'வேலூர் மையம்',

    // Initial Job Titles
    'Instant Delivery Rider (Campus & Station Area)': 'கேம்பஸ் மற்றும் ரயில்வே பகுதி உடனடி டெலிவரி ரைடர்',
    'Supermarket Inventory & Evening Billing Hand': 'சூப்பர் மார்க்கெட் சரக்கு & மாலை நேர பில்லிங் உதவி',
    'Hospital OPD Patient Guide & Queue Coordinator': 'மருத்துவமனை புறநோயாளி வழிகாட்டி & வரிசை ஒருங்கிணைப்பாளர்',
    'Medical Invoice & Inventory Data Entry': 'மருத்துவ ரசீது & சரக்கு தரவு உள்ளீடு',
    'Evening Parcel Sorter & Load Dispatcher': 'மாலை பார்சல் வரிசைப்படுத்துபவர் & ஏற்று அனுப்புபவர்',
    'College Fest Sound & Stage Setup Assistant': 'கல்லூரி விழா ஒலி மற்றும் மேடை அமைப்பு உதவியாளர்',
    'Primary School Math & English Evening Tutor': 'தொடக்கப் பள்ளி கணிதம் மற்றும் ஆங்கில மாலை நேர ஆசிரியர்',
    'Emergency Hostel Air Cooler & Wiring Hand': 'அவசர விடுதி ஏர் கூலர் & வயரிங் உதவி',

    // Initial Job Descriptions
    'Deliver food and urgent parcel packages from Katpadi Junction restaurants to student residences near VIT Main Gate and Chittoor bus stop. Two-wheeler preferred.': 'காட்பாடி சந்திப்பு உணவகங்களிலிருந்து விஐடி மெயின் கேட் மற்றும் சித்தூர் பேருந்து நிறுத்தம் அருகிலுள்ள மாணவர் குடியிருப்புகளுக்கு உணவு மற்றும் அவசர பார்சல்களை டெலிவரி செய்ய வேண்டும். இருசக்கர வாகனம் விரும்பத்தக்கது.',
    'Assist in barcode scanning, evening shelf restocking, and counter packing during rush hours at our Gandhi Nagar main branch.': 'எங்கள் காந்தி நகர் கிளையில் நெரிசலான மாலை நேரங்களில் பார்கோடு ஸ்கேனிங், அலமாரி அடுக்குதல் மற்றும் பேக்கிங் பணிகளில் உதவ வேண்டும்.',
    'Guide outstation patients arriving at CMC Vellore Ida Scudder gate to diagnostic labs and appointment counters. Trilingual ability (Tamil/Hindi/English) is a huge bonus.': 'சிஎம்சி வேலூர் ஐடா ஸ்கடர் வாயிலுக்கு வரும் வெளிமாநில நோயாளிகளை ஆய்வகங்கள் மற்றும் முன்பதிவு கவுண்டர்களுக்கு வழிகாட்ட வேண்டும். தமிழ்/ஹிந்தி/ஆங்கிலம் தெரிந்திருப்பது கூடுதல் நன்மை.',
    'Enter supplier bills into local store ERP software. Work from our air-conditioned office in Sathuvachari Phase 1 near Collectorate.': 'வழங்குநர் பில்களை உள்ளூர் ஈஆர்பி மென்பொருளில் உள்ளிட வேண்டும். ஆட்சியர் அலுவலகம் அருகிலுள்ள சத்துவாச்சாரி அலுவலகத்தில் பணி.',
    'Sort inbound courier boxes from Chennai/Bengaluru trains at Katpadi Railway Parcel Office platform 1 siding.': 'சென்னை/பெங்களூரு ரயில்களில் இருந்து வரும் பார்சல்களை காட்பாடி ரயில் நிலைய பார்சல் அலுவலகத்தில் வரிசைப்படுத்த வேண்டும்.',

    // Feedback tags
    'Punctual': 'நேரம் தவறாமை',
    'Skilled Worker': 'திறமையான பணியாளர்',
    'Friendly & Polite': 'நட்பான மற்றும் கண்ணியமான',
    'Fast Execution': 'வேகமான செயல்பாடு',
    'Clean & Organized': 'சுத்தமான மற்றும் ஒழுங்கான',
    'Followed Instructions': 'வழிகாட்டுதல்களைப் பின்பற்றியவர்',
    'Prompt Payout': 'உடனடி ஊதியம்',
    'Clear Instructions': 'தெளிவான வழிகாட்டுதல்கள்',
    'Supportive Work Environment': 'ஆதரவான பணிச்சூழல்',
    'Professional': 'தொழில்முறை அணுகுமுறை',
    'Accurate Description': 'துல்லியமான விளக்கம்',
    'Great Experience': 'சிறந்த அனுபவம்'
  },

  hi: {
    // Skills
    'Driving': 'ड्राइविंग',
    'Tamil Speaking': 'तमिल बोलना',
    'English Speaking': 'अंग्रेज़ी बोलना',
    'Hindi Speaking': 'हिन्दी बोलना',
    'Telugu Speaking': 'तेलुगू बोलना',
    'Basic Accounts': 'बुनियादी लेखा',
    'Inventory': 'स्टॉक प्रबंधन',
    'Data Entry': 'डेटा एंट्री',
    'Computer Basics': 'कंप्यूटर बेसिक',
    'Delivery': 'डिलीवरी',
    'Smartphone Proficient': 'स्मार्टफोन में निपुण',
    'Physically Active': 'शारीरिक रूप से सक्रिय',
    'Customer Service': 'ग्राहक सेवा',
    'Event Setup': 'इवेंट सेटअप',
    'Cooking / Catering': 'खाना बनाना / कैटरिंग',
    'Electrician Basics': 'इलेक्ट्रीशियन कार्य',
    'Retail Management': 'रिटेल प्रबंधन',
    'Logistics': 'लॉजिस्टिक्स',
    'Healthcare Ops': 'स्वास्थ्य सेवा कार्य',

    // Categories & Custom Job Titles
    'Store Helper': 'दुकान सहायक',
    'Store': 'दुकान',
    'Plumbing': 'प्लंबिंग',
    'Plumber': 'प्लंबर',
    'Electrician': 'इलेक्ट्रीशियन',
    'Event Hand': 'इवेंट सहायता',
    'Tutoring': 'ट्यूशन',
    'Electrical': 'इलेक्ट्रिकल',
    'Cleaning': 'सफाई',
    'Housekeeping': 'हाउसकीपिंग',
    'HOUSEKEEPING': 'हाउसकीपिंग',
    'Cleaning & Housekeeping': 'सफाई और हाउसकीपिंग',
    'needed': 'की आवश्यकता है',
    'Need plumber': 'प्लंबर की आवश्यकता है',
    'Need electrician': 'इलेक्ट्रीशियन की आवश्यकता है',
    'Store Helper Needed': 'दुकान सहायक की आवश्यकता है',
    'Plumbing Helper Needed': 'प्लंबिंग सहायक की आवश्यकता है',
    'Delivery Helper Needed': 'डिलीवरी सहायक की आवश्यकता है',
    'Electrician Helper Needed': 'इलेक्ट्रिशियन सहायक की आवश्यकता है',
    'Housekeeping Helper Needed': 'हाउसकीपिंग सहायक की आवश्यकता है',
    'Event Hand Needed': 'इवेंट सहायक की आवश्यकता है',
    'Tutoring Needed': 'ट्यूटर की आवश्यकता है',
    'Catering Helper Needed': 'कैटरिंग सहायक की आवश्यकता है',
    'Security Guard Needed': 'सुरक्षा गार्ड की आवश्यकता है',

    // Full Card Titles & Descriptions
    'Fresh Vegetables Sorter & Early Morning Packer': 'ताज़ी सब्जी छांटने वाला और सुबह का पैकर',
    'Cultural Exhibition & Handloom Stall Assistant': 'सांस्कृतिक प्रदर्शनी और हथकरघा स्टॉल सहायक',
    'Sort, weigh, and pack early morning wholesale vegetables from Thottapalayam Mandi for retail delivery.': 'थोट्टापलायम मंडी से खुदरा बिक्री के लिए ताजी सब्जियों की छंटाई, वजन और पैकिंग करें।',
    'Assist in managing customer flow, distributing pamphlets, and product display at the Vellore Fort ground handloom expo.': 'वेल्लोर किला मैदान हथकरघा प्रदर्शनी में ग्राहकों को प्रबंधित करने और उत्पाद प्रदर्शन में सहायता करें।',
    'Looking for a reliable Housekeeping helper in Vellore for local shift/task work.': 'वेल्लोर में स्थानीय शिफ्ट/कार्य के लिए विश्वसनीय हाउसकीपिंग सहायक की आवश्यकता है।',
    'Thottapalayam Vegetable Market': 'थोट्टापलायम सब्जी मंडी',
    'Vellore Fort Grounds, Officers Line': 'वेल्लोर किला मैदान, ऑफिसर्स लाइन',
    'Vellore Fort Grounds': 'वेल्लोर किला मैदान',
    'Officers Line': 'ऑफिसर्स लाइन',
    'Thottapalayam Mandi': 'थोट्टापलायम मंडी',
    'Thottapalayam': 'थोट्टापलायम',
    'Mandi': 'मंडी',
    'Fresh': 'ताज़ी',
    'Vegetables': 'सब्जियां',
    'Sorter': 'छंटाई करने वाला',
    'Early': 'सुबह',
    'Packer': 'पैकर',
    'Cultural': 'सांस्कृतिक',
    'Exhibition': 'प्रदर्शनी',
    'Handloom': 'हथकरघा',
    'Stall': 'स्टॉल',

    // Time Slots
    'Morning': 'सुबह',
    'Afternoon': 'दोपहर',
    'Evening': 'शाम',
    'Night': 'रात',
    'Weekend': 'सप्ताहांत',
    'Immediate': 'तत्काल',

    // Payout units
    'hour': 'घंटा',
    'task': 'कार्य',
    'shift': 'शिफ्ट',
    'day': 'दिन',

    // Landmarks
    'Katpadi, near VIT Main Gate': 'वीआईटी मुख्य गेट के पास, काटपाडी',
    'Gandhi Nagar Main Road, Katpadi': 'गांधी नगर मेन रोड, काटपाडी',
    'CMC Hospital, Ida Scudder Rd': 'सीएमसी अस्पताल, इडा स्कडर रोड',
    'Sathuvachari Phase 1, Vellore': 'सतुवाचारी फेज़ 1, वेल्लोर',
    'Katpadi Railway Junction': 'काटपाडी रेलवे जंक्शन',
    'VIT Main Gate, Katpadi': 'वीआईटी मेन गेट, काटपाडी',
    'CMC Hospital, Ida Scudder Road': 'सीएमसी अस्पताल, इडा स्कडर रोड',
    'Bagayam CMC Campus': 'बागायम सीएमसी परिसर',
    'Vellore Fort Main Gate': 'वेल्लोर किला मेन गेट',
    'Sathuvachari Phase 1': 'सतुवाचारी फेज़ 1',
    'Thorapadi Junction': 'थोरपाडी जंक्शन',
    'Old Bus Stand, Vellore Central': 'पुराना बस स्टैंड, वेल्लोर सेंट्रल',
    'New Bus Stand, Katpadi Road': 'नया बस स्टैंड, काटपाडी रोड',
    'Sripuram Golden Temple Road': 'श्रीपुरम स्वर्ण मंदिर रोड',
    'Katpadi Junction': 'काटपाडी जंक्शन',
    'Katpadi': 'काटपाडी',
    'Vellore Central': 'वेल्लोर सेंट्रल',

    // Initial Job Titles
    'Instant Delivery Rider (Campus & Station Area)': 'कैंपस और स्टेशन क्षेत्र के लिए तत्काल डिलीवरी राइडर',
    'Supermarket Inventory & Evening Billing Hand': 'सुपरमार्केट स्टॉक और शाम बिलिंग सहायक',
    'Hospital OPD Patient Guide & Queue Coordinator': 'अस्पताल ओपीडी रोगी गाइड और कतार समन्वयक',
    'Medical Invoice & Inventory Data Entry': 'मेडिकल बिल और स्टॉक डेटा एंट्री',
    'Evening Parcel Sorter & Load Dispatcher': 'शाम पार्सल छंटाई और डिस्पैचर',
    'College Fest Sound & Stage Setup Assistant': 'कॉलेज फेस्ट साउंड और स्टेज सेटअप सहायक',
    'Primary School Math & English Evening Tutor': 'प्राथमिक विद्यालय गणित और अंग्रेजी शाम ट्यूटर',
    'Emergency Hostel Air Cooler & Wiring Hand': 'हॉस्टल एयर कूलर और वायरिंग सहायक',

    // Initial Job Descriptions
    'Deliver food and urgent parcel packages from Katpadi Junction restaurants to student residences near VIT Main Gate and Chittoor bus stop. Two-wheeler preferred.': 'काटपाडी जंक्शन के रेस्तरां से वीआईटी मेन गेट और चित्तूर बस स्टॉप के पास छात्र आवासों में भोजन और पार्सल पहुंचाएं।',
    'Assist in barcode scanning, evening shelf restocking, and counter packing during rush hours at our Gandhi Nagar main branch.': 'गांधी नगर मुख्य शाखा में भीड़ के समय बारकोड स्कैनिंग, शेल्फ रीस्टॉकिंग और पैकिंग में सहायता करें।',
    'Guide outstation patients arriving at CMC Vellore Ida Scudder gate to diagnostic labs and appointment counters. Trilingual ability (Tamil/Hindi/English) is a huge bonus.': 'सीएमसी वेल्लोर आने वाले मरीजों को लैब और काउंटर तक मार्गदर्शन करें। तमिल/हिंदी/अंग्रेजी का ज्ञान बड़ा लाभ है।',
    'Enter supplier bills into local store ERP software. Work from our air-conditioned office in Sathuvachari Phase 1 near Collectorate.': 'सतुवाचारी फेज़ 1 स्थित कार्यालय से स्थानीय स्टोर ईआरपी सॉफ्टवेयर में बिल प्रविष्ट करें।',
    'Sort inbound courier boxes from Chennai/Bengaluru trains at Katpadi Railway Parcel Office platform 1 siding.': 'काटपाडी रेलवे पार्सल कार्यालय में चेन्नई/बेंगलुरु ट्रेनों से आने वाले कूरियर बक्से छांटें।',

    // Feedback tags
    'Punctual': 'समयनिष्ठ',
    'Skilled Worker': 'कुशल कार्यकर्ता',
    'Friendly & Polite': 'विनम्र और मिलनसार',
    'Fast Execution': 'तेज़ काम',
    'Clean & Organized': 'साफ और व्यवस्थित',
    'Followed Instructions': 'निर्देशों का पालन किया',
    'Prompt Payout': 'त्वरित भुगतान',
    'Clear Instructions': 'स्पष्ट निर्देश',
    'Supportive Work Environment': 'सहायक कार्य वातावरण',
    'Professional': 'पेशेवर',
    'Accurate Description': 'सटीक विवरण',
    'Great Experience': 'शानदार अनुभव'
  },

  te: {
    // Skills
    'Driving': 'డ్రైవింగ్',
    'Tamil Speaking': 'తమిళం మాట్లాడటం',
    'English Speaking': 'ఆంగ్లం మాట్లాడటం',
    'Hindi Speaking': 'హిందీ మాట్లాడటం',
    'Telugu Speaking': 'తెలుగు మాట్లాడటం',
    'Basic Accounts': 'ప్రాథమిక లెక్కలు',
    'Inventory': 'స్టాక్ నిర్వహణ',
    'Data Entry': 'డేటా ఎంట్రీ',
    'Computer Basics': 'కంప్యూటర్ బేసిక్స్',
    'Delivery': 'డెలివరీ',
    'Smartphone Proficient': 'స్మార్ట్‌ఫోన్ నైపుణ్యం',
    'Physically Active': 'శారీరకంగా చురుకైన',
    'Customer Service': 'కస్టమర్ సర్వీస్',
    'Event Setup': 'ఈవెంట్ సెటప్',
    'Cooking / Catering': 'వంట / క్యాటరింగ్',
    'Electrician Basics': 'ఎలక్ట్రీషియన్ బేసిక్స్',
    'Retail Management': 'రిటైల్ నిర్వహణ',
    'Logistics': 'లాజిస్టిక్స్',
    'Healthcare Ops': 'హెల్త్‌కేర్ పనులు',

    // Categories
    'Store Helper': 'షాప్ సహాయకుడు',
    'Event Hand': 'ఈవెంట్ సహాయకుడు',
    'Tutoring': 'ట్యూషన్',
    'Electrical': 'ఎలక్ట్రికల్',
    'Cleaning': 'శుభ్రపరచడం',

    // Time Slots
    'Morning': 'ఉదయం',
    'Afternoon': 'మధ్యాహ్నం',
    'Evening': 'సాయంత్రం',
    'Night': 'రాత్రి',
    'Weekend': 'వారాంతం',
    'Immediate': 'తక్షణమే',

    // Payout units
    'hour': 'గంట',
    'task': 'పని',
    'shift': 'షిఫ్ట్',
    'day': 'రోజు',

    // Landmarks
    'Katpadi, near VIT Main Gate': 'VIT ప్రధాన ద్వారం సమీపంలోని కాట్పాడి',
    'Gandhi Nagar Main Road, Katpadi': 'గాంధీ నగర్ మెయిన్ రోడ్, కాట్పాడి',
    'CMC Hospital, Ida Scudder Rd': 'CMC ఆసుపత్రి, ఇడా స్కడర్ రోడ్',
    'Sathuvachari Phase 1, Vellore': 'సతువాచారి ఫేజ్ 1, వెల్లూరు',
    'Katpadi Railway Junction': 'కాట్పాడి రైల్వే జంక్షన్',
    'VIT Main Gate, Katpadi': 'VIT ప్రధాన ద్వారం, కాట్పాడి',
    'CMC Hospital, Ida Scudder Road': 'CMC ఆసుపత్రి, ఇడా స్కడర్ రోడ్',
    'Bagayam CMC Campus': 'బగాయం CMC క్యాంపస్',
    'Vellore Fort Main Gate': 'వెల్లూరు కోట ప్రధాన ద్వారం',
    'Sathuvachari Phase 1': 'సతువాచారి ఫేజ్ 1',
    'Thorapadi Junction': 'తోరపాడి జంక్షన్',
    'Old Bus Stand, Vellore Central': 'పాత బస్టాండ్, వెల్లూరు సెంట్రల్',
    'New Bus Stand, Katpadi Road': 'కొత్త బస్టాండ్, కాట్పాడి రోడ్',
    'Sripuram Golden Temple Road': 'శ్రీపురం గోల్డెన్ టెంపుల్ రోడ్',
    'Katpadi Junction': 'కాట్పాడి జంక్షన్',
    'Katpadi': 'కాట్పాడి',
    'Vellore Central': 'వెల్లూరు సెంట్రల్',

    // Initial Job Titles
    'Instant Delivery Rider (Campus & Station Area)': 'తక్షణ డెలివరీ రైడర్ (క్యాంపస్ మరియు స్టేషన్ ప్రాంతం)',
    'Supermarket Inventory & Evening Billing Hand': 'సూపర్‌మార్కెట్ స్టాక్ మరియు సాయంత్రం బిల్లింగ్ సహాయకుడు',
    'Hospital OPD Patient Guide & Queue Coordinator': 'హాస్పిటల్ రోగి గైడ్ & క్యూ కోఆర్డినేటర్',
    'Medical Invoice & Inventory Data Entry': 'మెడికల్ బిల్లులు & ఇన్వెంటరీ డేటా ఎంట్రీ',
    'Evening Parcel Sorter & Load Dispatcher': 'సాయంత్రం పార్సెల్ విభజన మరియు లోడ్ డిస్పాచర్',
    'College Fest Sound & Stage Setup Assistant': 'కాలేజ్ ఫెస్ట్ సౌండ్ మరియు స్టేజ్ సెటప్ అసిస్టెంట్',
    'Primary School Math & English Evening Tutor': 'ప్రైమరీ స్కూల్ మ్యాథ్స్ మరియు ఇంగ్లీష్ ఈవెనింగ్ ట్యూటర్',
    'Emergency Hostel Air Cooler & Wiring Hand': 'హాస్టల్ ఎయిర్ కూలర్ & వైరింగ్ హెల్పర్',

    // Initial Job Descriptions
    'Deliver food and urgent parcel packages from Katpadi Junction restaurants to student residences near VIT Main Gate and Chittoor bus stop. Two-wheeler preferred.': 'కాట్పాడి జంక్షన్ రెస్టారెంట్ల నుండి VIT మెయిన్ గేట్ సమీపంలోని విద్యార్థుల నివాసాలకు ఆహారం మరియు పార్సెల్లను చేరవేయాలి.',
    'Assist in barcode scanning, evening shelf restocking, and counter packing during rush hours at our Gandhi Nagar main branch.': 'మా గాంధీనగర్ ప్రధాన శాఖలో బార్‌కోడ్ స్కానింగ్, షెల్ఫ్ రీస్టాకింగ్ మరియు ప్యాకింగ్ పనులలో సహాయం చేయండి.',
    'Guide outstation patients arriving at CMC Vellore Ida Scudder gate to diagnostic labs and appointment counters. Trilingual ability (Tamil/Hindi/English) is a huge bonus.': 'CMC వెల్లూరుకు వచ్చే రోగులకు ల్యాబ్‌లు మరియు కౌంటర్లకు మార్గదర్శకత్వం చేయండి.',
    'Enter supplier bills into local store ERP software. Work from our air-conditioned office in Sathuvachari Phase 1 near Collectorate.': 'సతువాచారి కార్యాలయం నుండి స్టోర్ ERP సాఫ్ట్‌వేర్‌లో బిల్లులను నమోదు చేయండి.',
    'Sort inbound courier boxes from Chennai/Bengaluru trains at Katpadi Railway Parcel Office platform 1 siding.': 'కాట్పాడి రైల్వే పార్సెల్ కార్యాలయంలో చెన్నై/బెంగళూరు రైళ్ల నుండి వచ్చే పార్సెల్‌లను క్రమబద్ధీకరించండి.',

    // Feedback tags
    'Punctual': 'సమయపాలన',
    'Skilled Worker': 'నైపుణ్యం కలిగిన కార్మికుడు',
    'Friendly & Polite': 'మర్యాదపూర్వకమైన',
    'Fast Execution': 'వేగవంతమైన పనితీరు',
    'Clean & Organized': 'పరిశుభ్రమైన & క్రమబద్ధమైన',
    'Followed Instructions': 'సూచనలను పాటించారు',
    'Prompt Payout': 'సకాలంలో పారితోషికం',
    'Clear Instructions': 'స్పష్టమైన సూచనలు',
    'Supportive Work Environment': 'మంచి పని వాతావరణం',
    'Professional': 'వృత్తి నైపుణ్యం',
    'Accurate Description': 'ఖచ్చితమైన వివరణ',
    'Great Experience': 'గొప్ప అనుభవం'
  }
};

export const localizeContent = (value: string | undefined | null, language: Language): string => {
  if (!value) return '';
  if (language === 'en') return value;
  
  const dict = CONTENT_TRANSLATIONS[language];
  if (!dict) return value;

  // 1. Direct exact lookup
  if (dict[value]) {
    return dict[value];
  }

  // 2. Case-insensitive lookup
  const valTrimmed = value.trim();
  const valLower = valTrimmed.toLowerCase();
  for (const [key, translated] of Object.entries(dict)) {
    if (key.toLowerCase().trim() === valLower) {
      return translated;
    }
  }

  // 3. Smart multi-word & token pattern replacement for custom user-created gigs
  let translatedResult = value;
  let hasReplaced = false;

  // Sort dictionary keys by length descending so multi-word phrases match before single words
  const sortedEntries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);

  for (const [key, translated] of sortedEntries) {
    if (key.length > 2 && translatedResult.toLowerCase().includes(key.toLowerCase())) {
      const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
      if (regex.test(translatedResult)) {
        translatedResult = translatedResult.replace(regex, translated);
        hasReplaced = true;
      }
    }
  }

  if (hasReplaced) {
    return translatedResult;
  }

  // 4. Dynamic Auto-Translation Engine Fallback for any user-entered text
  return autoTranslateString(value, language);
};

export const ALL_SKILL_OPTIONS = [
  'Driving',
  'Delivery',
  'Bike Rider',
  'Auto Driving',
  'Tamil Speaking',
  'English Speaking',
  'Hindi Speaking',
  'Telugu Speaking',
  'Store Helper',
  'Inventory',
  'Data Entry',
  'Computer Basics',
  'Basic Accounts',
  'Cashier & Billing',
  'Smartphone Proficient',
  'Physically Active',
  'Customer Service',
  'Event Setup',
  'Pamphlet Distribution',
  'Security Guard',
  'Cooking / Catering',
  'Food Serving',
  'Kitchen Helper',
  'Electrician Basics',
  'Plumbing',
  'Carpentry',
  'AC Maintenance',
  'Tailoring',
  'Cleaning & Housekeeping',
  'Gardening',
  'Loading & Unloading',
  'Packing & Restocking',
  'Patient Helper',
  'Office Assistant'
];

export const CATEGORIES = [
  'Delivery',
  'Store Helper',
  'Data Entry',
  'Event Hand',
  'Tutoring',
  'Electrical',
  'Plumbing',
  'Catering & Cooking',
  'Logistics & Loading',
  'Healthcare Assistant',
  'Security & Guard',
  'Housekeeping'
];

export const TIME_SLOT_OPTIONS = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
  'Weekend',
  'Immediate'
] as const;
