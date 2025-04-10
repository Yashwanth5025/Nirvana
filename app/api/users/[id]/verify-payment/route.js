import { NextResponse } from 'next/server';
import connectDB from '../../../db';
import User from '../../../models/User';
import { sendVerificationEmail } from '../../../utils/email';

export async function POST(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    user.paymentVerified = true;
    await user.save();

    // Send verification email with QR code
    await sendVerificationEmail(user);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 