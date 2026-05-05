import { sql } from '@vercel/postgres';
import type { Profile, Stats, Work, Achievement, Post } from './types';

// ── Profile ─────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<Profile> {
  const { rows } = await sql<Profile>`SELECT * FROM profile WHERE id = 1`;
  return rows[0];
}

export async function updateProfile(data: Partial<Omit<Profile, 'id'>>): Promise<Profile> {
  const { rows } = await sql<Profile>`
    UPDATE profile
    SET
      name  = COALESCE(${data.name}, name),
      title = COALESCE(${data.title}, title),
      grade = COALESCE(${data.grade}, grade),
      email = COALESCE(${data.email}, email),
      bio   = COALESCE(${data.bio}, bio)
    WHERE id = 1
    RETURNING *
  `;
  return rows[0];
}

// ── Stats ────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<Stats> {
  const { rows } = await sql<Stats>`SELECT * FROM stats WHERE id = 1`;
  return rows[0];
}

export async function updateStats(data: Partial<Omit<Stats, 'id'>>): Promise<Stats> {
  const { rows } = await sql<Stats>`
    UPDATE stats
    SET
      works_count        = COALESCE(${data.works_count}, works_count),
      awards_count       = COALESCE(${data.awards_count}, awards_count),
      competitions_count = COALESCE(${data.competitions_count}, competitions_count)
    WHERE id = 1
    RETURNING *
  `;
  return rows[0];
}

// ── Works ────────────────────────────────────────────────────────────────────

export async function getWorks(): Promise<Work[]> {
  const { rows } = await sql<Work>`SELECT * FROM works ORDER BY sort_order ASC, created_at DESC`;
  return rows;
}

export async function getWork(id: string): Promise<Work | null> {
  const { rows } = await sql<Work>`SELECT * FROM works WHERE id = ${id}`;
  return rows[0] ?? null;
}

export async function createWork(data: Omit<Work, 'created_at'>): Promise<Work> {
  const { rows } = await sql<Work>`
    INSERT INTO works (id, title, category, year, description, color, image_url, sort_order)
    VALUES (${data.id}, ${data.title}, ${data.category}, ${data.year},
            ${data.description}, ${data.color}, ${data.image_url}, ${data.sort_order})
    RETURNING *
  `;
  return rows[0];
}

export async function updateWork(id: string, data: Partial<Omit<Work, 'id' | 'created_at'>>): Promise<Work> {
  const { rows } = await sql<Work>`
    UPDATE works
    SET
      title       = COALESCE(${data.title}, title),
      category    = COALESCE(${data.category}, category),
      year        = COALESCE(${data.year}, year),
      description = COALESCE(${data.description}, description),
      color       = COALESCE(${data.color}, color),
      image_url   = COALESCE(${data.image_url}, image_url),
      sort_order  = COALESCE(${data.sort_order}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteWork(id: string): Promise<void> {
  await sql`DELETE FROM works WHERE id = ${id}`;
}

// ── Achievements ─────────────────────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[]> {
  const { rows } = await sql<Achievement>`SELECT * FROM achievements ORDER BY sort_order ASC, created_at DESC`;
  return rows;
}

export async function createAchievement(data: Omit<Achievement, 'created_at'>): Promise<Achievement> {
  const { rows } = await sql<Achievement>`
    INSERT INTO achievements (id, title, place, year, detail, sort_order)
    VALUES (${data.id}, ${data.title}, ${data.place}, ${data.year}, ${data.detail}, ${data.sort_order})
    RETURNING *
  `;
  return rows[0];
}

export async function updateAchievement(id: string, data: Partial<Omit<Achievement, 'id' | 'created_at'>>): Promise<Achievement> {
  const { rows } = await sql<Achievement>`
    UPDATE achievements
    SET
      title      = COALESCE(${data.title}, title),
      place      = COALESCE(${data.place}, place),
      year       = COALESCE(${data.year}, year),
      detail     = COALESCE(${data.detail}, detail),
      sort_order = COALESCE(${data.sort_order}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteAchievement(id: string): Promise<void> {
  await sql`DELETE FROM achievements WHERE id = ${id}`;
}

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const { rows } = await sql<Post>`SELECT * FROM posts ORDER BY sort_order ASC, date DESC`;
  return rows;
}

export async function getPost(id: string): Promise<Post | null> {
  const { rows } = await sql<Post>`SELECT * FROM posts WHERE id = ${id}`;
  return rows[0] ?? null;
}

export async function createPost(data: Omit<Post, 'created_at'>): Promise<Post> {
  const { rows } = await sql<Post>`
    INSERT INTO posts (id, title, excerpt, body, date, tag, cover, sort_order)
    VALUES (${data.id}, ${data.title}, ${data.excerpt}, ${data.body},
            ${data.date}, ${data.tag}, ${data.cover}, ${data.sort_order})
    RETURNING *
  `;
  return rows[0];
}

export async function updatePost(id: string, data: Partial<Omit<Post, 'id' | 'created_at'>>): Promise<Post> {
  const { rows } = await sql<Post>`
    UPDATE posts
    SET
      title      = COALESCE(${data.title}, title),
      excerpt    = COALESCE(${data.excerpt}, excerpt),
      body       = COALESCE(${data.body}, body),
      date       = COALESCE(${data.date}::date, date),
      tag        = COALESCE(${data.tag}, tag),
      cover      = COALESCE(${data.cover}, cover),
      sort_order = COALESCE(${data.sort_order}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deletePost(id: string): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

// ── Utility ──────────────────────────────────────────────────────────────────

export function uid(prefix = 'x'): string {
  const arr = new Uint32Array(2);
  crypto.getRandomValues(arr);
  return `${prefix}_${arr[0].toString(36)}${arr[1].toString(36).slice(0, 3)}`;
}

export function fmtDate(iso: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const aylar = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    return `${d.getDate()} ${aylar[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return iso;
  }
}
