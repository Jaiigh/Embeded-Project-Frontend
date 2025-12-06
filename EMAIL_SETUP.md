# Email Alert Setup Guide

## Overview

The app now sends email alerts instead of mobile notifications when water/moisture levels drop below thresholds.

## Quick Setup with Resend (Recommended)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Go to API Keys section
4. Create a new API key
5. Copy the API key

### Step 2: Add API Key to Vercel

1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
4. Save and redeploy

### Step 3: Update Email API Route

The email API route is at `app/api/send-email/route.ts`. Uncomment the Resend code and add your domain.

## Alternative: Using Nodemailer with SMTP

If you prefer using your own email server or Gmail:

1. Install nodemailer:

   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. Add environment variables to Vercel:

   - `SMTP_HOST` - Your SMTP server (e.g., smtp.gmail.com)
   - `SMTP_PORT` - Port (usually 587)
   - `SMTP_USER` - Your email address
   - `SMTP_PASS` - Your email password or app password
   - `SMTP_FROM` - From email address

3. Uncomment the Nodemailer code in `app/api/send-email/route.ts`

## How It Works

1. User enters their email in the "Email Alerts" section
2. Email is saved to localStorage
3. When water level < 30% or moisture < 50%, an email is automatically sent
4. Email is only sent once per alert state (to avoid spam)

## Testing

1. Enter your email address
2. Click "Save"
3. Wait for water/moisture levels to drop below thresholds
4. Check your email inbox

## Email Service Options

### Free Tier Options:

- **Resend**: 3,000 emails/month (Recommended - easiest)
- **SendGrid**: 100 emails/day
- **Mailgun**: 5,000 emails/month
- **Gmail SMTP**: Free (requires app password)

### Paid Options:

- **AWS SES**: Very cheap ($0.10 per 1,000 emails)
- **Postmark**: $15/month for 10,000 emails
