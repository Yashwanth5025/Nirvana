import { NextResponse } from 'next/server';
import connectDB from '../db';
import User from '../models/User';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, phone, passType, transactionId } = await request.json();
    
    const user = new User({
      name,
      email,
      phone,
      passType,
      transactionId,
      paymentVerified: false,
      ticketVerified: false
    });
    
    await user.save();
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful! We will send your ticket once payment is verified.' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 