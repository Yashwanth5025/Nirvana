import { NextResponse } from 'next/server';
import connectDB from '../../db';
import User from '../../models/User';

export async function GET(request, context) {
  try {
    await connectDB();
    const { transactionId } = context.params;
    
    const user = await User.findOne({ transactionId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid ticket' },
        { status: 404 }
      );
    }
    
    if (!user.paymentVerified) {
      return NextResponse.json(
        { success: false, message: 'Payment not verified' },
        { status: 400 }
      );
    }

    if (user.ticketVerified) {
      return NextResponse.json(
        { success: false, message: 'Ticket has already been used' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      user: {
        name: user.name,
        passType: user.passType,
        transactionId: user.transactionId,
        ticketVerified: user.ticketVerified
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 