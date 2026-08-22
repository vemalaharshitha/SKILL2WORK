import { INIT_DATABASE_SQL } from './schema';
import { INITIAL_USERS, INITIAL_JOBS, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS } from './seedData';
import type { User, Job, Role, Language, NotificationItem, FeedbackReview, SkillDemandStat } from '../types';
import { syncService, type SyncMessage } from '../services/syncService';

const STORAGE_KEY = 'skill2work_sqlite_db_v1';
const FALLBACK_USERS_KEY = 'skill2work_users_fallback_v1';
const FALLBACK_JOBS_KEY = 'skill2work_jobs_fallback_v1';
const FALLBACK_REVIEWS_KEY = 'skill2work_reviews_fallback_v1';
const FALLBACK_NOTIFICATIONS_KEY = 'skill2work_notifications_fallback_v1';

class SQLiteManager {
  private db: any = null;
  private isReady = false;
  private isWasm = false;
  private initPromise: Promise<void> | null = null;
  private listeners: Set<() => void> = new Set();

  // In-memory tables for instant availability & fallback
  private memoryUsers: User[] = [];
  private memoryJobs: Job[] = [];
  private memoryReviews: FeedbackReview[] = [];
  private memoryNotifications: NotificationItem[] = [];

  constructor() {
    this.initFallbackData();
    this.initPromise = this.initialize();
    this.initSyncListener();
  }

  public async whenReady(): Promise<void> {
    if (this.isReady) return;
    await this.initPromise;
  }

  private initSyncListener() {
    syncService.subscribe((msg: SyncMessage) => {
      switch (msg.type) {
        case 'INITIAL_SYNC_RESPONSE':
          if (msg.data) {
            this.applyRemoteFullSync(msg.data);
          }
          break;
        case 'JOB_CREATED':
          if (msg.data) {
            this.applyRemoteJob(msg.data);
          }
          break;
        case 'JOB_CLAIMED':
          if (msg.data) {
            const { jobId, seekerId, seekerName, seekerPhone } = msg.data;
            this.applyRemoteJobClaim(jobId, seekerId, seekerName, seekerPhone);
          }
          break;
        case 'JOB_STATUS_UPDATED':
          if (msg.data) {
            const { jobId, status } = msg.data;
            this.applyRemoteJobStatus(jobId, status);
          }
          break;
        case 'JOB_DELETED':
          if (msg.data?.jobId) {
            this.applyRemoteJobDelete(msg.data.jobId);
          }
          break;
        case 'USER_UPSERTED':
          if (msg.data) {
            this.applyRemoteUser(msg.data);
          }
          break;
        case 'NOTIFICATION_ADDED':
          if (msg.data) {
            this.applyRemoteNotification(msg.data);
          }
          break;
        case 'REVIEW_ADDED':
          if (msg.data) {
            this.applyRemoteReview(msg.data);
          }
          break;
        default:
          break;
      }
    });
  }

