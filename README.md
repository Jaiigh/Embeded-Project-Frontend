# Plant Watering System Frontend

A modern Next.js frontend for monitoring plant water and moisture levels using ESP32, HW-038 (water level sensor), and HW-080 (moisture sensor).

## Features

1. **Water Level Display** - View current water level with visual progress bar
2. **Moisture Level Display** - View current soil moisture level with visual progress bar
3. **Email Alerts** - Receive email notifications when water level drops below 30%
4. **Real-time Monitoring** - Fetches data from Firebase every 2 seconds

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase Realtime Database configured
- SMTP email service (Gmail, Outlook, or custom SMTP)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (see `SMTP_SETUP.md` for email setup)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Global styles
│   ├── providers.tsx        # React Query provider setup
│   └── api/
│       └── send-email/      # Email sending API route
├── components/
│   ├── WaterLevel.tsx       # Water level display component
│   ├── MoistureLevel.tsx    # Moisture level display component
│   ├── WateringNotification.tsx  # Visual alert component
│   └── EmailSettings.tsx    # Email configuration component
├── lib/
│   ├── firebase.ts          # Firebase connection utilities
│   └── email-alerts.ts      # Email alert utilities
└── package.json
```

## Components

### WaterLevel
Displays the current water level with:
- Visual progress bar (blue/yellow/red based on level)
- Percentage display
- Status indicator (Normal/Low)
- Configurable threshold (default: 30%)

### MoistureLevel
Displays the current soil moisture level with:
- Visual progress bar (green/yellow/red based on level)
- Percentage display
- Status indicator (Normal/Low)
- Configurable threshold (default: 50%)

### WateringNotification
Shows visual alerts when:
- Water level drops below threshold
- Moisture level drops below threshold
- Both levels are low (critical alert)

### EmailSettings
Allows users to:
- Enter and save their email address
- Receive email alerts when water level is low

## Firebase Integration

The app fetches data from Firebase Realtime Database:
- **Water Level**: `/water-percent` (structure: `{ value: number }`)
- **Moisture Level**: `/soil-moisture` (structure: `{ value: number }`)

Moisture sensor values are converted:
- 1300 = 100% moisture
- 3900 = 0% moisture
- 2600 = 50% threshold

## Email Alerts

Email alerts are sent via SMTP when:
- Water level drops below 30%
- Rate limited to 1 email per minute

See `SMTP_SETUP.md` for email configuration instructions.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
4. Deploy

## Documentation

- **SMTP_SETUP.md** - Email configuration guide
- **FIREBASE_SETUP.md** - Firebase setup instructions

## Next Steps

1. Set up Firebase connection
2. Configure SMTP email service
3. Connect to actual ESP32 sensors
4. Deploy to production
