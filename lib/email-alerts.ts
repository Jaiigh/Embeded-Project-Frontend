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

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send email:', error);
      return false;
    }

    const result = await response.json();
    console.log('✅ Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

