import { NextRequest, NextResponse } from 'next/server';
import { getAchievements, createAchievement, uid } from '@/lib/db';

export async function GET() {
  const achievements = await getAchievements();
  return NextResponse.json(achievements);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const achievement = await createAchievement({
      id: uid('a'),
      title: body.title ?? 'Yeni başarı',
      place: body.place ?? 'Katılım',
      year: body.year ?? String(new Date().getFullYear()),
      detail: body.detail ?? '',
      sort_order: body.sort_order ?? 0,
    });
    return NextResponse.json(achievement, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Oluşturma başarısız.' }, { status: 500 });
  }
}
