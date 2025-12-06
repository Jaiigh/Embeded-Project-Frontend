import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, waterLevel, moistureLevel, alertType } = await request.json();

    console.log('📧 Email API called with:', { email, waterLevel, moistureLevel, alertType });

    if (!email || !email.includes('@')) {
      console.error('❌ Invalid email:', email);
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('❌ SMTP configuration missing');
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'SMTP environment variables are missing. Please add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS to Vercel environment variables.'
        },
        { status: 500 }
      );
    }

    // Email content
    const subject = '🌱 Plant Watering Alert';
    let body = '';

    if (alertType === 'both') {
      body = `Water level (${waterLevel}%) and moisture level (${moistureLevel}%) are both low! Please water your plant immediately.`;
    } else if (alertType === 'water') {
      body = `Water level is low (${waterLevel}%). Please refill the water reservoir.`;
    } else if (alertType === 'moisture') {
      body = `Moisture level is low (${moistureLevel}%). Please water your plant.`;
    }

    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: smtpPort === '465', // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      console.log('📤 Sending email via SMTP to:', email);
      console.log('📤 Using SMTP server:', smtpHost, 'Port:', smtpPort);
      
      // Send email
      const info = await transporter.sendMail({
        from: smtpFrom || `Plant Watering System <${smtpUser}>`,
        to: email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #22c55e; margin-bottom: 20px;">🌱 Plant Watering Alert</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">${body}</p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">Water Level: ${waterLevel}%</p>
                <p style="color: #666; font-size: 14px;">Moisture Level: ${moistureLevel}%</p>
              </div>
            </div>
          </div>
        `,
      });
      
      console.log('✅ Email sent successfully via SMTP:', info.messageId);
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId,
      });
    } catch (smtpError: any) {
      console.error('❌ SMTP error:', smtpError);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: smtpError.message || String(smtpError)
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error in email API route:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
