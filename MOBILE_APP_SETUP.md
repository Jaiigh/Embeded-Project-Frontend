# Mobile App Setup Guide

Your Next.js app is now configured as a **Progressive Web App (PWA)** that can be installed on mobile devices and send push notifications! 🎉

## ✅ What's Been Set Up

1. **PWA Configuration** - App can be installed on iOS/Android
2. **Push Notifications** - Alerts when water/moisture levels are low
3. **Service Worker** - Works offline and in background
4. **App Icons** - Need to be created (see below)

## 📱 How to Install on Mobile

### Android (Chrome)

1. Open your app in Chrome browser
2. Tap the menu (3 dots) → **"Add to Home screen"** or **"Install app"**
3. Tap **"Install"**
4. The app icon will appear on your home screen
5. Open it like a regular app!

### iOS (Safari)

1. Open your app in Safari browser
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. The app icon will appear on your home screen

## 🔔 Setting Up Notifications

1. **Enable Notifications**:

   - Open the app
   - You'll see a blue banner asking to enable notifications
   - Tap **"Enable Notifications"**
   - Allow notifications when prompted

2. **Test Notifications**:
   - Use the test controls to lower water/moisture levels below thresholds
   - You should receive a push notification on your phone!

## 🎨 Creating App Icons

You need to create two icon files:

1. **`/public/icon-192x192.png`** - 192x192 pixels
2. **`/public/icon-512x512.png`** - 512x512 pixels

### Quick Icon Creation:

**Option 1: Use an online tool**

- Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
- Upload a plant/water icon
- Generate and download the icons
- Place them in the `/public` folder

**Option 2: Use a simple emoji/icon**

- Create a simple icon with a plant/water drop
- Use tools like Canva, Figma, or any image editor
- Export as PNG with exact dimensions

**Option 3: Use a placeholder (for testing)**

```bash
# Create simple colored squares as placeholders
# You can replace these later with proper icons
```

## 🚀 Deploying for Mobile

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy (it's free!)
5. Access your app via the Vercel URL
6. Install on mobile from the deployed URL

### Option 2: Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Deploy
5. Access via Netlify URL

### Option 3: Self-hosted

1. Build the app: `npm run build`
2. Start the server: `npm start`
3. Make sure it's accessible via HTTPS (required for PWA)
4. Access from mobile device

## 📋 Features

### ✅ Works Offline

- Service worker caches the app
- Can view data even without internet
- Firebase data is cached for 5 minutes

### ✅ Push Notifications

- Get alerts when water level < 20%
- Get alerts when moisture level < 30%
- Critical alerts when both are low
- Notifications work even when app is closed

### ✅ App-like Experience

- Full screen (no browser UI)
- Standalone mode
- Fast loading
- Native feel

## 🔧 Troubleshooting

### Notifications Not Working?

1. **Check Permissions**:

   - iOS: Settings → Safari → Notifications
   - Android: Settings → Apps → Your App → Notifications

2. **HTTPS Required**:

   - PWAs require HTTPS (except localhost)
   - Make sure your deployed URL uses HTTPS

3. **Service Worker**:
   - Check browser console for errors
   - Clear cache and reload

### App Won't Install?

1. **Check Browser**:

   - Android: Use Chrome
   - iOS: Use Safari (not Chrome)

2. **Check Manifest**:

   - Open `/public/manifest.json`
   - Verify icons exist

3. **Clear Cache**:
   - Clear browser cache
   - Try again

## 📱 Testing on Mobile

### Test Locally on Your Phone

1. **Find your computer's IP**:

   ```bash
   # Mac/Linux
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

2. **Start dev server with network access**:

   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. **On your phone**:
   - Connect to same WiFi
   - Open browser: `http://YOUR_IP:3000`
   - Install the app!

## 🎯 Next Steps

1. ✅ Create app icons (see above)
2. ✅ Deploy to Vercel/Netlify
3. ✅ Test on your phone
4. ✅ Enable notifications
5. ✅ Connect to real Firebase data
6. ✅ Test with actual ESP32 sensors

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Next.js PWA](https://github.com/shadowwalker/next-pwa)
- [Web Push Notifications](https://web.dev/push-notifications-overview/)

---

**No need for a separate repo!** Your existing Next.js app is now a mobile app! 🎉
