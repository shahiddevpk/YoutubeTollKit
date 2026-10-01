import { NextRequest, NextResponse } from 'next/server';
import { MONETIZATION_RESULT_COOKIE, verifyVerificationResult } from '@/lib/youtube-oauth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(MONETIZATION_RESULT_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: 'No recent verification result.' }, { status: 404 });
  }

  try {
    const result = verifyVerificationResult(token);
    if (!result) {
      return NextResponse.json({ success: false, error: 'Verification result expired.' }, { status: 410 });
    }

    return NextResponse.json(
      { success: true, data: result },
      { headers: { 'Cache-Control': 'private, no-store, max-age=0' } }
    );
  } catch {
    return NextResponse.json({ success: false, error: 'Verification result is unavailable.' }, { status: 400 });
  }
}
