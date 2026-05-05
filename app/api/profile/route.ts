import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile, getStats, updateStats } from '@/lib/db';

export async function GET() {
  const [profile, stats] = await Promise.all([getProfile(), getStats()]);
  return NextResponse.json({ profile, stats });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const results: Record<string, unknown> = {};

    if (body.profile) results.profile = await updateProfile(body.profile);
    if (body.stats) results.stats = await updateStats(body.stats);

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
  }
}
