# Campus Impact - Database Schema & Flow Diagrams

## Database Schema Diagram

```
┌─────────────────────────────────────────┐
│            User Collection              │
├─────────────────────────────────────────┤
│ _id: ObjectId (Primary Key)             │
│ firstName: String                       │
│ lastName: String                        │
│ email: String (Unique)                  │
│ phone: String                           │
│ college: String                         │
│ password: String (Hashed)               │
│ isEmailVerified: Boolean                │
│ role: String (student/admin)            │
│ createdAt: Date                         │
│ updatedAt: Date                         │
└─────────────────────────────────────────┘
              ▲              ▲              ▲
              │              │              │
              │ (1:M)        │ (1:M)        │ (1:M)
              │              │              │
┌─────────────────────────┐  ┌───────────────────────┐  ┌─────────────────────────┐
│ WorkshopRegistration    │  │ ReelCompetition       │  │ Payment                 │
├─────────────────────────┤  ├───────────────────────┤  ├─────────────────────────┤
│ _id: ObjectId           │  │ _id: ObjectId         │  │ _id: ObjectId           │
│ userId: ObjectId (FK)   │  │ leaderId: ObjectId(FK)│  │ userId: ObjectId (FK)   │
│ workshops: [            │  │ groupName: String     │  │ registrationType: Enum  │
│   {                     │  │ totalMembers: Number  │  │ registrationId: ObjectId│
│     name: String        │  │ students: [           │  │ amount: Number          │
│     price: Number       │  │   {                   │  │ currency: String        │
│   }                     │  │     firstName: String │  │ paymentMethod: String   │
│ ]                       │  │     lastName: String  │  │ status: String          │
│ totalWorkshops: Number  │  │     email: String     │  │ stripePaymentIntentId:  │
│ totalAmount: Number     │  │     phone: String     │  │ transactionId: String   │
│ paymentStatus: String   │  │     college: String   │  │ receiptUrl: String      │
│ stripePaymentId: String │  │     rollNumber: String│  │ paidAt: Date            │
│ transactionId: String   │  │   }                   │  │ createdAt: Date         │
│ certificateIssued: Bool │  │ ]                     │  │ updatedAt: Date         │
│ registeredAt: Date      │  │ reelTitle: String     │  └─────────────────────────┘
│ createdAt: Date         │  │ reelDescription: Str  │
│ updatedAt: Date         │  │ reelCategory: String  │
└─────────────────────────┘  │ reelDuration: Number  │
                             │ reelLink: String      │
                             │ totalAmount: Number   │
                             │ paymentStatus: String │
                             │ stripePaymentId: Str  │
                             │ transactionId: String │
                             │ status: String        │
                             │ registeredAt: Date    │
                             │ createdAt: Date       │
                             │ updatedAt: Date       │
                             └───────────────────────┘
```

---

## Collection Relationships

### 1. User ↔ WorkshopRegistration (One-to-Many)
- One user can have multiple workshop registrations
- Each registration belongs to one user
- Foreign key: `userId` in WorkshopRegistration

### 2. User ↔ ReelCompetition (One-to-Many)
- One user (as leader) can have multiple reel competition registrations
- Each reel group is led by one user
- Foreign key: `leaderId` in ReelCompetition
- Note: All 4 group members' data is embedded in `students` array

### 3. User ↔ Payment (One-to-Many)
- One user can have multiple payments
- Each payment is made by one user
- Foreign key: `userId` in Payment

### 4. WorkshopRegistration ↔ Payment (One-to-Many)
- One workshop registration can have multiple payment records (retries)
- Reference via `registrationId` and `registrationType`

### 5. ReelCompetition ↔ Payment (One-to-Many)
- One reel competition registration can have multiple payment records (retries)
- Reference via `registrationId` and `registrationType`

---

## Complete User Flow Diagrams

