import { NextRequest, NextResponse } from 'next/server';
import { updateAchievement, deleteAchievement } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const achievement = await updateAchievement(id, body);
    return NextResponse.json(achievement);
  } catch {
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteAchievement(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Silme başarısız.' }, { status: 500 });
  }
}
