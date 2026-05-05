import { NextRequest, NextResponse } from 'next/server';
import { getWorks, createWork } from '@/lib/db';
import { uid } from '@/lib/db';

export async function GET() {
  const works = await getWorks();
  return NextResponse.json(works);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const work = await createWork({
      id: uid('w'),
      title: body.title ?? 'Yeni çalışma',
      category: body.category ?? '',
      year: body.year ?? String(new Date().getFullYear()),
      description: body.description ?? '',
      color: body.color ?? '#7c6df0',
      image_url: body.image_url ?? null,
      sort_order: body.sort_order ?? 0,
    });
    return NextResponse.json(work, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Oluşturma başarısız.' }, { status: 500 });
  }
}