### 1. REGISTRATION FLOW
```
┌─────────────────┐
│  Home Page      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Click "Register" Button    │
└────────┬────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Registration Form                       │
│  - First Name, Last Name                 │
│  - Email, Phone                          │
│  - College Name                          │
│  - Password, Confirm Password            │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Client-Side Validation                  │
│  ✓ All fields filled                     │
│  ✓ Valid email format                    │
│  ✓ 10-digit phone                        │
│  ✓ Password ≥ 6 characters               │
│  ✓ Passwords match                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  POST /api/auth/register                 │
│  - Server-side validation                │
│  - Check email uniqueness                │
│  - Hash password with bcryptjs           │
│  - Create User document                  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Generate JWT Token                      │
│  - Payload: userId, email, role          │
│  - Expiry: 7 days                        │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Set Auth Cookie                         │
│  - HttpOnly, Secure, SameSite            │
│  - Max age: 7 days                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Send Verification Email                 │
│  - To: user.email                        │
│  - Template: Welcome + Verify Link       │
│  - Link includes JWT token               │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Return 201 Created                      │
│  - User object (without password)        │
│  - Redirect to Dashboard                 │
└─────────────────────────────────────────┘
```

### 2. WORKSHOP REGISTRATION FLOW
```
┌──────────────────────────────┐
│  Dashboard                   │
│  - View user info            │
│  - View previous regs        │
│  - Quick action buttons      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Click "Register Workshop"               │
│  - Check if user authenticated           │
│  - Get JWT token from cookie             │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Workshop Selection Page                 │
│  Workshop Options:                       │
│  - Direction        (₹199)               │
│  - Acting           (₹199)               │
│  - Photography      (₹199)               │
│  - Videography      (₹199)               │
│  - Modeling         (₹199)               │
│                                          │
│  User selects: [✓] [✓] [ ] [ ] [ ]      │
│  Selected: Direction, Acting (2)         │
│  Total: ₹398                             │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Click "Proceed to Payment"              │
│  - Validate selections                   │
│  - Validate at least 1 selected          │
│  - Check for duplicates                  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  POST /api/workshop/register             │
│  Body: {                                 │
│    workshops: ['Direction', 'Acting']    │
│  }                                       │
│  Headers: Authorization: Bearer <token>  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  API Processing:                         │
│  - Verify JWT token                      │
│  - Extract userId from token             │
│  - Validate workshop selection           │
│  - Calculate total: 2 × 199 = ₹398       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE WorkshopRegistration             │
│  {                                       │
│    userId: 123,                          │
│    workshops: [{                         │
│      name: 'Direction',                  │
│      price: 199                          │
│    }, {                                  │
│      name: 'Acting',                     │
│      price: 199                          │
│    }],                                   │
│    totalWorkshops: 2,                    │
│    totalAmount: 398,                     │
│    paymentStatus: 'pending'              │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE Stripe PaymentIntent             │
│  - Amount: 39800 (in paise)              │
│  - Currency: INR                         │
│  - Metadata:                             │
│    - registrationId: 456                 │
│    - userId: 123                         │
│    - type: 'workshop'                    │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  UPDATE WorkshopRegistration             │
│  - Set stripePaymentId = intent.id       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE Payment Record                   │
│  {                                       │
│    userId: 123,                          │
│    registrationType: 'workshop',         │
│    registrationId: 456,                  │
│    amount: 398,                          │
│    currency: 'INR',                      │
│    paymentMethod: 'stripe',              │
│    status: 'pending',                    │
│    stripePaymentIntentId: intent.id      │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Return 201 Created                      │
│  {                                       │
│    registration: {                       │
│      id: 456,                            │
│      workshops: ['Direction', 'Acting'], │
│      totalAmount: 398,                   │
│      clientSecret: '...'                 │
│    }                                     │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Client: Initialize Stripe Elements      │
│  - Load Stripe public key                │
│  - Create payment element with secret    │
│  - Display secure payment form           │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  User Enters Payment Details             │
│  - Card number, expiry, CVC              │
│  - All handled by Stripe Elements        │
│  - No sensitive data touches server      │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Click "Pay ₹398"                        │
│  - Client submits to Stripe              │
│  - Stripe processes payment              │
└────────┬─────────────────────────────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
FAILURE    SUCCESS
    │          │
    │          └──────────────┐
    │                         │
    ▼                         ▼
┌──────────────────┐  ┌──────────────────────┐
│  Webhook Event:  │  │  Webhook Event:      │
│  payment_intent. │  │  payment_intent.     │
│  payment_failed  │  │  succeeded           │
└────┬─────────────┘  └────┬─────────────────┘
     │                     │
     ▼                     ▼
┌──────────────────┐  ┌──────────────────────┐
│ POST Webhook     │  │ POST Webhook         │
│ /api/webhooks/   │  │ /api/webhooks/stripe │
│ stripe           │  │                      │
└────┬─────────────┘  └────┬─────────────────┘
     │                     │
     ▼                     ▼
┌──────────────────┐  ┌──────────────────────┐
│ UPDATE Payment   │  │ UPDATE Payment:      │
│ status: 'failed' │  │ - status: 'completed'│
└────┬─────────────┘  │ - paidAt: now        │
     │                └────┬─────────────────┘
     │                     │
     ▼                     ▼
┌──────────────────┐  ┌──────────────────────┐
│ UPDATE Workshop  │  │ UPDATE Workshop Reg: │
│ Reg:             │  │ - paymentStatus:     │
│ - paymentStatus: │  │   'completed'        │
│   'failed'       │  │ - transactionId:     │
└────┬─────────────┘  │   intent.id          │
     │                └────┬─────────────────┘
     │                     │
     │                     ▼
     │                ┌──────────────────────┐
     │                │ GET User from DB     │
     │                │ - firstName          │
     │                │ - email              │
     │                └────┬─────────────────┘
     │                     │
     │                     ▼
     │                ┌──────────────────────┐
     │                │ Send Confirmation    │
     │                │ Email Template:      │
     │                │ - Workshop names     │
     │                │ - Total amount       │
     │                │ - Receipt info       │
     │                └────┬─────────────────┘
     │                     │
     │                     ▼
     │                ┌──────────────────────┐
     │                │ Send email via       │
     │                │ Nodemailer to user   │
     │                └────┬─────────────────┘
     │                     │
     ▼                     ▼
┌──────────────────────────────────┐
│  Show Error to User              │
│  "Payment Failed"                │
│  Try again / Return to dashboard │
└──────────────────────────────────┘
                                    │
                                    ▼
                        ┌──────────────────────┐
                        │  User redirected to  │
                        │  Dashboard           │
                        │  - Sees registration │
                        │  - Status: Completed │
                        │  - Certificate badge │
                        └──────────────────────┘
```

