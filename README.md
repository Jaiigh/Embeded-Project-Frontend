# Plant Watering System Frontend

A modern Next.js frontend for monitoring plant water and moisture levels using ESP32, HW-038 (water level sensor), and HW-080 (moisture sensor).

## Features

1. **Water Level Display** - View current water level with visual progress bar
2. **Moisture Level Display** - View current soil moisture level with visual progress bar
3. **Watering Notifications** - Alerts when water or moisture levels drop below thresholds

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Global styles
│   └── providers.tsx        # React Query provider setup
├── components/
│   ├── WaterLevel.tsx       # Water level display component
│   ├── MoistureLevel.tsx    # Moisture level display component
│   └── WateringNotification.tsx  # Alert notification component
└── package.json
```

## Components

### WaterLevel
Displays the current water level with:
- Visual progress bar (blue/yellow/red based on level)
- Percentage display
- Status indicator (Normal/Low)
- Configurable threshold (default: 20%)

### MoistureLevel
Displays the current soil moisture level with:
- Visual progress bar (green/yellow/red based on level)
- Percentage display
- Status indicator (Normal/Low)
- Configurable threshold (default: 30%)

### WateringNotification
Shows alerts when:
- Water level drops below threshold
- Moisture level drops below threshold
- Both levels are low (critical alert)

## Mock Data

Currently, the components use mock data:
- Water Level: 75% (default)
- Moisture Level: 65% (default)

These will be replaced with real data from Firebase/ESP32 in future implementation steps.

## Next Steps

1. Set up Firebase connection
2. Create API layer for ESP32 data
3. Implement real-time data fetching
4. Add data validation with Zod schemas
5. Connect to actual sensor readings

