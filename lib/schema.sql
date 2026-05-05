-- asya.space veritabanı şeması
-- Vercel Postgres (Neon) üzerinde çalıştır

CREATE TABLE IF NOT EXISTS profile (
  id    INTEGER PRIMARY KEY DEFAULT 1,
  name  TEXT NOT NULL DEFAULT 'Asya',
  title TEXT,
  grade TEXT,
  email TEXT,
  bio   TEXT
);

CREATE TABLE IF NOT EXISTS stats (
  id                 INTEGER PRIMARY KEY DEFAULT 1,
  works_count        INTEGER DEFAULT 0,
  awards_count       INTEGER DEFAULT 0,
  competitions_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS works (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  category    TEXT,
  year        TEXT,
  description TEXT,
  color       TEXT DEFAULT '#7c6df0',
  image_url   TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  place      TEXT,
  year       TEXT,
  detail     TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  excerpt    TEXT,
  body       TEXT,
  date       DATE,
  tag        TEXT,
  cover      TEXT DEFAULT '#7c6df0',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
