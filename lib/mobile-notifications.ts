/**
 * Mobile notification utilities for PWA
 * Works with service worker for background notifications
 */

export interface NotificationData {
  waterLevel: number;
  moistureLevel: number;
  waterThreshold: number;
  moistureThreshold: number;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Check if notifications are supported and permitted
 */
export function canSendNotifications(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    'Notification' in window &&
    Notification.permission === 'granted'
  );
}

/**
 * Send a mobile notification via service worker
 */
export async function sendMobileNotification(
  title: string,
  body: string,
  data?: NotificationData
): Promise<void> {
  if (!canSendNotifications()) {
    console.warn('Notifications not permitted');
    return;
  }

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Service worker notifications support additional options
      const notificationOptions: any = {
        body,
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: 'plant-alert',
        requireInteraction: true,
        vibrate: [200, 100, 200],
        data: data || {},
        actions: [
          {
            action: 'view',
            title: 'View',
          },
          {
            action: 'dismiss',
            title: 'Dismiss',
          },
        ],
      };
      
      await registration.showNotification(title, notificationOptions);
      
      console.log('Mobile notification sent:', title);
    } catch (error) {
      console.error('Error sending notification:', error);
      // Fallback to regular notification
      if ('Notification' in window) {
        new Notification(title, {
          body,
          icon: '/icon-192x192.png',
        });
      }
    }
  } else {
    // Fallback if service worker not available
    if ('Notification' in window) {
      new Notification(title, {
        body,
        icon: '/icon-192x192.png',
      });
    }
  }
}

/**
 * Send watering alert notification
 */
export async function sendWateringAlert(
  waterLevel: number,
  moistureLevel: number,
  waterThreshold: number,
  moistureThreshold: number
): Promise<void> {
  const waterLow = waterLevel < waterThreshold;
  const moistureLow = moistureLevel < moistureThreshold;

  let title = '🌱 Plant Alert';
  let body = '';

  if (waterLow && moistureLow) {
    body = `Water level (${waterLevel}%) and moisture level (${moistureLevel}%) are both low! Please water your plant immediately.`;
  } else if (waterLow) {
    body = `Water level is low (${waterLevel}%). Please refill the water reservoir.`;
  } else if (moistureLow) {
    body = `Moisture level is low (${moistureLevel}%). Please water your plant.`;
  } else {
    return; // No alert needed
  }

  await sendMobileNotification(title, body, {
    waterLevel,
    moistureLevel,
    waterThreshold,
    moistureThreshold,
  });
}

