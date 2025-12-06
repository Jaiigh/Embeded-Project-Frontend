/**
 * Notification utilities for PWA push notifications
 */

export interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
  data?: any
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

/**
 * Check if notifications are supported and permitted
 */
export function canSendNotifications(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    Notification.permission === 'granted'
  )
}

/**
 * Send a browser notification
 */
export async function sendNotification(options: NotificationOptions): Promise<void> {
  if (typeof window === 'undefined') {
    return
  }
  
  if (!canSendNotifications()) {
    console.warn('Notifications not permitted or not supported')
    return
  }

  // Register service worker if not already registered
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready
      
      // Service worker notifications support additional options
      const notificationOptions: any = {
        body: options.body,
        icon: options.icon || '/icon-192x192.png',
        badge: options.badge || '/icon-192x192.png',
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
        data: options.data,
        vibrate: [200, 100, 200],
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
      }
      
      await registration.showNotification(options.title, notificationOptions)
    } catch (error) {
      console.error('Error showing notification:', error)
      // Fallback to regular notification if service worker fails
      new Notification(options.title, {
        body: options.body,
        icon: options.icon,
        tag: options.tag,
      })
    }
  }
}

/**
 * Send a watering alert notification
 */
export async function sendWateringAlert(
  type: 'water' | 'moisture' | 'both',
  waterLevel?: number,
  moistureLevel?: number
): Promise<void> {
  let title = '🌱 Plant Alert'
  let body = ''

  if (type === 'both') {
    body = `Water level (${waterLevel}%) and moisture level (${moistureLevel}%) are both low! Please water your plant immediately.`
  } else if (type === 'water') {
    body = `Water level is low (${waterLevel}%). Please refill the water reservoir.`
  } else {
    body = `Moisture level is low (${moistureLevel}%). Please water your plant.`
  }

  await sendNotification({
    title,
    body,
    tag: 'watering-alert',
    requireInteraction: true,
    data: {
      type: 'watering-alert',
      waterLevel,
      moistureLevel,
    },
  })
}

