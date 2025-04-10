import mongoose from 'mongoose';

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

export default mongoose.models.User || mongoose.model('User', userSchema); 