# Campus Impact - Complete Workshop & Reel Competition Registration System

## Project Architecture Overview

This is a full-stack Next.js application for managing workshop registrations and a reel competition with integrated payment system.

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe
- **Email**: Nodemailer
- **Validation**: Zod, React Hook Form
- **Styling**: Inline CSS + CSS Modules

---

## Database Schema

### 1. User Model (`models/User.ts`)
Stores user account information for all students.

```
{
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  phone: String (required, 10-digit)
  college: String (required)
  password: String (required, hashed with bcrypt)
  isEmailVerified: Boolean (default: false)
  role: String (enum: ['student', 'admin'], default: 'student')
  createdAt: Date
  updatedAt: Date
}
```

### 2. WorkshopRegistration Model (`models/WorkshopRegistration.ts`)
Tracks workshop registrations for individual students.

```
{
  userId: ObjectId -> User (required)
  workshops: [
    {
      name: String (enum: ['Direction', 'Acting', 'Photography', 'Videography', 'Modeling'])
      price: Number (default: 199)
    }
  ]
  totalWorkshops: Number
  totalAmount: Number (199 * number of workshops)
  paymentStatus: String (enum: ['pending', 'completed', 'failed'], default: 'pending')
  stripePaymentId: String
  transactionId: String
  certificateIssued: Boolean (default: false)
  registeredAt: Date
  createdAt: Date
  updatedAt: Date
}
```

**Pricing Logic**:
- Each workshop: ₹199
- If student selects multiple workshops: ₹199 × (number of workshops)
- Example: 3 workshops = ₹597

### 3. ReelCompetition Model (`models/ReelCompetition.ts`)
Manages reel competition registrations for groups of 4 students.

```
{
  leaderId: ObjectId -> User (required)
  groupName: String (required)
  totalMembers: Number (must be 4)
  students: [
    {
      firstName: String (required)
      lastName: String (required)
      email: String (required)
      phone: String (required)
      college: String (required)
      rollNumber: String (required)
    }
  ] (exactly 4 students)
  reelTitle: String (required)
  reelDescription: String (max: 500)
  reelCategory: String (enum: ['Comedy', 'Drama', 'Action', 'Educational', 'Creative', 'Other'])
  reelDuration: Number (required, 15-60 seconds)
  reelLink: String
  totalAmount: Number (fixed: 399 for group of 4)
  paymentStatus: String (enum: ['pending', 'completed', 'failed'], default: 'pending')
  stripePaymentId: String
  transactionId: String
  participationCertificateIssued: Boolean (default: false)
  registeredAt: Date
  status: String (enum: ['submitted', 'approved', 'shortlisted', 'winner', 'rejected'], default: 'submitted')
  createdAt: Date
  updatedAt: Date
}
```

**Pricing Logic**:
- Group of 4 students: ₹399 (fixed, per group)
- All 4 group members' data is saved together
- One payment for the entire group

### 4. Payment Model (`models/Payment.ts`)
Tracks all payment transactions.

```
{
  userId: ObjectId -> User (required)
  registrationType: String (enum: ['workshop', 'reelCompetition'])
  registrationId: ObjectId (references WorkshopRegistration or ReelCompetition)
  amount: Number
  currency: String (default: 'INR')
  paymentMethod: String (enum: ['stripe', 'razorpay', 'paypal'], default: 'stripe')
  status: String (enum: ['pending', 'processing', 'completed', 'failed', 'refunded'], default: 'pending')
  stripePaymentIntentId: String
  transactionId: String (unique)
  receiptUrl: String
  failureReason: String
  metadata: Object (mixed)
  paidAt: Date
  createdAt: Date
  updatedAt: Date
}
```

---

## User Flow & Architecture

### 1. Registration Flow
```
User → Register Page → Validation → Create User in DB → JWT Token → Email Verification
```

**Steps**:
- User fills registration form (name, email, phone, college, password)
- Form validation (email format, password strength, phone digits)
- Password hashed with bcryptjs before saving
- JWT token generated
- Verification email sent
- User redirected to dashboard/login

**Database Operations**:
- INSERT into User collection

### 2. Workshop Registration Flow
```
Authenticated User → Workshop Page → Select Workshops → API Call → Create Registration → Payment Intent
```

**Steps**:
- User logs in
- Access workshop registration page
- Select 1 or more workshops (Direction, Acting, Photography, Videography, Modeling)
- Price calculated: ₹199 per workshop
- Create WorkshopRegistration record
- Generate Stripe payment intent
- Create Payment record (pending status)
- Return client secret for payment

**Database Operations**:
- INSERT into WorkshopRegistration
- INSERT into Payment

**Pricing Calculation**:
```javascript
totalAmount = selectedWorkshops.length * 199

Examples:
- 1 workshop: ₹199
- 2 workshops: ₹398
- 3 workshops: ₹597
- 4 workshops: ₹796
- 5 workshops: ₹995
```

### 3. Reel Competition Registration Flow
```
Authenticated User → Reel Page → Enter Group & Member Details → Validate 4 Students → API Call → Create Registration → Payment Intent
```

**Steps**:
- User acts as group leader
- Enter group name, reel title, description, category, duration
- Enter details of exactly 4 students (first name, last name, email, phone, college, roll number)
- Validate all 4 students' information
- Create ReelCompetition record with all student data
- Generate Stripe payment intent (₹399)
- Create Payment record (pending status)
- Return client secret for payment

**Important**: All 4 students' data is saved with the group registration. Each student gets their own entry in the `students` array.

**Database Operations**:
- INSERT into ReelCompetition (with 4 students)
- INSERT into Payment

