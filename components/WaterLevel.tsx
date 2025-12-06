'use client'

interface WaterLevelProps {
  level: number // 0-100 percentage
  threshold?: number // Alert threshold (default: 20%)
}

export function WaterLevel({
  level,
  threshold = 20,
}: WaterLevelProps) {
  const isLow = level < threshold
  const levelColor = isLow
    ? 'bg-red-500'
    : level < 50
    ? 'bg-yellow-500'
    : 'bg-blue-500'

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Water Level
        </h2>
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Current Level</span>
          <span
            className={`text-3xl font-bold ${
              isLow ? 'text-red-600' : 'text-blue-600'
            }`}
          >
            {level}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full ${levelColor} transition-all duration-500 ease-out rounded-full flex items-center justify-end pr-2`}
            style={{ width: `${level}%` }}
          >
            {level > 10 && (
              <span className="text-xs font-semibold text-white">
                {level}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Threshold: {threshold}% | Status:{' '}
        <span className={isLow ? 'text-red-600 font-semibold' : 'text-green-600'}>
          {isLow ? 'Low' : 'Normal'}
        </span>
      </div>
    </div>
  )
}

