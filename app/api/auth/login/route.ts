import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, signAdminToken, setAdminCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Şifre gerekli.' }, { status: 400 });
    }

    const hash = await hashPassword(password);
    if (hash !== process.env.ADMIN_PASS_HASH) {
      // Timing-safe olmak için kısa gecikme
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ error: 'Şifre yanlış.' }, { status: 401 });
    }

    const token = await signAdminToken();
    await setAdminCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
