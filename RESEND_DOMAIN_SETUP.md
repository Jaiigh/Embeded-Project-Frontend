# Resend Domain Verification Guide

## Problem
Resend's test domain (`onboarding@resend.dev`) only allows sending emails to your own verified email address. To send to **any email address**, you need to verify your own domain.

## Solution: Verify Your Domain in Resend

### Step 1: Get a Domain (If You Don't Have One)

**Free Options:**
- **Freenom** (free domains like `.tk`, `.ml`, `.ga`) - [freenom.com](https://www.freenom.com)
- **Namecheap** (cheap domains ~$1-10/year) - [namecheap.com](https://www.namecheap.com)
- **Cloudflare** (at-cost pricing) - [cloudflare.com](https://www.cloudflare.com)

**Recommended for Testing:** Use a free subdomain service or a cheap domain.

### Step 2: Add Domain to Resend

1. Go to [resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com` or `mail.yourdomain.com`)
4. Click **"Add"**

### Step 3: Add DNS Records

Resend will show you DNS records to add. You need to add these to your domain's DNS settings:

#### Required Records:

1. **SPF Record** (TXT):
   ```
   v=spf1 include:resend.com ~all
   ```

2. **DKIM Records** (TXT):
   - Resend will provide 3 DKIM records
   - Add all of them to your DNS

3. **DMARC Record** (TXT) - Optional but recommended:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
   ```

#### Where to Add DNS Records:

**If using Cloudflare:**
1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **"Add record"**
5. Add each record as shown by Resend

**If using Namecheap:**
1. Go to Namecheap Dashboard
2. Domain List → Manage
3. Go to **Advanced DNS**
4. Add records

**If using other providers:**
- Look for "DNS Settings", "DNS Management", or "Zone Editor"

### Step 4: Wait for Verification

- DNS changes can take 5 minutes to 48 hours (usually 5-30 minutes)
- Resend will automatically verify when DNS records are detected
- Check status in Resend dashboard

### Step 5: Update Your Code

Once verified, update the `from` address in `app/api/send-email/route.ts`:

```typescript
from: 'Plant Watering System <alerts@yourdomain.com>',
```

Replace `yourdomain.com` with your verified domain.

### Step 6: Update Environment Variable (If Needed)

No changes needed - your existing `RESEND_API_KEY` will work with the verified domain.

### Step 7: Redeploy

1. Push your code changes
2. Or redeploy in Vercel
3. Test sending to any email!

## Alternative: Quick Testing Solution

If you just want to test quickly without domain setup:

**Option 1: Use the Allowed Email**
- Temporarily use `auming.itkit@gmail.com` as the recipient for testing

**Option 2: Use a Different Email Service**
- **SendGrid** (100 emails/day free)
- **Mailgun** (5,000 emails/month free)
- **AWS SES** (very cheap, requires AWS account)

## Verification Checklist

- [ ] Domain added to Resend
- [ ] DNS records added (SPF, DKIM)
- [ ] Domain verified in Resend dashboard
- [ ] Code updated with new `from` address
- [ ] Redeployed to Vercel
- [ ] Tested sending to different email addresses

## Troubleshooting

**Domain not verifying?**
- Check DNS records are correct
- Wait up to 48 hours for DNS propagation
- Use [mxtoolbox.com](https://mxtoolbox.com) to check DNS records

**Still can't send?**
- Make sure `from` address uses your verified domain
- Check Resend dashboard for error messages
- Verify API key is correct

## Need Help?

- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com

