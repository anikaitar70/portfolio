import Database from "better-sqlite3";
import { dbPath, ensureDirs } from "./config.js";

ensureDirs();

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK (type IN ('pageview', 'error')),
    path TEXT,
    referrer TEXT,
    user_agent TEXT,
    session_id TEXT,
    message TEXT,
    stack TEXT,
    metadata TEXT,
    ip_hash TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
  CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
  CREATE INDEX IF NOT EXISTS idx_events_path ON events(path);
`);

export function insertEvent(event) {
  const stmt = db.prepare(`
    INSERT INTO events (type, path, referrer, user_agent, session_id, message, stack, metadata, ip_hash)
    VALUES (@type, @path, @referrer, @userAgent, @sessionId, @message, @stack, @metadata, @ipHash)
  `);

  return stmt.run({
    type: event.type,
    path: event.path ?? null,
    referrer: event.referrer ?? null,
    userAgent: event.userAgent ?? null,
    sessionId: event.sessionId ?? null,
    message: event.message ?? null,
    stack: event.stack ?? null,
    metadata: event.metadata ? JSON.stringify(event.metadata) : null,
    ipHash: event.ipHash ?? null,
  });
}

export function getDashboardStats() {
  const totals = db
    .prepare(
      `
      SELECT
        SUM(CASE WHEN type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
        SUM(CASE WHEN type = 'error' THEN 1 ELSE 0 END) AS errors,
        COUNT(DISTINCT CASE WHEN type = 'pageview' THEN session_id END) AS unique_sessions
      FROM events
    `
    )
    .get();

  const today = db
    .prepare(
      `
      SELECT
        SUM(CASE WHEN type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
        SUM(CASE WHEN type = 'error' THEN 1 ELSE 0 END) AS errors
      FROM events
      WHERE date(created_at) = date('now')
    `
    )
    .get();

  const last7Days = db
    .prepare(
      `
      SELECT date(created_at) AS day,
             SUM(CASE WHEN type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
             SUM(CASE WHEN type = 'error' THEN 1 ELSE 0 END) AS errors
      FROM events
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY date(created_at)
      ORDER BY day ASC
    `
    )
    .all();

  const topPages = db
    .prepare(
      `
      SELECT path, COUNT(*) AS views
      FROM events
      WHERE type = 'pageview' AND path IS NOT NULL
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `
    )
    .all();

  const recentErrors = db
    .prepare(
      `
      SELECT id, path, message, stack, created_at
      FROM events
      WHERE type = 'error'
      ORDER BY created_at DESC
      LIMIT 20
    `
    )
    .all();

  const recentVisits = db
    .prepare(
      `
      SELECT id, path, referrer, user_agent, session_id, created_at
      FROM events
      WHERE type = 'pageview'
      ORDER BY created_at DESC
      LIMIT 30
    `
    )
    .all();

  return {
    totals,
    today,
    last7Days,
    topPages,
    recentErrors,
    recentVisits,
  };
}

export function getDbInfo() {
  const counts = db
    .prepare(
      `
      SELECT type, COUNT(*) AS count
      FROM events
      GROUP BY type
    `
    )
    .all();

  const lastEvent = db
    .prepare(`SELECT created_at FROM events ORDER BY created_at DESC LIMIT 1`)
    .get();

  return { counts, lastEvent };
}

export default db;
