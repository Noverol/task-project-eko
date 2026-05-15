import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Task from '@/models/Task';
import Stats from '@/models/Stats';
import User from '@/models/User';

const MOCK_USER_ID = '66442211bbccaa9988776655'; // Example ID

export async function GET() {
  await dbConnect();
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const task = await Task.create({ ...body, userId: MOCK_USER_ID });
    return NextResponse.json({ success: true, data: task });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, ...update } = body;
    
    const task = await Task.findByIdAndUpdate(id, update, { new: true });
    
    // If task is completed, update stats and XP
    if (update.status === 'Done') {
      const today = new Date().toISOString().split('T')[0];
      const hour = new Date().getHours();
      
      await Stats.findOneAndUpdate(
        { userId: MOCK_USER_ID, date: today },
        { 
          $inc: { tasksCompleted: 1, xpEarned: task.xpValue || 10, [`hourlyActivity.${hour}`]: 1 } 
        },
        { upsert: true, new: true }
      );
      
      await User.findByIdAndUpdate(MOCK_USER_ID, {
        $inc: { xp: task.xpValue || 10 }
      });
    }
    
    return NextResponse.json({ success: true, data: task });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
