export interface Profile {
  id: number;
  name: string;
  title: string;
  grade: string;
  email: string;
  bio: string;
}

export interface Stats {
  id: number;
  works_count: number;
  awards_count: number;
  competitions_count: number;
}

export interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  color: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  place: string;
  year: string;
  detail: string;
  sort_order: number;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  tag: string;
  cover: string;
  sort_order: number;
  created_at: string;
}

export interface SiteData {
  profile: Profile;
  stats: Stats;
  works: Work[];
  achievements: Achievement[];
  posts: Post[];
}