**Fixed Pricing**:
```
Reel Competition (Group of 4): ₹399 (fixed, regardless of number of students, always 4)
```

### 4. Payment Flow
```
Registration Created → User Proceeds to Payment → Stripe Checkout → Payment Processing → Webhook → Update Status → Send Confirmation Email
```

**Steps**:
1. User clicks "Proceed to Payment"
2. Stripe payment intent created with client secret
3. User completes payment on Stripe checkout
4. Payment success/failure webhook received
5. Payment status updated in database
6. Registration status updated
7. Confirmation email sent to user
8. Receipt email sent

**API Endpoints**:
- `POST /api/workshop/register` - Create workshop registration
- `POST /api/reel-competition/register` - Create reel competition registration
- `POST /api/webhooks/stripe` - Handle payment webhooks

### 5. Email Flow
```
Registration Created / Payment Completed → Email Template Generated → Nodemailer → User Email
```

**Email Types**:
- **Verification Email**: Sent on registration (with verification link)
- **Workshop Confirmation**: Sent on successful payment with workshop details
- **Reel Competition Confirmation**: Sent on successful payment with group and member details
- **Payment Receipt**: Sent for all payments with transaction details

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Workshop
- `POST /api/workshop/register` - Create workshop registration (requires auth)
- `GET /api/workshop/register` - Get user's workshop registrations (requires auth)

### Reel Competition
- `POST /api/reel-competition/register` - Create reel competition registration (requires auth)
- `GET /api/reel-competition/register` - Get user's reel registrations (requires auth)

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe payment events

---

## Pages & Components

### Public Pages
- `/` - Home page (hero, about, roadmap, etc.)
- `/sign-in` - Login page
- `/register` - Registration page

### Protected Pages (Require Authentication)
- `/dashboard` - User dashboard with registrations
- `/workshop-registration` - Workshop registration form
- `/reel-competition` - Reel competition registration form

---

## Environment Variables

Create `.env.local` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-impact

# JWT
JWT_SECRET=your_secret_key_at_least_32_characters
JWT_EXPIRE=7d

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 3. Setup MongoDB
- Create MongoDB Atlas account
- Create cluster
- Get connection string
- Add to MONGODB_URI in .env.local

### 4. Setup Stripe
- Create Stripe account
- Get API keys from dashboard
- Setup webhook endpoint: `https://yoursite.com/api/webhooks/stripe`
- Add keys to .env.local

### 5. Setup Email (Gmail)
- Enable 2-factor authentication
- Generate app password
- Add EMAIL_USER and EMAIL_PASS to .env.local

### 6. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

---

## Validation Rules

### User Registration
- Email: Must be valid email format (unique in DB)
- Phone: Must be 10 digits
- Password: Minimum 6 characters
- First/Last Name: Required, max 50 characters
- College: Required

### Workshop Registration
- At least 1 workshop must be selected
- No duplicate workshops allowed
- Maximum 5 workshops (all options)

### Reel Competition Registration
- Group name: Required
- Reel title: Required
- Reel category: Required (from enum)
- Reel duration: 15-60 seconds
- Exactly 4 students required
- All student fields mandatory:
  - First name, last name, email, phone, college, roll number
- Email must be valid format

---

## Data Relationships

```
User (1) ──── (*) WorkshopRegistration
User (1) ──── (*) Payment
User (1) ──── (*) ReelCompetition

WorkshopRegistration (1) ──── (*) Payment
ReelCompetition (1) ──── (*) Payment
```

---

## Payment Status Lifecycle

### Workshop Registration Payment
```
pending → (user pays) → processing → completed/failed
              ↓
        (webhook received)
              ↓
        update registration status
        send confirmation email
```

### Reel Competition Payment
```
pending → (user pays) → processing → completed/failed
              ↓
        (webhook received)
              ↓
        update registration status
        send confirmation email to leader + all members
```

---

## Security Considerations

1. **Password Security**: Hashed with bcryptjs (10 salt rounds)
2. **JWT**: Secure token with expiry
3. **HTTPS**: Enforced in production
4. **CORS**: Configured for same-origin requests
5. **Database**: MongoDB with authentication
6. **Payment**: Handled by Stripe (PCI compliance)
7. **Email**: Uses app-specific passwords

---

## Deployment Checklist

- [ ] Set NODE_ENV to 'production'
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Setup Stripe production keys
- [ ] Configure email credentials
- [ ] Setup Stripe webhook in production domain
- [ ] Enable HTTPS
- [ ] Set JWT_SECRET to strong random string
- [ ] Configure CORS properly
- [ ] Setup monitoring/logging
- [ ] Create database backups

---

## Future Enhancements

1. **Admin Dashboard**: View all registrations, payments, analytics
2. **Certificate Generation**: Auto-generate and email certificates
3. **Payment Refunds**: Handle refund requests
4. **SMS Notifications**: Send updates via SMS
5. **File Uploads**: Reel video upload
6. **Analytics**: Registration stats, payment analytics
7. **Multiple Payment Methods**: Razorpay, PayPal support
8. **Email Reminders**: Reminder emails before events
9. **Leaderboard**: Voting/rating for reel competition
10. **API Documentation**: Swagger/OpenAPI docs

---

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network is stable

### Email Not Sending
- Verify Gmail app password
- Check "Less secure apps" is enabled (older Gmail accounts)
- Verify EMAIL_USER and EMAIL_PASS in .env.local

### Stripe Payment Errors
- Verify API keys are correct
- Check webhook secret
- Ensure webhook endpoint is publicly accessible
- Test with Stripe test cards

### JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiry
- Clear cookies if needed

---

## Contact & Support

For issues or questions, contact the development team.
