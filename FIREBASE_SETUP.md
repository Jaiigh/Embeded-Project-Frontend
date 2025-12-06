# Firebase Setup Guide

## Current Status

The Firebase database at `https://embedproject-ac1d3-default-rtdb.asia-southeast1.firebasedatabase.app/` is currently returning "Permission denied" errors. This means the database has security rules that prevent public access.

## How to Get Values from Firebase

### Option 1: Update Firebase Security Rules (Recommended for Development)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `embedproject-ac1d3`
3. Navigate to **Realtime Database** > **Rules**
4. Update the rules to allow read access:

```json
{
  "rules": {
    ".read": true,
    ".write": false
  }
}
```

**⚠️ Warning**: This makes your database publicly readable. Only use for development!

For production, use more restrictive rules:
```json
{
  "rules": {
    "test": {
      ".read": true,
      ".write": false
    },
    "waterLevel": {
      ".read": true,
      ".write": false
    },
    "moistureLevel": {
      ".read": true,
      ".write": false
    }
  }
}
```

### Option 2: Use Firebase Authentication

If you need authentication, update `lib/firebase.ts` to include authentication:

```typescript
import { getAuth, signInAnonymously } from 'firebase/auth'

// After initializing app
const auth = getAuth(app)
await signInAnonymously(auth)
```

### Option 3: Use REST API with Query Parameters

If you have a public API key, you can use:
```
https://embedproject-ac1d3-default-rtdb.asia-southeast1.firebasedatabase.app/test.json?auth=YOUR_AUTH_TOKEN
```

## Testing the Connection

### Method 1: Using the UI Component

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Scroll down to the "Firebase Test" section
4. Click "Get Test Value from Firebase"
5. The value will be displayed (or an error if permissions are denied)

### Method 2: Using the API Route

```bash
curl http://localhost:3000/api/test-firebase
```

### Method 3: Using the Test Script

```bash
node scripts/test-firebase.js
```

## Current Test Value

To see the current value of "test" from Firebase:

1. **Update Security Rules** (see Option 1 above)
2. **Run the test script**: `node scripts/test-firebase.js`
3. **Or use the UI component** on the homepage

## Code Examples

### Get a Single Value

```typescript
import { getFirebaseValue } from '@/lib/firebase'

const testValue = await getFirebaseValue('test')
console.log('Test value:', testValue)
```

### Subscribe to Real-time Updates

```typescript
import { subscribeToFirebaseValue } from '@/lib/firebase'

const unsubscribe = subscribeToFirebaseValue('test', (value) => {
  console.log('Test value updated:', value)
})

// Later, to stop listening:
unsubscribe()
```

### Get Water and Moisture Levels

```typescript
const waterLevel = await getFirebaseValue<number>('waterLevel')
const moistureLevel = await getFirebaseValue<number>('moistureLevel')
```

## Troubleshooting

### Error: "Permission denied"
- **Solution**: Update Firebase security rules (see Option 1)

### Error: "Network error"
- **Solution**: Check your internet connection and Firebase project status

### Error: "Database not found"
- **Solution**: Verify the database URL in `lib/firebase.ts`

## Next Steps

1. Update Firebase security rules to allow read access
2. Test the connection using the UI component
3. Integrate real-time data fetching into WaterLevel and MoistureLevel components
4. Replace mock data with actual Firebase values

