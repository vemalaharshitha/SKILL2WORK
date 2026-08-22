export const CREATE_USERS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    role TEXT CHECK(role IN ('seeker', 'recruiter')),
    name TEXT NOT NULL,
    age INTEGER,
    phone TEXT NOT NULL UNIQUE,
    skills TEXT, -- Comma-separated or JSON array
    free_time_slots TEXT, -- JSON array of available time slots
    preferred_language TEXT DEFAULT 'en',
    latitude REAL,
    longitude REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const CREATE_JOBS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    recruiter_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    required_skills TEXT NOT NULL, -- JSON array
    payout_amount REAL NOT NULL,
    payout_unit TEXT DEFAULT 'hour',
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    landmark_area TEXT, -- e.g., 'Katpadi, Vellore', 'Sathuvachari'
    status TEXT CHECK(status IN ('OPEN', 'CLAIMED', 'COMPLETED')) DEFAULT 'OPEN',
    claimed_by TEXT, -- references users(id)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(recruiter_id) REFERENCES users(id),
    FOREIGN KEY(claimed_by) REFERENCES users(id)
);
`;

export const CREATE_REVIEWS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    from_user_id TEXT NOT NULL,
    from_user_name TEXT NOT NULL,
    to_user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    tags TEXT, -- JSON array of tags e.g. ["Punctual", "Skilled"]
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const CREATE_NOTIFICATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'system',
    is_read INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    link_job_id TEXT
);
`;

export const INIT_DATABASE_SQL = `
${CREATE_USERS_TABLE_SQL}
${CREATE_JOBS_TABLE_SQL}
${CREATE_REVIEWS_TABLE_SQL}
${CREATE_NOTIFICATIONS_TABLE_SQL}
`;
