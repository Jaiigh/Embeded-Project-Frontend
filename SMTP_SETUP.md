# SMTP Email Setup Guide

## Overview

The app now uses SMTP to send emails, which allows you to use Gmail, Outlook, or any custom SMTP server.

## Quick Setup Options

### Option 1: Gmail (Easiest - Recommended)

**Step 1: Enable 2-Factor Authentication**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

**Step 2: Create App Password**

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Enter "Plant Watering System"
4. Click "Generate"
5. **Copy the 16-character password** (you'll need this)

**Step 3: Add Environment Variables to Vercel**
Go to Vercel Dashboard → Settings → Environment Variables, add:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=Plant Watering System <your-email@gmail.com>
```

**Step 4: Redeploy**
Redeploy your app in Vercel.

---

### Option 2: Outlook/Hotmail

**Step 1: Enable App Password**

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Create new app password for "Mail"
5. Copy the password

**Step 2: Add Environment Variables**

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-app-password
SMTP_FROM=Plant Watering System <your-email@outlook.com>
```

---

### Option 3: Custom SMTP Server

If you have your own email server or use a service like:

- **SendGrid** (SMTP)
- **Mailgun** (SMTP)
- **AWS SES** (SMTP)
- **Zoho Mail**
- **ProtonMail** (Business)

**Add Environment Variables:**

```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587 (or 465 for SSL)
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=Plant Watering System <your-email@domain.com>
```

---

## Environment Variables Reference

| Variable    | Description                          | Example                                        |
| ----------- | ------------------------------------ | ---------------------------------------------- |
| `SMTP_HOST` | SMTP server address                  | `smtp.gmail.com`                               |
| `SMTP_PORT` | SMTP port (587 for TLS, 465 for SSL) | `587`                                          |
| `SMTP_USER` | Your email address                   | `your-email@gmail.com`                         |
| `SMTP_PASS` | Your email password or app password  | `abcd efgh ijkl mnop`                          |
| `SMTP_FROM` | Display name and email (optional)    | `Plant Watering System <your-email@gmail.com>` |

---

## Common SMTP Settings

### Gmail

- **Host:** `smtp.gmail.com`
- **Port:** `587` (TLS) or `465` (SSL)
- **Security:** TLS/SSL
- **Note:** Requires App Password (not regular password)

### Outlook/Hotmail

- **Host:** `smtp-mail.outlook.com`
- **Port:** `587`
- **Security:** STARTTLS

### Yahoo Mail

- **Host:** `smtp.mail.yahoo.com`
- **Port:** `587` or `465`
- **Security:** TLS/SSL

### SendGrid

- **Host:** `smtp.sendgrid.net`
- **Port:** `587`
- **User:** `apikey`
- **Pass:** Your SendGrid API key

### Mailgun

- **Host:** `smtp.mailgun.org`
- **Port:** `587`
- **User:** Your Mailgun SMTP username
- **Pass:** Your Mailgun SMTP password

---

## Testing

After setting up environment variables and redeploying:

1. **Test in browser console:**

```javascript
fetch("/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    waterLevel: 20,
    moistureLevel: 40,
    alertType: "both",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

2. **Check Vercel Logs:**

   - Go to Vercel Dashboard → Logs
   - Look for `✅ Email sent successfully via SMTP` or error messages

3. **Check your email inbox** (and spam folder)

---

## Troubleshooting

### "Invalid login" or "Authentication failed"

- **Gmail/Outlook:** Make sure you're using an App Password, not your regular password
- **Check:** Username and password are correct
- **Check:** 2-Factor Authentication is enabled (for Gmail/Outlook)

### "Connection timeout"

- **Check:** SMTP_HOST and SMTP_PORT are correct
- **Check:** Firewall isn't blocking the connection
- **Try:** Port 465 instead of 587 (or vice versa)

### "Email not received"

- **Check:** Spam/junk folder
- **Check:** Email address is correct
- **Check:** Vercel logs for errors
- **Check:** SMTP server isn't blocking the recipient

### "SMTP configuration missing"

- **Check:** All environment variables are set in Vercel
- **Check:** You redeployed after adding variables
- **Check:** Variable names are exactly: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

---

## Security Notes

- ✅ **Never commit** SMTP passwords to Git
- ✅ Use **App Passwords** for Gmail/Outlook (not your main password)
- ✅ Keep environment variables **secure** in Vercel
- ✅ Use **TLS/SSL** connections (ports 587 or 465)

---

## Advantages of SMTP

✅ **No domain verification needed** (unlike Resend)  
✅ **Works with any email provider**  
✅ **Send to any email address**  
✅ **Free with Gmail/Outlook**  
✅ **More control** over email sending

---

## Need Help?

- **Gmail App Passwords:** [support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)
- **Outlook App Passwords:** [support.microsoft.com/en-us/account-billing](https://support.microsoft.com/en-us/account-billing)
- **Nodemailer Docs:** [nodemailer.com](https://nodemailer.com)