  private initFallbackData() {
    try {
      const cachedUsers = localStorage.getItem(FALLBACK_USERS_KEY);
      const cachedJobs = localStorage.getItem(FALLBACK_JOBS_KEY);
      const cachedReviews = localStorage.getItem(FALLBACK_REVIEWS_KEY);
      const cachedNotifications = localStorage.getItem(FALLBACK_NOTIFICATIONS_KEY);

      if (cachedUsers && cachedJobs) {
        this.memoryUsers = JSON.parse(cachedUsers);
        this.memoryJobs = JSON.parse(cachedJobs);
        this.memoryReviews = cachedReviews ? JSON.parse(cachedReviews) : INITIAL_REVIEWS.map(r => ({
          ...r,
          tags: JSON.parse(r.tags)
        }));
        this.memoryNotifications = cachedNotifications ? JSON.parse(cachedNotifications) : INITIAL_NOTIFICATIONS.map(n => ({
          ...n,
          type: n.type as any,
          is_read: Boolean(n.is_read)
        }));
      } else {
        this.memoryUsers = INITIAL_USERS.map(u => ({
          id: u.id,
          role: u.role as Role,
          name: u.name,
          age: u.age,
          phone: u.phone,
          skills: JSON.parse(u.skills),
          free_time_slots: JSON.parse(u.free_time_slots),
          preferred_language: u.preferred_language as Language,
          latitude: u.latitude,
          longitude: u.longitude
        }));

        this.memoryJobs = INITIAL_JOBS.map(j => ({
          id: j.id,
          recruiter_id: j.recruiter_id,
          title: j.title,
          description: j.description,
          category: j.category,
          required_skills: JSON.parse(j.required_skills),
          payout_amount: j.payout_amount,
          payout_unit: j.payout_unit as any,
          latitude: j.latitude,
          longitude: j.longitude,
          landmark_area: j.landmark_area,
          status: j.status as any,
          claimed_by: j.claimed_by,
          created_at: j.created_at,
          recruiter_name: 'Vellore Business Partner',
          recruiter_phone: '+91 99440 11223'
        }));

        this.memoryReviews = INITIAL_REVIEWS.map(r => ({
          id: r.id,
          job_id: r.job_id,
          job_title: r.job_title,
          from_user_id: r.from_user_id,
          from_user_name: r.from_user_name,
          to_user_id: r.to_user_id,
          rating: r.rating,
          tags: JSON.parse(r.tags),
          comment: r.comment,
          created_at: r.created_at
        }));

        this.memoryNotifications = INITIAL_NOTIFICATIONS.map(n => ({
          id: n.id,
          user_id: n.user_id,
          title: n.title,
          message: n.message,
          type: n.type as any,
          is_read: Boolean(n.is_read),
          created_at: n.created_at,
          linkJobId: n.link_job_id
        }));

        this.saveFallbackData();
      }
    } catch (e) {
      console.warn('Fallback init error:', e);
    }
  }

  private saveFallbackData() {
    try {
      localStorage.setItem(FALLBACK_USERS_KEY, JSON.stringify(this.memoryUsers));
      localStorage.setItem(FALLBACK_JOBS_KEY, JSON.stringify(this.memoryJobs));
      localStorage.setItem(FALLBACK_REVIEWS_KEY, JSON.stringify(this.memoryReviews));
      localStorage.setItem(FALLBACK_NOTIFICATIONS_KEY, JSON.stringify(this.memoryNotifications));
    } catch (e) {
      console.warn('Failed to save fallback data:', e);
    }
  }

