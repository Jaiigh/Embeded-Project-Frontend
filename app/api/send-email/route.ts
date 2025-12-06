import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, waterLevel, moistureLevel, alertType } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
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

    // Using Resend for email sending
    // Get API key from: https://resend.com
    // Add RESEND_API_KEY to Vercel environment variables
    
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
          from: 'Plant Watering System <onboarding@resend.dev>', // Using Resend's test domain - works for testing
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
        
        if (error) {
          throw error;
        }
        
        console.log('✅ Email sent via Resend:', data);
        return NextResponse.json({
          success: true,
          message: 'Email sent successfully',
        });
      } catch (resendError: any) {
        console.error('Resend error:', resendError);
        // Fall through to logging
      }
    }

    // If Resend is not configured, log the email (for development)
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 Email would be sent (Resend not configured):', {
        to: email,
        subject,
        body,
      });
      console.log('💡 To enable email sending:');
      console.log('   1. Sign up at https://resend.com');
      console.log('   2. Get your API key');
      console.log('   3. Add RESEND_API_KEY to Vercel environment variables');
      
      return NextResponse.json({
        success: true,
        message: 'Email logged (Resend API key not configured - see console for setup instructions)',
      });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

