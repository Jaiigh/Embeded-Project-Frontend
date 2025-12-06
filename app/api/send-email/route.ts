import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    // Check if API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing. Please add it to Vercel environment variables.'
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
      const resend = new Resend(apiKey);
      
      console.log('📤 Sending email via Resend to:', email);
      
      const { data, error } = await resend.emails.send({
        from: 'Plant Watering System <onboarding@resend.dev>',
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
        console.error('❌ Resend API error:', error);
        return NextResponse.json(
          { 
            error: 'Failed to send email',
            details: error.message || JSON.stringify(error)
          },
          { status: 500 }
        );
      }
      
      console.log('✅ Email sent successfully via Resend:', data);
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        data: data,
      });
    } catch (resendError: any) {
      console.error('❌ Exception sending email:', resendError);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: resendError.message || String(resendError)
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

