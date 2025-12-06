/**
 * Email alert utilities
 */

export interface AlertData {
  waterLevel: number;
  moistureLevel: number;
  alertType: 'water' | 'moisture' | 'both';
}

// Rate limiting: Minimum time between emails (1 minute in milliseconds)
const EMAIL_COOLDOWN_MS = 1 * 60 * 1000; // 1 minute

/**
 * Get saved email from localStorage
 */
export function getSavedEmail(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('plant-watering-email');
}

/**
 * Check if enough time has passed since last email
 */
function canSendEmail(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const lastEmailTime = localStorage.getItem('last-email-sent-time');
  if (!lastEmailTime) {
    return true; // No previous email sent
  }
  
  const lastTime = parseInt(lastEmailTime, 10);
  const now = Date.now();
  const timeSinceLastEmail = now - lastTime;
  
  if (timeSinceLastEmail < EMAIL_COOLDOWN_MS) {
    const minutesRemaining = Math.ceil((EMAIL_COOLDOWN_MS - timeSinceLastEmail) / 60000);
    console.log(`⏳ Email cooldown active. Please wait ${minutesRemaining} more minute(s) before sending another email.`);
    return false;
  }
  
  return true;
}

/**
 * Record that an email was sent
 */
function recordEmailSent(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('last-email-sent-time', Date.now().toString());
  }
}

/**
 * Send email alert
 */
export async function sendEmailAlert(
  waterLevel: number,
  moistureLevel: number,
  alertType: 'water' | 'moisture' | 'both'
): Promise<boolean> {
  const email = getSavedEmail();
  
  if (!email) {
    console.log('No email address saved');
    return false;
  }

  // Check rate limiting
  if (!canSendEmail()) {
    console.log('⏭️ Skipping email send due to cooldown period');
    return false;
  }

  try {
    console.log('📧 Attempting to send email alert:', { email, waterLevel, moistureLevel, alertType });
    
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        waterLevel,
        moistureLevel,
        alertType,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Failed to send email - Status:', response.status);
      console.error('❌ Error:', result.error);
      console.error('❌ Details:', result.details);
      console.error('❌ Full response:', JSON.stringify(result, null, 2));
      
      // Show user-friendly error
      if (result.error === 'Email service not configured') {
        console.error('💡 SOLUTION: Add SMTP environment variables to Vercel and redeploy');
      }
      
      return false;
    }

    // Record successful email send
    recordEmailSent();
    console.log('✅ Email sent successfully:', result);
    return true;
  } catch (error: any) {
    console.error('❌ Network/Parse error sending email:', error);
    console.error('❌ Error message:', error.message);
    return false;
  }
}

