# Vercel Environment Variable Setup

## Add Resend API Key to Vercel

### Step 1: Go to Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **Embeded-Project-Frontend**

### Step 2: Add Environment Variable

1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar
3. Click **Add New**
4. Enter:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_4BSWPfS1_NQ3ohFKWUp7LxpEZbukZVa4N`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click the **3 dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## After Setup

Once the environment variable is added and the app is redeployed:

1. ✅ Emails will be sent automatically when alerts trigger
2. ✅ Users can enter their email in the app
3. ✅ Emails will be sent to their inbox

## Testing

1. Enter your email in the app
2. Wait for water/moisture levels to drop below thresholds
3. Check your email inbox for the alert

## Important Notes

- The API key is now in `.env.local` for local development
- **DO NOT commit `.env.local` to git** (it's already in .gitignore)
- For production (Vercel), add it as an environment variable (see steps above)
- The free Resend tier allows 3,000 emails/month