### 3. REEL COMPETITION REGISTRATION FLOW
```
┌──────────────────────────────┐
│  Dashboard                   │
│  Quick Action: Reel Comp     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Reel Competition Registration Page      │
│  Section 1: Group Details                │
│  - Group Name                            │
│  - Reel Title                            │
│  - Reel Description (optional)           │
│  - Category (Comedy/Drama/Action/...)    │
│  - Duration (15-60 seconds)              │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Section 2: Student 1 Details            │
│  - First Name, Last Name                 │
│  - Email, Phone                          │
│  - College, Roll Number                  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Section 3: Student 2 Details (same as 1)│
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Section 4: Student 3 Details (same as 1)│
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Section 5: Student 4 Details (same as 1)│
│                                          │
│  Order Summary:                          │
│  - Group Size: 4 students                │
│  - Total Amount: ₹399 (fixed)            │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Click "Proceed to Payment"              │
│  Client-Side Validations:                │
│  ✓ Group name filled                     │
│  ✓ Reel title filled                     │
│  ✓ Category selected                     │
│  ✓ Duration 15-60 sec                    │
│  ✓ All 4 students' fields filled         │
│  ✓ Valid emails for all                  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  POST /api/reel-competition/register     │
│  Body: {                                 │
│    groupName: 'Team X',                  │
│    reelTitle: 'My Reel',                 │
│    reelDescription: '...',               │
│    reelCategory: 'Comedy',               │
│    reelDuration: 30,                     │
│    students: [                           │
│      {                                   │
│        firstName: 'John',                │
│        lastName: 'Doe',                  │
│        email: 'john@college.edu',        │
│        phone: '9876543210',              │
│        college: 'ABC College',           │
│        rollNumber: 'CS001'               │
│      },                                  │
│      ... (3 more students)               │
│    ]                                     │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  API Processing:                         │
│  - Verify JWT token                      │
│  - Validate all fields                   │
│  - Check exactly 4 students              │
│  - Validate emails                       │
│  - Validate duration                     │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE ReelCompetition Document:        │
│  {                                       │
│    leaderId: 123 (from JWT),             │
│    groupName: 'Team X',                  │
│    totalMembers: 4,                      │
│    students: [4 student objects],        │
│    reelTitle: 'My Reel',                 │
│    reelCategory: 'Comedy',               │
│    reelDuration: 30,                     │
│    totalAmount: 399,                     │
│    paymentStatus: 'pending',             │
│    status: 'submitted'                   │
│  }                                       │
│                                          │
│  Important: All 4 students saved in      │
│  single document's students array        │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE Stripe PaymentIntent             │
│  - Amount: 39900 (in paise)              │
│  - Currency: INR                         │
│  - Metadata:                             │
│    - registrationId: 789                 │
│    - userId: 123                         │
│    - type: 'reelCompetition'             │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  UPDATE ReelCompetition                  │
│  - Set stripePaymentId = intent.id       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  CREATE Payment Record                   │
│  {                                       │
│    userId: 123,                          │
│    registrationType: 'reelCompetition',  │
│    registrationId: 789,                  │
│    amount: 399,                          │
│    currency: 'INR',                      │
│    paymentMethod: 'stripe',              │
│    status: 'pending',                    │
│    stripePaymentIntentId: intent.id      │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Return 201 Created                      │
│  {                                       │
│    registration: {                       │
│      id: 789,                            │
│      groupName: 'Team X',                │
│      reelTitle: 'My Reel',               │
│      totalAmount: 399,                   │
│      studentCount: 4,                    │
│      clientSecret: '...'                 │
│    }                                     │
│  }                                       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  [Same Payment & Webhook Flow as         │
│   Workshop Registration]                 │
│  User completes Stripe payment           │
└────────┬─────────────────────────────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
FAILURE    SUCCESS
    │          │
    ▼          ▼
 [Same as   UPDATE Payment
 Workshop]  UPDATE ReelComp Reg:
            - paymentStatus: 'completed'
            
            GET ReelComp from DB
            - Get all 4 students
            
            SEND Email to Group Leader:
            - Group name, members
            - Reel title, category
            - All 4 member details
            - Participation certificate info
            
            Dashboard shows:
            - Registered reel competitions
            - Status: Completed
            - All group members
            - Certificate badge
```

