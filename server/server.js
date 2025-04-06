require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  passType: String,
  transactionId: String,
  paymentVerified: { type: Boolean, default: false },
  ticketVerified: { type: Boolean, default: false },
  qrCode: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Function to send verification email
async function sendVerificationEmail(user) {
  const verificationUrl = `http://localhost:3000/verify/${user.transactionId}`;
  const qrBuffer = await require('qrcode').toBuffer(verificationUrl);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Your Nirvana Event Ticket',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #121225; color: white; padding: 20px; border-radius: 10px;">
        <h2 style="color: #ff2a6d; text-align: center;">Welcome to Nirvana, ${user.name}!</h2>
        <p style="text-align: center; color: #ffffff;">Your payment has been verified. Here's your ${user.passType} pass.</p>
        <div style="text-align: center; margin: 20px 0; background-color: white; padding: 20px; border-radius: 5px;">
          <img src="cid:qrCode" alt="Ticket QR Code" style="width: 250px;"/>
        </div>
        <p style="text-align: center; color: #ffffff;">Please show this QR code at the event entrance.</p>
        <p style="text-align: center; color: #05d9e8; font-weight: bold;">Transaction ID: ${user.transactionId}</p>
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #9d4edd; font-size: 12px;">This is an automated message. Please do not reply.</p>
        </div>
      </div>
    `,
    attachments: [{
      filename: 'qrcode.png',
      content: qrBuffer,
      cid: 'qrCode',
      contentType: 'image/png'
    }]
  };

  await transporter.sendMail(mailOptions);
}

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, passType, transactionId } = req.body;
    
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
    res.json({ 
      success: true, 
      message: 'Registration successful! We will send your ticket once payment is verified.' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all users for admin
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify payment
app.post('/api/users/:id/verify-payment', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.paymentVerified = true;
    await user.save();

    // Send verification email with QR code
    await sendVerificationEmail(user);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify ticket at venue
app.get('/api/verify/:transactionId', async (req, res) => {
  try {
    const user = await User.findOne({ transactionId: req.params.transactionId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid ticket' });
    }
    
    if (!user.paymentVerified) {
      return res.status(400).json({ success: false, message: 'Payment not verified' });
    }

    if (user.ticketVerified) {
      return res.status(400).json({ success: false, message: 'Ticket has already been used' });
    }
    
    user.ticketVerified = true;
    await user.save();
    
    res.json({ 
      success: true, 
      user: {
        name: user.name,
        passType: user.passType,
        transactionId: user.transactionId
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 