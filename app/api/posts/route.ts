import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost, uid } from '@/lib/db';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const post = await createPost({
      id: uid('p'),
      title: body.title ?? 'Yeni yazı',
      excerpt: body.excerpt ?? '',
      body: body.body ?? '',
      date: body.date ?? new Date().toISOString().slice(0, 10),
      tag: body.tag ?? 'Günlük',
      cover: body.cover ?? '#7c6df0',
      sort_order: body.sort_order ?? 0,
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Oluşturma başarısız.' }, { status: 500 });
  }
}