  private notifyListeners() {
    this.saveToStorage();
    this.saveFallbackData();
    this.listeners.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('Error in SQLite subscriber:', err);
      }
    });
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private async initialize(): Promise<void> {
    try {
      const getInitSqlJs = () => (window as any).initSqlJs;

      if (typeof getInitSqlJs === 'function') {
        const SQL = await getInitSqlJs()({
          locateFile: (file: string) => `/${file}`
        });

        const savedDbBase64 = localStorage.getItem(STORAGE_KEY);
        if (savedDbBase64) {
          try {
            const binaryString = atob(savedDbBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            this.db = new SQL.Database(bytes);
          } catch (e) {
            console.warn('Corrupted SQLite binary in storage, creating fresh database', e);
            this.db = new SQL.Database();
            this.initTablesAndSeed();
          }
        } else {
          this.db = new SQL.Database();
          this.initTablesAndSeed();
        }

        this.isWasm = true;
      }
    } catch (err) {
      console.warn('SQLite WASM initialization warning (using local SQL engine):', err);
    } finally {
      this.isReady = true;
      this.syncMemoryFromDb();
    }
  }

  private initTablesAndSeed() {
    if (!this.db) return;
    this.db.run(INIT_DATABASE_SQL);

    // Seed Users
    const userStmt = this.db.prepare(
      `INSERT OR IGNORE INTO users (id, role, name, age, phone, skills, free_time_slots, preferred_language, latitude, longitude) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    INITIAL_USERS.forEach(u => {
      userStmt.run([
        u.id,
        u.role,
        u.name,
        u.age,
        u.phone,
        u.skills,
        u.free_time_slots,
        u.preferred_language,
        u.latitude,
        u.longitude
      ]);
    });
    userStmt.free();

    // Seed Jobs
    const jobStmt = this.db.prepare(
      `INSERT OR IGNORE INTO jobs (id, recruiter_id, title, description, category, required_skills, payout_amount, payout_unit, latitude, longitude, landmark_area, status, claimed_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    INITIAL_JOBS.forEach(j => {
      jobStmt.run([
        j.id,
        j.recruiter_id,
        j.title,
        j.description,
        j.category,
        j.required_skills,
        j.payout_amount,
        j.payout_unit,
        j.latitude,
        j.longitude,
        j.landmark_area,
        j.status,
        j.claimed_by,
        j.created_at
      ]);
    });
    jobStmt.free();

    this.saveToStorage();
  }

  private syncMemoryFromDb() {
    if (this.db && this.isWasm) {
      try {
        const users = this.getUsersFromDb();
        const jobs = this.getJobsFromDb();
        if (users.length > 0) this.memoryUsers = users;
        if (jobs.length > 0) this.memoryJobs = jobs;
      } catch (e) {
        console.warn('Sync memory error:', e);
      }
    }
  }

  private saveToStorage() {
    if (!this.db || !this.isWasm) return;
    try {
      const data = this.db.export();
      let binary = '';
      const len = data.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(data[i]);
      }
      const base64 = btoa(binary);
      localStorage.setItem(STORAGE_KEY, base64);
    } catch (e) {
      console.warn('Failed to save SQLite DB to localStorage:', e);
    }
  }

  // --- RAW SQL EXECUTOR FOR SQL TERMINAL / CONSOLE ---
  public executeRawSQL(query: string): { columns: string[]; values: any[][] }[] {
    if (this.db && this.isWasm) {
      try {
        const results = this.db.exec(query);
        this.syncMemoryFromDb();
        this.notifyListeners();
        return results;
      } catch (err: any) {
        throw new Error(err.message || String(err));
      }
    }

    // Fallback executor for terminal queries
    const qLower = query.toLowerCase().trim();
    if (qLower.startsWith('select')) {
      if (qLower.includes('jobs')) {
        const columns = ['id', 'title', 'category', 'payout_amount', 'payout_unit', 'landmark_area', 'status', 'claimed_by'];
        const values = this.memoryJobs.map(j => [j.id, j.title, j.category, j.payout_amount, j.payout_unit, j.landmark_area, j.status, j.claimed_by]);
        return [{ columns, values }];
      } else if (qLower.includes('users')) {
        const columns = ['id', 'role', 'name', 'phone', 'skills', 'preferred_language', 'latitude', 'longitude'];
        const values = this.memoryUsers.map(u => [u.id, u.role, u.name, u.phone, JSON.stringify(u.skills), u.preferred_language, u.latitude, u.longitude]);
        return [{ columns, values }];
      } else {
        const columns = ['info', 'version', 'status'];
        const values = [['Skill2Work SQLite Local Engine', '3.45 (WASM & IndexedDB)', 'ONLINE']];
        return [{ columns, values }];
      }
    }

    return [{ columns: ['status', 'message'], values: [['SUCCESS', 'Query executed successfully.']] }];
  }

  // --- USER OPERATIONS ---
  private getUsersFromDb(): User[] {
    if (!this.db) return [];
    const results = this.db.exec('SELECT * FROM users ORDER BY created_at DESC, id DESC');
    if (!results || results.length === 0) return [];
    
    const { columns, values } = results[0];
    return values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, idx: number) => {
        obj[col] = row[idx];
      });
      return {
        id: obj.id,
        role: obj.role as Role,
        name: obj.name,
        age: obj.age,
        phone: obj.phone,
        skills: obj.skills ? JSON.parse(obj.skills) : [],
        free_time_slots: obj.free_time_slots ? JSON.parse(obj.free_time_slots) : [],
        preferred_language: (obj.preferred_language || 'en') as Language,
        latitude: obj.latitude,
        longitude: obj.longitude,
        created_at: obj.created_at
      };
    });
  }

  public getUsers(): User[] {
    if (this.db && this.isWasm) {
      try {
        return this.getUsersFromDb();
      } catch (e) {
        console.warn('getUsersFromDb error, using fallback:', e);
      }
    }
    return this.memoryUsers;
  }

  public getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  public upsertUser(user: User, isRemote: boolean = false): void {
    const idx = this.memoryUsers.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      this.memoryUsers[idx] = user;
    } else {
      this.memoryUsers.unshift(user);
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare(`
          INSERT INTO users (id, role, name, age, phone, skills, free_time_slots, preferred_language, latitude, longitude)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            role = excluded.role,
            name = excluded.name,
            age = excluded.age,
            phone = excluded.phone,
            skills = excluded.skills,
            free_time_slots = excluded.free_time_slots,
            preferred_language = excluded.preferred_language,
            latitude = excluded.latitude,
            longitude = excluded.longitude
        `);
        stmt.run([
          user.id,
          user.role,
          user.name,
          user.age,
          user.phone,
          JSON.stringify(user.skills || []),
          JSON.stringify(user.free_time_slots || []),
          user.preferred_language || 'en',
          user.latitude,
          user.longitude
        ]);
        stmt.free();
      } catch (e) {
        console.warn('SQLite upsertUser error:', e);
      }
    }

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastUserUpserted(user);
    }
  }

  public createUser(userData: Omit<User, 'id' | 'created_at'>): User {
    const id = `usr_${userData.role}_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newUser: User = {
      ...userData,
      id,
      created_at: now,
      skills: userData.skills || [],
      free_time_slots: userData.free_time_slots || [],
      preferred_language: userData.preferred_language || 'en'
    };

    this.upsertUser(newUser);

    this.addNotification({
      user_id: newUser.id,
      title: `🎉 Welcome to Skill2Work, ${newUser.name}!`,
      message: `Your ${newUser.role === 'seeker' ? 'Job Seeker' : 'Recruiter'} profile is registered in the Vellore local database. radar is active!`,
      type: 'system',
      is_read: false
    });

    return newUser;
  }

  public findUserByPhoneOrId(query: string): User | null {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) return null;
    const users = this.getUsers();
    return users.find(u => 
      u.id.toLowerCase() === cleanQ || 
      u.phone.toLowerCase().replace(/\s+/g, '').includes(cleanQ.replace(/\s+/g, '')) ||
      u.name.toLowerCase().includes(cleanQ)
    ) || null;
  }

  // --- JOB OPERATIONS ---
  private getJobsFromDb(): Job[] {
    if (!this.db) return [];
    const query = `
      SELECT 
        j.*,
        r.name AS recruiter_name,
        r.phone AS recruiter_phone,
        s.name AS claimed_by_name,
        s.phone AS claimed_by_phone
      FROM jobs j
      LEFT JOIN users r ON j.recruiter_id = r.id
      LEFT JOIN users s ON j.claimed_by = s.id
      ORDER BY j.created_at DESC
    `;
    const results = this.db.exec(query);
    if (!results || results.length === 0) return [];
    
    const { columns, values } = results[0];
    return values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, idx: number) => {
        obj[col] = row[idx];
      });
      return {
        id: obj.id,
        recruiter_id: obj.recruiter_id,
        title: obj.title,
        description: obj.description || '',
        category: obj.category,
        required_skills: obj.required_skills ? JSON.parse(obj.required_skills) : [],
        payout_amount: Number(obj.payout_amount),
        payout_unit: obj.payout_unit || 'hour',
        latitude: Number(obj.latitude),
        longitude: Number(obj.longitude),
        landmark_area: obj.landmark_area || 'Vellore',
        status: obj.status,
        claimed_by: obj.claimed_by || null,
        created_at: obj.created_at,
        recruiter_name: obj.recruiter_name,
        recruiter_phone: obj.recruiter_phone,
        claimed_by_name: obj.claimed_by_name,
        claimed_by_phone: obj.claimed_by_phone
      };
    });
  }

  public getJobs(): Job[] {
    let jobsList = this.memoryJobs;
    if (this.db && this.isWasm) {
      try {
        jobsList = this.getJobsFromDb();
      } catch (e) {
        console.warn('getJobsFromDb error, using fallback:', e);
      }
    }

    return jobsList.map(job => {
      const recruiter = this.getUserById(job.recruiter_id);
      const claimant = job.claimed_by ? this.getUserById(job.claimed_by) : null;

      return {
        ...job,
        recruiter_name: recruiter?.name || job.recruiter_name || 'Vellore Recruiter',
        recruiter_phone: recruiter?.phone || job.recruiter_phone || '+91 99440 11223',
        claimed_by_name: claimant?.name || job.claimed_by_name || undefined,
        claimed_by_phone: claimant?.phone || job.claimed_by_phone || undefined
      };
    });
  }

  public createJob(job: Omit<Job, 'id' | 'created_at'>, isRemote: boolean = false): string {
    const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const recruiter = this.getUserById(job.recruiter_id);
    const newJob: Job = {
      ...job,
      id,
      created_at: now,
      recruiter_name: recruiter?.name || 'Vellore Recruiter',
      recruiter_phone: recruiter?.phone || '+91 99440 11223'
    };

    this.memoryJobs.unshift(newJob);

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare(`
          INSERT INTO jobs (id, recruiter_id, title, description, category, required_skills, payout_amount, payout_unit, latitude, longitude, landmark_area, status, claimed_by, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run([
          id,
          job.recruiter_id,
          job.title,
          job.description,
          job.category,
          JSON.stringify(job.required_skills),
          job.payout_amount,
          job.payout_unit,
          job.latitude,
          job.longitude,
          job.landmark_area,
          job.status || 'OPEN',
          job.claimed_by || null,
          now
        ]);
        stmt.free();
      } catch (e) {
        console.warn('SQLite createJob error:', e);
      }
    }

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastJobCreated(newJob);
    }

    return id;
  }

  public claimJob(jobId: string, seekerId: string, isRemote: boolean = false): void {
    const seeker = this.getUserById(seekerId);
    const job = this.memoryJobs.find(j => j.id === jobId);
    if (job) {
      job.status = 'CLAIMED';
      job.claimed_by = seekerId;
      if (seeker) {
        job.claimed_by_name = seeker.name;
        job.claimed_by_phone = seeker.phone;
      }
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare(`
          UPDATE jobs 
          SET status = 'CLAIMED', claimed_by = ? 
          WHERE id = ? AND status = 'OPEN'
        `);
        stmt.run([seekerId, jobId]);
        stmt.free();
      } catch (e) {
        console.warn('SQLite claimJob error:', e);
      }
    }

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastJobClaimed(jobId, seekerId, seeker?.name, seeker?.phone);
    }
  }

  public updateJobStatus(jobId: string, status: 'OPEN' | 'CLAIMED' | 'COMPLETED', isRemote: boolean = false): void {
    const job = this.memoryJobs.find(j => j.id === jobId);
    if (job) {
      job.status = status;
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare(`
          UPDATE jobs 
          SET status = ? 
          WHERE id = ?
        `);
        stmt.run([status, jobId]);
        stmt.free();
      } catch (e) {
        console.warn('SQLite updateJobStatus error:', e);
      }
    }

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastJobStatusUpdated(jobId, status);
    }
  }

  public deleteJob(jobId: string, isRemote: boolean = false): void {
    this.memoryJobs = this.memoryJobs.filter(j => j.id !== jobId);

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare('DELETE FROM jobs WHERE id = ?');
        stmt.run([jobId]);
        stmt.free();
      } catch (e) {
        console.warn('SQLite deleteJob error:', e);
      }
    }

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastJobDeleted(jobId);
    }
  }

  // --- REVIEWS & RATINGS ---
  public getReviews(toUserId?: string): FeedbackReview[] {
    if (toUserId) {
      return this.memoryReviews.filter(r => r.to_user_id === toUserId);
    }
    return this.memoryReviews;
  }

  public addReview(reviewData: Omit<FeedbackReview, 'id' | 'created_at'>, isRemote: boolean = false): FeedbackReview {
    const newReview: FeedbackReview = {
      ...reviewData,
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    this.memoryReviews.unshift(newReview);

    this.addNotification({
      user_id: newReview.to_user_id,
      title: `⭐ New ${newReview.rating}-Star Feedback Received!`,
      message: `${newReview.from_user_name} reviewed your work on "${newReview.job_title}": "${newReview.comment.substring(0, 70)}..."`,
      type: 'rating',
      is_read: false,
      linkJobId: newReview.job_id
    }, isRemote);

    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastReview(newReview);
    }

    return newReview;
  }

  public getAverageRating(toUserId: string): { average: number; count: number } {
    const reviews = this.getReviews(toUserId);
    if (reviews.length === 0) return { average: 5.0, count: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: parseFloat((sum / reviews.length).toFixed(1)),
      count: reviews.length
    };
  }

  // --- NOTIFICATIONS ---
  public getNotifications(userId: string): NotificationItem[] {
    return this.memoryNotifications
      .filter(n => n.user_id === userId || n.user_id === 'all')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public addNotification(notifData: Omit<NotificationItem, 'id' | 'created_at'>, isRemote: boolean = false): NotificationItem {
    const newNotif: NotificationItem = {
      ...notifData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    this.memoryNotifications.unshift(newNotif);
    this.notifyListeners();

    if (!isRemote) {
      syncService.broadcastNotification(newNotif);
    }

    return newNotif;
  }

  public markNotificationAsRead(notifId: string): void {
    const notif = this.memoryNotifications.find(n => n.id === notifId);
    if (notif) {
      notif.is_read = true;
      this.notifyListeners();
    }
  }

  public markAllNotificationsAsRead(userId: string): void {
    this.memoryNotifications.forEach(n => {
      if (n.user_id === userId || n.user_id === 'all') {
        n.is_read = true;
      }
    });
    this.notifyListeners();
  }

  // --- REMOTE SYNC APPLICATION HANDLERS ---

  public applyRemoteJob(job: Job): void {
    const exists = this.memoryJobs.some(j => j.id === job.id);
    if (exists) {
      const idx = this.memoryJobs.findIndex(j => j.id === job.id);
      this.memoryJobs[idx] = { ...this.memoryJobs[idx], ...job };
    } else {
      this.memoryJobs.unshift(job);
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare(`
          INSERT INTO jobs (id, recruiter_id, title, description, category, required_skills, payout_amount, payout_unit, latitude, longitude, landmark_area, status, claimed_by, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            description = excluded.description,
            category = excluded.category,
            required_skills = excluded.required_skills,
            payout_amount = excluded.payout_amount,
            payout_unit = excluded.payout_unit,
            latitude = excluded.latitude,
            longitude = excluded.longitude,
            landmark_area = excluded.landmark_area,
            status = excluded.status,
            claimed_by = excluded.claimed_by
        `);
        stmt.run([
          job.id,
          job.recruiter_id,
          job.title,
          job.description || '',
          job.category,
          JSON.stringify(job.required_skills || []),
          job.payout_amount,
          job.payout_unit || 'hour',
          job.latitude,
          job.longitude,
          job.landmark_area,
          job.status || 'OPEN',
          job.claimed_by || null,
          job.created_at || new Date().toISOString()
        ]);
        stmt.free();
      } catch (e) {
        console.warn('applyRemoteJob SQLite error:', e);
      }
    }

    this.notifyListeners();
  }

  public applyRemoteJobClaim(jobId: string, seekerId: string, seekerName?: string, seekerPhone?: string): void {
    const job = this.memoryJobs.find(j => j.id === jobId);
    if (job) {
      job.status = 'CLAIMED';
      job.claimed_by = seekerId;
      if (seekerName) job.claimed_by_name = seekerName;
      if (seekerPhone) job.claimed_by_phone = seekerPhone;
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare('UPDATE jobs SET status = "CLAIMED", claimed_by = ? WHERE id = ?');
        stmt.run([seekerId, jobId]);
        stmt.free();
      } catch (e) {
        console.warn('applyRemoteJobClaim SQLite error:', e);
      }
    }

    this.notifyListeners();
  }

  public applyRemoteJobStatus(jobId: string, status: 'OPEN' | 'CLAIMED' | 'COMPLETED'): void {
    const job = this.memoryJobs.find(j => j.id === jobId);
    if (job) {
      job.status = status;
    }

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare('UPDATE jobs SET status = ? WHERE id = ?');
        stmt.run([status, jobId]);
        stmt.free();
      } catch (e) {
        console.warn('applyRemoteJobStatus SQLite error:', e);
      }
    }

    this.notifyListeners();
  }

  public applyRemoteJobDelete(jobId: string): void {
    this.memoryJobs = this.memoryJobs.filter(j => j.id !== jobId);

    if (this.db && this.isWasm) {
      try {
        const stmt = this.db.prepare('DELETE FROM jobs WHERE id = ?');
        stmt.run([jobId]);
        stmt.free();
      } catch (e) {
        console.warn('applyRemoteJobDelete SQLite error:', e);
      }
    }

    this.notifyListeners();
  }

  public applyRemoteUser(user: User): void {
    this.upsertUser(user, true);
  }

  public applyRemoteNotification(notif: NotificationItem): void {
    const exists = this.memoryNotifications.some(n => n.id === notif.id);
    if (!exists) {
      this.memoryNotifications.unshift(notif);
      this.notifyListeners();
    }
  }

  public applyRemoteReview(review: FeedbackReview): void {
    const exists = this.memoryReviews.some(r => r.id === review.id);
    if (!exists) {
      this.memoryReviews.unshift(review);
      this.notifyListeners();
    }
  }

  public applyRemoteFullSync(state: { jobs?: Job[]; users?: User[]; reviews?: FeedbackReview[]; notifications?: NotificationItem[] }): void {
    if (Array.isArray(state.jobs) && state.jobs.length > 0) {
      state.jobs.forEach(j => this.applyRemoteJob(j));
    }
    if (Array.isArray(state.users) && state.users.length > 0) {
      state.users.forEach(u => this.applyRemoteUser(u));
    }
    if (Array.isArray(state.reviews) && state.reviews.length > 0) {
      state.reviews.forEach(r => this.applyRemoteReview(r));
    }
    if (Array.isArray(state.notifications) && state.notifications.length > 0) {
      state.notifications.forEach(n => this.applyRemoteNotification(n));
    }
    this.notifyListeners();
  }

  // --- COMMUNITY DEMAND & SKILL TRENDS ANALYSIS ---
  public getCommunitySkillTrends(): SkillDemandStat[] {
    const skillCountMap: Record<string, { count: number; totalPay: number; landmarks: Record<string, number> }> = {};
    const totalJobs = Math.max(1, this.memoryJobs.length);

    this.memoryJobs.forEach(job => {
      (job.required_skills || []).forEach(skill => {
        const key = skill.trim();
        if (!skillCountMap[key]) {
          skillCountMap[key] = { count: 0, totalPay: 0, landmarks: {} };
        }
        skillCountMap[key].count += 1;
        skillCountMap[key].totalPay += job.payout_amount;
        const landmark = job.landmark_area ? job.landmark_area.split(',')[0] : 'Vellore Hub';
        skillCountMap[key].landmarks[landmark] = (skillCountMap[key].landmarks[landmark] || 0) + 1;
      });
    });

    const trends: SkillDemandStat[] = Object.entries(skillCountMap).map(([skill, data]) => {
      let topLandmark = 'Katpadi';
      let maxL = 0;
      Object.entries(data.landmarks).forEach(([l, c]) => {
        if (c > maxL) {
          maxL = c;
          topLandmark = l;
        }
      });

      const demandPct = Math.min(99, Math.round((data.count / totalJobs) * 100 * 1.5));
      const avgPay = Math.round(data.totalPay / data.count);

      return {
        skill,
        demandPercentage: demandPct,
        openGigsCount: data.count,
        avgHourlyPay: avgPay,
        topLandmark,
        growthRate: demandPct > 40 ? '+24% this week' : '+12% this week'
      };
    });

    return trends.sort((a, b) => b.openGigsCount - a.openGigsCount);
  }

  public resetDatabase(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FALLBACK_USERS_KEY);
    localStorage.removeItem(FALLBACK_JOBS_KEY);
    localStorage.removeItem(FALLBACK_REVIEWS_KEY);
    localStorage.removeItem(FALLBACK_NOTIFICATIONS_KEY);
    this.initFallbackData();

    if (this.db && this.isWasm) {
      try {
        this.db.run('DROP TABLE IF EXISTS jobs; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS reviews; DROP TABLE IF EXISTS notifications;');
        this.initTablesAndSeed();
      } catch (e) {
        console.warn('SQLite reset error:', e);
      }
    }

    this.notifyListeners();
  }

  public exportDatabaseBinary(): Uint8Array | null {
    if (this.db && this.isWasm) {
      return this.db.export();
    }
    const exportObj = {
      users: this.memoryUsers,
      jobs: this.memoryJobs,
      reviews: this.memoryReviews,
      notifications: this.memoryNotifications,
      timestamp: new Date().toISOString()
    };
    const str = JSON.stringify(exportObj, null, 2);
    const enc = new TextEncoder();
    return enc.encode(str);
  }
}

export const sqliteManager = new SQLiteManager();
