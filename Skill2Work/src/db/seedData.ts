export const INITIAL_USERS = [
  {
    id: 'usr_seeker_1',
    role: 'seeker',
    name: 'Karthik Raja',
    age: 22,
    phone: '+91 98401 23456',
    skills: JSON.stringify(['Driving', 'Tamil Speaking', 'Delivery', 'Smartphone Proficient']),
    free_time_slots: JSON.stringify(['Evening', 'Weekend', 'Immediate']),
    preferred_language: 'ta',
    latitude: 12.9692, // near VIT Vellore, Katpadi
    longitude: 79.1559,
  },
  {
    id: 'usr_seeker_2',
    role: 'seeker',
    name: 'Priya Sundaram',
    age: 20,
    phone: '+91 94432 67890',
    skills: JSON.stringify(['Data Entry', 'Basic Accounts', 'English Speaking', 'Tamil Speaking']),
    free_time_slots: JSON.stringify(['Morning', 'Weekend']),
    preferred_language: 'en',
    latitude: 12.9366, // near Sathuvachari
    longitude: 79.1685,
  },
  {
    id: 'usr_seeker_3',
    role: 'seeker',
    name: 'Rahul Sharma',
    age: 24,
    phone: '+91 97890 54321',
    skills: JSON.stringify(['Inventory', 'Store Helper', 'Hindi Speaking', 'Basic Accounts']),
    free_time_slots: JSON.stringify(['Evening', 'Night', 'Immediate']),
    preferred_language: 'hi',
    latitude: 12.9248, // near CMC Vellore
    longitude: 79.1348,
  },
  {
    id: 'usr_recruiter_1',
    role: 'recruiter',
    name: 'Vellore Fresh & Grocery Mart',
    age: 38,
    phone: '+91 99440 11223',
    skills: JSON.stringify(['Retail Management']),
    free_time_slots: JSON.stringify(['Morning', 'Evening']),
    preferred_language: 'ta',
    latitude: 12.9621, // Gandhi Nagar
    longitude: 79.1412,
  },
  {
    id: 'usr_recruiter_2',
    role: 'recruiter',
    name: 'Katpadi Quick Logistics Hub',
    age: 42,
    phone: '+91 98421 99887',
    skills: JSON.stringify(['Logistics']),
    free_time_slots: JSON.stringify(['Evening', 'Night']),
    preferred_language: 'en',
    latitude: 12.9734, // Katpadi Junction
    longitude: 79.1384,
  },
  {
    id: 'usr_recruiter_3',
    role: 'recruiter',
    name: 'CMC Allied Care Diagnostics',
    age: 35,
    phone: '+91 97910 33445',
    skills: JSON.stringify(['Healthcare Ops']),
    free_time_slots: JSON.stringify(['Morning', 'Afternoon']),
    preferred_language: 'en',
    latitude: 12.9248, // CMC Ida Scudder Rd
    longitude: 79.1348,
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job_vel_001',
    recruiter_id: 'usr_recruiter_2',
    title: 'Instant Delivery Rider (Campus & Station Area)',
    description: 'Deliver food and urgent parcel packages from Katpadi Junction restaurants to student residences near VIT Main Gate and Chittoor bus stop. Two-wheeler preferred.',
    category: 'Delivery',
    required_skills: JSON.stringify(['Driving', 'Tamil Speaking', 'Smartphone Proficient']),
    payout_amount: 175.0,
    payout_unit: 'hour',
    latitude: 12.9710,
    longitude: 79.1450,
    landmark_area: 'Katpadi, near VIT Main Gate',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 09:30:00'
  },
  {
    id: 'job_vel_002',
    recruiter_id: 'usr_recruiter_1',
    title: 'Supermarket Inventory & Evening Billing Hand',
    description: 'Assist in barcode scanning, evening shelf restocking, and counter packing during rush hours at our Gandhi Nagar main branch.',
    category: 'Store Helper',
    required_skills: JSON.stringify(['Basic Accounts', 'Inventory', 'Tamil Speaking']),
    payout_amount: 160.0,
    payout_unit: 'hour',
    latitude: 12.9621,
    longitude: 79.1412,
    landmark_area: 'Gandhi Nagar Main Road, Katpadi',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 10:00:00'
  },
  {
    id: 'job_vel_003',
    recruiter_id: 'usr_recruiter_3',
    title: 'Hospital OPD Patient Guide & Queue Coordinator',
    description: 'Guide outstation patients arriving at CMC Vellore Ida Scudder gate to diagnostic labs and appointment counters. Trilingual ability (Tamil/Hindi/English) is a huge bonus.',
    category: 'Event Hand',
    required_skills: JSON.stringify(['Tamil Speaking', 'Hindi Speaking', 'English Speaking']),
    payout_amount: 220.0,
    payout_unit: 'hour',
    latitude: 12.9248,
    longitude: 79.1348,
    landmark_area: 'CMC Hospital, Ida Scudder Rd',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 08:45:00'
  },
  {
    id: 'job_vel_004',
    recruiter_id: 'usr_recruiter_1',
    title: 'Medical Invoice & Inventory Data Entry',
    description: 'Enter supplier bills into local store ERP software. Work from our air-conditioned office in Sathuvachari Phase 1 near Collectorate.',
    category: 'Data Entry',
    required_skills: JSON.stringify(['Data Entry', 'Basic Accounts', 'Computer Basics']),
    payout_amount: 190.0,
    payout_unit: 'hour',
    latitude: 12.9366,
    longitude: 79.1685,
    landmark_area: 'Sathuvachari Phase 1, Vellore',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 07:15:00'
  },
  {
    id: 'job_vel_005',
    recruiter_id: 'usr_recruiter_2',
    title: 'Evening Parcel Sorter & Load Dispatcher',
    description: 'Sort inbound courier boxes from Chennai/Bengaluru trains at Katpadi Railway Parcel Office platform 1 siding.',
    category: 'Store Helper',
    required_skills: JSON.stringify(['Inventory', 'Physically Active']),
    payout_amount: 650.0,
    payout_unit: 'task',
    latitude: 12.9734,
    longitude: 79.1384,
    landmark_area: 'Katpadi Railway Junction',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 11:00:00'
  },
  {
    id: 'job_vel_006',
    recruiter_id: 'usr_recruiter_3',
    title: 'Cultural Exhibition & Handloom Stall Assistant',
    description: 'Assist in managing customer flow, distributing pamphlets, and product display at the Vellore Fort ground weekend exhibition.',
    category: 'Event Hand',
    required_skills: JSON.stringify(['Tamil Speaking', 'Customer Service']),
    payout_amount: 750.0,
    payout_unit: 'shift',
    latitude: 12.9202,
    longitude: 79.1298,
    landmark_area: 'Vellore Fort Grounds, Officers Line',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-19 16:30:00'
  },
  {
    id: 'job_vel_007',
    recruiter_id: 'usr_recruiter_1',
    title: 'Fresh Vegetables Sorter & Early Morning Packer',
    description: 'Sort, weigh, and pack morning wholesale vegetables from Thottapalayam Mandi for retail delivery.',
    category: 'Store Helper',
    required_skills: JSON.stringify(['Inventory', 'Tamil Speaking']),
    payout_amount: 150.0,
    payout_unit: 'hour',
    latitude: 12.9301,
    longitude: 79.1389,
    landmark_area: 'Thottapalayam Vegetable Market',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 06:00:00'
  },
  {
    id: 'job_vel_008',
    recruiter_id: 'usr_recruiter_3',
    title: 'Bagayam Campus Pharmacy Counter Assistant',
    description: 'Help organize medicines on shelves and provide prescription slips to senior pharmacists at Bagayam clinic.',
    category: 'Store Helper',
    required_skills: JSON.stringify(['Tamil Speaking', 'Basic Accounts', 'English Speaking']),
    payout_amount: 185.0,
    payout_unit: 'hour',
    latitude: 12.8712,
    longitude: 79.1378,
    landmark_area: 'Bagayam CMC Campus, South Vellore',
    status: 'OPEN',
    claimed_by: null,
    created_at: '2026-08-20 10:15:00'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev_001',
    job_id: 'job_vel_002',
    job_title: 'Weekend Catering Food Service Assistant',
    from_user_id: 'usr_recruiter_3',
    from_user_name: 'Hotel Saravana Bhavan Katpadi',
    to_user_id: 'usr_seeker_1',
    rating: 5,
    tags: JSON.stringify(['Punctual', 'High Skill', 'Friendly']),
    comment: 'Karthik arrived on time and managed the dining rush seamlessly. Highly recommended for weekend shifts!',
    created_at: '2026-08-19 22:30:00'
  },
  {
    id: 'rev_002',
    job_id: 'job_vel_004',
    job_title: 'Emergency Medical Document Scanning & Filing',
    from_user_id: 'usr_recruiter_2',
    from_user_name: 'CMC Diagnostic Care',
    to_user_id: 'usr_seeker_2',
    rating: 5,
    tags: JSON.stringify(['Fast Worker', 'Attention to Detail']),
    comment: 'Priya was thorough and accurate with digitizing clinical records. Great communication!',
    created_at: '2026-08-18 19:15:00'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_001',
    user_id: 'usr_seeker_1',
    title: '🔥 94% High Match Gig Nearby!',
    message: 'Evening Delivery Partner for Organic Veg Mandi at Katpadi (1.2 km away) matches your Driving & Delivery skills.',
    type: 'job_alert',
    is_read: 0,
    created_at: '2026-08-20 12:30:00',
    link_job_id: 'job_vel_001'
  },
  {
    id: 'notif_002',
    user_id: 'usr_seeker_1',
    title: '⭐ 5-Star Rating Received!',
    message: 'Hotel Saravana Bhavan Katpadi rated you 5 stars with tag "Punctual & High Skill".',
    type: 'rating',
    is_read: 0,
    created_at: '2026-08-19 22:30:00',
    link_job_id: 'job_vel_002'
  },
  {
    id: 'notif_003',
    user_id: 'usr_seeker_1',
    title: '📍 3km Radar Active in Katpadi',
    message: 'Skill2Work AI matching engine is scanning 8 verified gigs near your location.',
    type: 'system',
    is_read: 1,
    created_at: '2026-08-19 09:00:00'
  }
];
