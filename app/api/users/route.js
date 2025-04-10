import { NextResponse } from 'next/server';
import connectDB from '../db';
import User from '../models/User';
import { sendVerificationEmail } from '../utils/email';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 