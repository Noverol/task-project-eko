import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Stats from '@/models/Stats';

const MOCK_USER_ID = '66442211bbccaa9988776655';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { mood } = await request.json();
    const today = new Date().toISOString().split('T')[0];
    
    const stats = await Stats.findOneAndUpdate(
      { userId: MOCK_USER_ID, date: today },
      { mood },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
