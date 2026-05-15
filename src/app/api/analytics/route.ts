import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Stats from '@/models/Stats';

const MOCK_USER_ID = '66442211bbccaa9988776655';

export async function GET() {
  await dbConnect();
  try {
    // Get last 7 days of stats
    const stats = await Stats.find({ userId: MOCK_USER_ID })
      .sort({ date: -1 })
      .limit(7);
      
    return NextResponse.json({ success: true, data: stats.reverse() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
