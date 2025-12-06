'use client'

import { useState } from 'react'
import { WaterLevel } from '@/components/WaterLevel'
import { MoistureLevel } from '@/components/MoistureLevel'
import { WateringNotification } from '@/components/WateringNotification'

export default function Home() {
  const [waterLevel, setWaterLevel] = useState(75)
  const [moistureLevel, setMoistureLevel] = useState(65)
  const waterThreshold = 20
  const moistureThreshold = 30

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Plant Watering System
        </h1>
        <p className="text-gray-600 mb-8">
          Monitor your plant's water and moisture levels
        </p>

        {/* Test Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🧪 Test Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Level: {waterLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={waterLevel}
                onChange={(e) => setWaterLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-semibold">Threshold: {waterThreshold}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moisture Level: {moistureLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={moistureLevel}
                onChange={(e) => setMoistureLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-semibold">Threshold: {moistureThreshold}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <WaterLevel level={waterLevel} threshold={waterThreshold} />
          <MoistureLevel level={moistureLevel} threshold={moistureThreshold} />
        </div>

        <WateringNotification
          waterLevel={waterLevel}
          moistureLevel={moistureLevel}
          waterThreshold={waterThreshold}
          moistureThreshold={moistureThreshold}
        />
      </div>
    </main>
  )
}

