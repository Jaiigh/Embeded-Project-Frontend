"use client";

import { useState, useEffect } from "react";
import {
  requestNotificationPermission,
  canSendNotifications,
} from "@/lib/mobile-notifications";

export function NotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null
  );
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    const granted = await requestNotificationPermission();
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
    setIsRequesting(false);

    if (granted) {
      // Show a test notification
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification("✅ Notifications Enabled!", {
            body: "You will now receive alerts when your plant needs water.",
            icon: "/icon-192x192.png",
            badge: "/icon-192x192.png",
            tag: "permission-granted",
          });
        } catch (error) {
          console.error("Error showing test notification:", error);
        }
      }
    }
  };

  if (typeof window === "undefined" || !("Notification" in window)) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
        <p className="text-yellow-800">
          ⚠️ Your browser does not support notifications
        </p>
      </div>
    );
  }

  if (permission === "granted") {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
        <p className="text-green-800 font-semibold">
          ✅ Notifications are enabled! You will receive alerts when your plant
          needs water.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
      <p className="text-blue-800 mb-3">
        🔔 Enable notifications to get alerts when your plant needs water!
      </p>
      <button
        onClick={handleRequestPermission}
        disabled={isRequesting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRequesting ? "Requesting..." : "Enable Notifications"}
      </button>
    </div>
  );
}

