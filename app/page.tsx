"use client";

import { useState, useEffect, useRef } from "react";
import { WaterLevel } from "@/components/WaterLevel";
import { MoistureLevel } from "@/components/MoistureLevel";
import { WateringNotification } from "@/components/WateringNotification";
import { EmailSettings } from "@/components/EmailSettings";
import { getFirebaseValue } from "@/lib/firebase";
import { sendEmailAlert } from "@/lib/email-alerts";

// Convert soil-moisture sensor value to percentage
// 1300 = 100% moisture, 3900 = 0% moisture
// 50% threshold = 2600
const convertMoistureToPercentage = (sensorValue: number): number => {
  // Clamp value between 1300 and 3900
  const clampedValue = Math.max(1300, Math.min(3900, sensorValue));
  // Convert: (3900 - sensorValue) / (3900 - 1300) * 100
  // Range: 3900 - 1300 = 2600
  // Formula: (3900 - clampedValue) / 2600 * 100
  const percentage = ((3900 - clampedValue) / 2600) * 100;
  const result = Math.round(Math.max(0, Math.min(100, percentage)));

  // Debug log
  console.log(
    `Moisture conversion: ${sensorValue} → ${clampedValue} → ${percentage.toFixed(
      2
    )}% → ${result}%`
  );

  return result;
};

export default function Home() {
  const [waterLevel, setWaterLevel] = useState<number | null>(null);
  const [moistureLevel, setMoistureLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const notificationSentRef = useRef<string>("");

  const waterThreshold = 30; // Alert if water level < 30%
  const moistureThreshold = 50; // Alert if moisture level < 50%

  // Fetch data on mount and every 5 seconds
  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      try {
        setError(null);

        // Fetch water level percentage (structure: { value: number })
        const waterPercentData = await getFirebaseValue<{ value: number }>(
          "water-percent"
        );
        if (
          waterPercentData !== null &&
          typeof waterPercentData === "object" &&
          "value" in waterPercentData
        ) {
          setWaterLevel(waterPercentData.value);
        } else if (
          waterPercentData !== null &&
          typeof waterPercentData === "number"
        ) {
          // Fallback: if it's already a number
          setWaterLevel(waterPercentData);
        }

        // Fetch soil moisture sensor value (structure: { value: number })
        const soilMoistureData = await getFirebaseValue<{ value: number }>(
          "soil-moisture"
        );
        if (soilMoistureData !== null) {
          let sensorValue: number;
          if (
            typeof soilMoistureData === "object" &&
            "value" in soilMoistureData
          ) {
            sensorValue = soilMoistureData.value;
          } else if (typeof soilMoistureData === "number") {
            sensorValue = soilMoistureData;
          } else {
            throw new Error("Invalid soil-moisture data format");
          }
          const moisturePercent = convertMoistureToPercentage(sensorValue);
          setMoistureLevel(moisturePercent);
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data from Firebase");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Send email alerts when thresholds are crossed
  useEffect(() => {
    if (waterLevel !== null && moistureLevel !== null) {
      const waterLow = waterLevel < waterThreshold;
      const moistureLow = moistureLevel < moistureThreshold;

      console.log("🔍 Checking alert conditions:", {
        waterLevel,
        moistureLevel,
        waterThreshold,
        moistureThreshold,
        waterLow,
        moistureLow,
      });

      if (waterLow || moistureLow) {
        const alertKey = `${waterLevel}-${moistureLevel}`;
        // Only send email once per unique alert state
        if (notificationSentRef.current !== alertKey) {
          console.log("🚨 Alert triggered! Sending email...");
          console.log("Current levels:", { waterLevel, moistureLevel });
          notificationSentRef.current = alertKey;

          let alertType: "water" | "moisture" | "both";
          if (waterLow && moistureLow) {
            alertType = "both";
          } else if (waterLow) {
            alertType = "water";
          } else {
            alertType = "moisture";
          }

          sendEmailAlert(waterLevel, moistureLevel, alertType)
            .then((success) => {
              if (success) {
                console.log("✅ Email alert sent successfully");
              } else {
                console.error("❌ Email alert failed to send");
              }
            })
            .catch((err) => {
              console.error("❌ Error sending email:", err);
            });
        } else {
          console.log(
            "⏭️ Email already sent for this alert state, skipping..."
          );
        }
      } else {
        // Reset email tracking when levels are normal
        if (notificationSentRef.current !== "") {
          console.log("✅ Levels back to normal, resetting email tracking");
          notificationSentRef.current = "";
        }
      }
    }
  }, [waterLevel, moistureLevel, waterThreshold, moistureThreshold]);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Plant Watering System
        </h1>
        <p className="text-gray-600 mb-8">
          Monitor your plant&apos;s water and moisture levels
        </p>

        {/* Email Settings */}
        <div className="mb-6">
          <EmailSettings />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <p className="text-blue-800">Loading data from Firebase...</p>
          </div>
        )}

        {waterLevel !== null && moistureLevel !== null && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <WaterLevel level={waterLevel} threshold={waterThreshold} />
              <MoistureLevel
                level={moistureLevel}
                threshold={moistureThreshold}
              />
            </div>

            <WateringNotification
              waterLevel={waterLevel}
              moistureLevel={moistureLevel}
              waterThreshold={waterThreshold}
              moistureThreshold={moistureThreshold}
            />
          </>
        )}

        {!loading && waterLevel === null && moistureLevel === null && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <p className="text-yellow-800">
              No data available. Please check Firebase connection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
