# Campus Impact - Setup & Configuration Guide

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account (free tier available)
- Stripe account (test mode available)
- Gmail account (for email sending)
- Git (optional)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone/Extract Project
```bash
# If you have a zip file
unzip campus-impact-nextjs.zip
cd campus-impact

# Or clone from git
git clone <repo-url>
cd campus-impact
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Create Environment File
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials (see section below)
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🔧 Detailed Configuration

### Step 1: MongoDB Setup

#### Option A: MongoDB Atlas (Recommended - Free)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Click "Sign Up" and create account
   - Verify email address

2. **Create Cluster**
   - Click "Create a Deployment"
   - Select "Shared" (Free tier)
   - Choose region closest to you
   - Create cluster (wait 1-3 minutes)

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add Database User"
   - Username: `campusimpact` (or your choice)
   - Password: Generate strong password and save it
   - Add user with "Read and write to any database" permissions

4. **Get Connection String**
   - Go to "Clusters" (left sidebar)
   - Click "Connect" button
   - Select "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `campus-impact`

5. **Add IP Whitelist** (Important!)
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

6. **Add to .env.local**
```env
MONGODB_URI=mongodb+srv://campusimpact:yourPassword@cluster.mongodb.net/campus-impact
```

#### Option B: Local MongoDB

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or install from mongodb.com/try/download/community

# Connection string:
MONGODB_URI=mongodb://localhost:27017/campus-impact
```

### Step 2: Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com/start](https://stripe.com/start)
   - Sign up (uses test keys by default)

