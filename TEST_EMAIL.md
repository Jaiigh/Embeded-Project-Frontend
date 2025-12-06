# Quick Email Test Guide

## Test Email API Directly

Open your browser console (F12) on your deployed app and run:

```javascript
// Test the email API directly
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your-email@example.com', // Replace with your email
    waterLevel: 20,
    moistureLevel: 40,
    alertType: 'both'
  })
})
.then(r => r.json())
.then(result => {
  console.log('📧 Email API Response:', result);
  if (result.success) {
    console.log('✅ SUCCESS! Check your email inbox');
  } else {
    console.error('❌ ERROR:', result.error, result.details);
  }
})
.catch(err => {
  console.error('❌ Network Error:', err);
});
```

## Expected Results

### ✅ Success Response:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": { "id": "..." }
}
```

### ❌ Error Responses:

**If API key missing:**
```json
{
  "error": "Email service not configured",
  "details": "RESEND_API_KEY environment variable is missing..."
}
```

**If Resend API error:**
```json
{
  "error": "Failed to send email",
  "details": "..."
}
```

## Check Vercel Logs

1. Go to Vercel Dashboard → **Logs** tab
2. Look for:
   - `📧 Email API called with:` - Shows the request was received
   - `📤 Sending email via Resend to:` - Shows it's trying to send
   - `✅ Email sent successfully via Resend:` - Success!
   - `❌ Resend API error:` - Error details

## Check Browser Console

1. Open your deployed app
2. Press F12 to open DevTools
3. Go to **Console** tab
4. Look for:
   - `🚨 Alert triggered! Sending email...`
   - `📧 Attempting to send email alert:`
   - `✅ Email sent successfully:` or error messages

## Verify Environment Variable

The logs will show:
- `❌ RESEND_API_KEY not found in environment variables` - Variable not set
- `📤 Sending email via Resend to:` - Variable is set and working

