/**
 * Email alert utilities
 */

export interface AlertData {
  waterLevel: number;
  moistureLevel: number;
  alertType: 'water' | 'moisture' | 'both';
}

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
        console.error('💡 SOLUTION: Add RESEND_API_KEY to Vercel environment variables and redeploy');
      }
      
      return false;
    }

    console.log('✅ Email sent successfully:', result);
    return true;
  } catch (error: any) {
    console.error('❌ Network/Parse error sending email:', error);
    console.error('❌ Error message:', error.message);
    return false;
  }
}