2. **Get API Keys**
   - Go to Dashboard → [Developers](https://dashboard.stripe.com/developers)
   - Make sure "View test data" is enabled (toggle top right)
   - Go to "API keys"
   - Copy "Publishable key" and "Secret key"

3. **Add to .env.local**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

4. **Setup Webhook (Optional for local testing)**
   - Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
   - Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - This gives you `STRIPE_WEBHOOK_SECRET`
   - Add to .env.local: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

5. **Test Payment**
   - Use test card: `4242 4242 4242 4242`
   - Any future date for expiry
   - Any 3-digit CVC

### Step 3: Email Configuration

#### Option A: Gmail (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Scroll to "How you sign in to Google"
   - Enable "2-Step Verification"

2. **Create App Password**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Click "Generate"
   - Copy the 16-character password shown

3. **Add to .env.local**
```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx (16-character password from step 2)
```

#### Option B: SendGrid

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for free account

2. **Get API Key**
   - Go to Settings → API Keys
   - Create new API key with "Mail Send" access
   - Copy the key

3. **Update email.ts**
   - Replace nodemailer with SendGrid SDK
   - Update `.env.local`:
```env
SENDGRID_API_KEY=SG.xxxxx
```

### Step 4: JWT Configuration

Generate a strong random secret:

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (using Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to .env.local:
```env
JWT_SECRET=your_generated_secret_here
JWT_EXPIRE=7d
```

### Step 5: Application Configuration

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📝 Complete .env.local File

```env
# ========================================
# MONGODB CONFIGURATION
# ========================================
MONGODB_URI=mongodb+srv://campusimpact:password@cluster.mongodb.net/campus-impact

# ========================================
# JWT CONFIGURATION
# ========================================
JWT_SECRET=your_32_character_secret_key_here
JWT_EXPIRE=7d

# ========================================
# STRIPE CONFIGURATION
# ========================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# ========================================
# EMAIL CONFIGURATION (Gmail)
# ========================================
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

# ========================================
# APPLICATION CONFIGURATION
# ========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🏗️ Project Structure

```
campus-impact/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── workshop/
│   │   │   └── register/route.ts
│   │   ├── reel-competition/
│   │   │   └── register/route.ts
│   │   └── webhooks/
│   │       └── stripe/route.ts
│   ├── dashboard/page.tsx
│   ├── workshop-registration/page.tsx
│   ├── reel-competition/page.tsx
│   ├── sign-in/page.tsx
│   ├── register/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ... (existing components)
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   └── email.ts
├── models/
│   ├── User.ts
│   ├── WorkshopRegistration.ts
│   ├── ReelCompetition.ts
│   └── Payment.ts
├── public/
├── .env.local (create this)
├── ARCHITECTURE.md
├── DATABASE_SCHEMA.md
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 🧪 Testing the Application

### 1. Test User Registration
```bash
# Navigate to http://localhost:3000/register
# Fill in form:
# - First Name: John
# - Last Name: Doe
# - Email: john@example.com
# - Phone: 9876543210
# - College: ABC University
# - Password: password123
# Click "Create Account"
# Check console for verification email (won't actually send in dev mode)
```

### 2. Test Login
```bash
# Navigate to http://localhost:3000/sign-in
# Use credentials from above
# Should redirect to /dashboard
```

### 3. Test Workshop Registration
```bash
# From dashboard, click "Register Workshop"
# Select 2-3 workshops
# Click "Proceed to Payment"
# Use Stripe test card: 4242 4242 4242 4242
# Complete payment
# Check webhook console output
```

### 4. Test Reel Competition Registration
```bash
# From dashboard, click "Reel Competition"
# Fill all group and student details
# Click "Proceed to Payment"
# Use test Stripe card
# Complete payment
```

---

## 🔍 Debugging Tips

### MongoDB Connection Issues
```bash
# Test connection in Node.js REPL
node
> const mongoose = require('mongoose');
> mongoose.connect('your_uri_here')
> // Check if connection succeeds
```

### Check MongoDB Data
- Use MongoDB Atlas UI → Collections → Browse Documents
- Or use MongoDB Compass local GUI

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASS in .env.local
- Ensure Gmail 2FA and app password are set correctly
- Check Gmail "Less secure app access" if using older account

### Stripe Issues
- Verify keys are correct (pk_test_ and sk_test_)
- Check webhook secret if using webhook
- Review Stripe Dashboard → Logs for error details

### JWT Issues
- Clear browser cookies
- Regenerate JWT_SECRET with strong random string
- Check token expiry in browser console

---

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended for Next.js)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/campus-impact.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect GitHub repo
   - Add environment variables (copy from .env.local)
   - Click "Deploy"

3. **Update Environment Variables**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add all variables from .env.local
   - Make sure `NEXT_PUBLIC_APP_URL` points to your Vercel domain

4. **Update Stripe Webhook**
   - In Stripe Dashboard → Webhooks
   - Update webhook endpoint to: `https://yourdomain.vercel.app/api/webhooks/stripe`

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB production credentials
- [ ] Use Stripe live keys (not test keys)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Add email validation
- [ ] Implement rate limiting
- [ ] Setup error logging
- [ ] Regular backups of MongoDB
- [ ] Monitor payment transactions
- [ ] Keep dependencies updated

---

## 📊 Monitoring & Analytics

### Key Metrics to Monitor
- User registrations per day
- Workshop registration breakdown
- Payment success/failure rate
- Email delivery rate
- API response times
- Database query performance

### Setup Monitoring
- [Vercel Analytics](https://vercel.com/analytics)
- [MongoDB Atlas Monitoring](https://docs.atlas.mongodb.com/monitoring/)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Sentry](https://sentry.io) for error tracking

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module 'mongoose'"
**Solution**: Run `npm install`

### Issue: "MongoDB connection timeout"
**Solution**: 
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network connectivity

### Issue: "Stripe API key invalid"
**Solution**:
- Verify you're using test keys (pk_test_/sk_test_)
- Copy full key without spaces
- Check .env.local file has no typos

### Issue: "Email not sending"
**Solution**:
- Check EMAIL_USER and EMAIL_PASS
- Verify Gmail 2FA and app password
- Check email service logs

### Issue: "Payment webhook not working"
**Solution**:
- Verify STRIPE_WEBHOOK_SECRET
- Check webhook endpoint is publicly accessible
- Review Stripe webhook logs
- Test with Stripe CLI: `stripe trigger payment_intent.succeeded`

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Nodemailer Documentation](https://nodemailer.com)
- [JWT.io](https://jwt.io)

---

## 💡 Tips for Success

1. **Start with test mode** - Use Stripe test keys first
2. **Use MongoDB Atlas** - Easier than local setup
3. **Test emails locally** - Check console output before production
4. **Monitor webhooks** - Use Stripe/Webhook logs for debugging
5. **Backup database** - Enable MongoDB Atlas backups
6. **Use environment variables** - Never hardcode secrets
7. **Test thoroughly** - Test all registration flows before going live
8. **Enable CORS** - If frontend and backend are on different domains
9. **Use HTTPS** - Even in development with ngrok or Vercel
10. **Document changes** - Keep CHANGELOG.md updated

---

## 🤝 Support

For issues or questions:
1. Check [Troubleshooting](#-debugging-tips) section
2. Review relevant documentation links
3. Check service status pages (MongoDB, Stripe, Gmail)
4. Open issue on GitHub repo
5. Contact development team

---

**Last Updated**: June 2024  
**Version**: 1.0.0
