# Troubleshooting Email Alerts

## Common Issues and Solutions

### 1. No Email Received

**Check these in order:**

#### ✅ Step 1: Verify Email is Saved
1. Open the app in your browser
2. Check the "📧 Email Alerts" section
3. Make sure your email is entered and saved
4. Check browser console (F12) - you should see "Email saved!" message

#### ✅ Step 2: Verify Thresholds are Crossed
- **Water Level**: Must be below 30%
- **Moisture Level**: Must be below 50%
- Check the dashboard to see current levels
- If levels are above thresholds, emails won't be sent

#### ✅ Step 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for these messages:
   - `🚨 Alert triggered! Sending email...`
   - `📧 Attempting to send email alert:`
   - `✅ Email sent successfully:` or `❌ Failed to send email:`

#### ✅ Step 4: Check Vercel Logs
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Logs** tab
4. Look for email-related logs:
   - `📧 Email API called with:`
   - `📤 Sending email via Resend to:`
   - `✅ Email sent successfully via Resend:` or error messages

#### ✅ Step 5: Verify Environment Variable
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify `RESEND_API_KEY` exists
3. **IMPORTANT**: After adding/changing environment variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

#### ✅ Step 6: Check Resend Dashboard
1. Go to [resend.com](https://resend.com)
2. Log in to your account
3. Go to **Logs** or **Emails** section
4. Check if emails were sent and their status (delivered, bounced, etc.)

### 2. Email Sent But Not Received

**Possible causes:**

- **Check Spam/Junk Folder**: Emails from `onboarding@resend.dev` might go to spam
- **Email Provider Blocking**: Some email providers block test domains
- **Resend Limits**: Check if you've exceeded free tier (3,000 emails/month)

### 3. "RESEND_API_KEY not found" Error

**Solution:**
1. Make sure you added the environment variable in Vercel
2. **Redeploy** after adding the variable (this is critical!)
3. Check that the variable name is exactly `RESEND_API_KEY` (case-sensitive)

### 4. "Failed to send email" Error

**Check Vercel logs for details:**
- Invalid API key format
- Resend API error (check Resend dashboard)
- Network issues

### 5. Testing Email Sending

**To test if emails work:**

1. **Lower the thresholds temporarily** in `app/page.tsx`:
   ```typescript
   const waterThreshold = 100; // Test with any water level
   const moistureThreshold = 100; // Test with any moisture level
   ```

2. **Or manually trigger** by checking browser console and calling:
   ```javascript
   // In browser console
   localStorage.setItem('plant-watering-email', 'your-email@example.com');
   // Then wait for alert or refresh page
   ```

### 6. Debug Checklist

- [ ] Email saved in localStorage (check browser console)
- [ ] Water/moisture levels below thresholds
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] App redeployed after adding environment variable
- [ ] Browser console shows "🚨 Alert triggered!"
- [ ] Vercel logs show email API being called
- [ ] Resend dashboard shows email attempts
- [ ] Check spam folder

### 7. Quick Test

**To quickly test if everything is working:**

1. Open browser console (F12)
2. Enter your email:
   ```javascript
   localStorage.setItem('plant-watering-email', 'your-email@example.com');
   ```
3. Manually call the API (in console):
   ```javascript
   fetch('/api/send-email', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'your-email@example.com',
       waterLevel: 20,
       moistureLevel: 40,
       alertType: 'both'
     })
   }).then(r => r.json()).then(console.log);
   ```
4. Check Vercel logs and your email inbox

## Still Not Working?

1. **Check Vercel Function Logs** - Most detailed error info
2. **Check Resend Dashboard** - See if emails are being sent
3. **Verify API Key** - Make sure it's correct and active
4. **Test with a different email** - Some email providers block test domains

