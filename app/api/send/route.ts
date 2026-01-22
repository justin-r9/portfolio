
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // 1. Data extraction remains standard to match the form
    const { name, email, message } = await req.json();

    // 2. Transporter configuration using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.ZEPTO_HOST, // e.g., smtp.zeptomail.com
      port: Number(process.env.ZEPTO_PORT), // e.g., 587
      secure: false, // Must be false for Port 587 (STARTTLS)
      auth: {
        user: process.env.ZEPTO_USER, // e.g., emailapikey
        pass: process.env.ZEPTO_PASS, // The "Password 1" from your screenshot
      },
    });

    // 3. Automated dispatch
    await transporter.sendMail({
      from: `"Iyidobi Portfolio" <${process.env.SENDER_EMAIL}>`, // contact@iyidobi.com
      to: process.env.RECEIVER_EMAIL, // Your professional inbox
      replyTo: email, // Directly reply to the inquirer
      subject: `New Inquiry from ${name}`,
      text: `Inquiry Details:\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Vercel Backend Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