---

## Database Transaction Flow

### Workshop Registration Transaction
```
User submits form
    ↓
START TRANSACTION
    ↓
INSERT WorkshopRegistration
    ↓
INSERT Payment (status: pending)
    ↓
CREATE Stripe PaymentIntent
    ↓
UPDATE WorkshopRegistration (add stripePaymentId)
    ↓
COMMIT TRANSACTION
    ↓
Return client secret to user
```

### Reel Competition Transaction
```
User submits form
    ↓
START TRANSACTION
    ↓
INSERT ReelCompetition (with 4 students)
    ↓
INSERT Payment (status: pending)
    ↓
CREATE Stripe PaymentIntent
    ↓
UPDATE ReelCompetition (add stripePaymentId)
    ↓
COMMIT TRANSACTION
    ↓
Return client secret to user
```

### Payment Webhook Transaction
```
Stripe sends webhook
    ↓
Verify webhook signature
    ↓
START TRANSACTION
    ↓
UPDATE Payment (status: completed)
    ↓
UPDATE Registration (paymentStatus: completed)
    ↓
GET User details
    ↓
SEND confirmation email
    ↓
COMMIT TRANSACTION
```

---

## Index Strategy for MongoDB

### Recommended Indexes
```javascript
// User Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

// WorkshopRegistration Collection
db.workshopregistrations.createIndex({ userId: 1 })
db.workshopregistrations.createIndex({ paymentStatus: 1 })
db.workshopregistrations.createIndex({ createdAt: -1 })

// ReelCompetition Collection
db.reelcompetitions.createIndex({ leaderId: 1 })
db.reelcompetitions.createIndex({ paymentStatus: 1 })
db.reelcompetitions.createIndex({ status: 1 })
db.reelcompetitions.createIndex({ createdAt: -1 })

// Payment Collection
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ status: 1 })
db.payments.createIndex({ stripePaymentIntentId: 1 }, { unique: true })
db.payments.createIndex({ createdAt: -1 })
db.payments.createIndex({ registrationType: 1, registrationId: 1 })
```

---

## Scalability Considerations

1. **Pagination**: Implement for large registration lists
2. **Caching**: Cache frequently accessed user data
3. **Database Sharding**: Shard by userId for large datasets
4. **Read Replicas**: Use read replicas for reporting
5. **Archival**: Archive old registrations monthly
6. **Search Index**: Add search indexes for admin dashboard
