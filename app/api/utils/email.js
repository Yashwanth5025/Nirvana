import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(user) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${user.transactionId}`;
  const qrBuffer = await QRCode.toBuffer(verificationUrl);

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