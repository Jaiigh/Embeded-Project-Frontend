"use client";

import { useState, useEffect } from "react";

interface WateringNotificationProps {
  waterLevel: number;
  moistureLevel: number;
  waterThreshold?: number;
  moistureThreshold?: number;
}

export function WateringNotification({
  waterLevel,
  moistureLevel,
  waterThreshold = 30,
  moistureThreshold = 40,
}: WateringNotificationProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const waterLow = waterLevel < waterThreshold;
  const moistureLow = moistureLevel < moistureThreshold;
  const shouldAlert = (waterLow || moistureLow) && !isDismissed;

  // Reset dismissal when levels change
  useEffect(() => {
    setIsDismissed(false);
  }, [waterLevel, moistureLevel]);

  if (!shouldAlert) {
    return null;
  }

  const getAlertMessage = () => {
    if (waterLow && moistureLow) {
      return "Water level and moisture level are both low! Please water your plant immediately.";
    } else if (waterLow) {
      return `Water level is low (${waterLevel}%). Please refill the water reservoir.`;
    } else {
      return `Moisture level is low (${moistureLevel}%). Please water your plant.`;
    }
  };

  const getAlertType = () => {
    if (waterLow && moistureLow) {
      return "critical";
    } else if (waterLow) {
      return "warning";
    } else {
      return "warning";
    }
  };

  const alertType = getAlertType();
  const bgColor =
    alertType === "critical"
      ? "bg-red-50 border-red-300"
      : "bg-yellow-50 border-yellow-300";
  const textColor =
    alertType === "critical" ? "text-red-800" : "text-yellow-800";
  const iconColor =
    alertType === "critical" ? "text-red-600" : "text-yellow-600";

  return (
    <div
      className={`${bgColor} border-2 rounded-xl p-6 shadow-lg animate-pulse`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className={`${iconColor} flex-shrink-0`}>
            {alertType === "critical" ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
              {alertType === "critical" ? "⚠️ Critical Alert" : "⚠️ Warning"}
            </h3>
            <p className={`${textColor} text-lg`}>{getAlertMessage()}</p>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className={`ml-4 ${textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Dismiss notification"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
