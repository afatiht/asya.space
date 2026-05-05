import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Dosya 5 MB\'dan büyük olamaz.' }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Geçersiz dosya türü.' }, { status: 400 });

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `works/${Date.now()}.${ext}`;

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: 'Yükleme başarısız.' }, { status: 500 });
  }
}
