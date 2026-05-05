import { NextRequest, NextResponse } from 'next/server';
import { updateWork, deleteWork } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const work = await updateWork(id, body);
    return NextResponse.json(work);
  } catch {
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteWork(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Silme başarısız.' }, { status: 500 });
  }
}
