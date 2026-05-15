import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';

const MOCK_USER_ID = '66442211bbccaa9988776655';

export async function GET() {
  await dbConnect();
  try {
    let user = await User.findById(MOCK_USER_ID);
    
    if (!user) {
      user = await User.create({
        _id: MOCK_USER_ID,
        name: 'Alex Doe',
        xp: 150,
        level: 2,
        streak: 5,
        bio: 'Digital minimalist and task conqueror.',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        themeColor: '#0ea5e9',
        categories: [
          { name: 'Work', color: '#3b82f6' },
          { name: 'Personal', color: '#10b981' },
          { name: 'Urgent', color: '#ef4444' },
        ]
      });
    }
    
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const user = await User.findByIdAndUpdate(MOCK_USER_ID, body, { new: true });
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
