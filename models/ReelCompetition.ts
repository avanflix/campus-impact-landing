import mongoose, { Schema, model, models } from 'mongoose';

const studentInGroupSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  college: {
    type: String,
    required: [true, 'Please provide college name'],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, 'Please provide roll number'],
  },
});

const reelCompetitionSchema = new Schema(
  {
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupName: {
      type: String,
      required: [true, 'Please provide group name'],
      trim: true,
    },
    totalMembers: {
      type: Number,
      enum: [4],
      default: 4,
      required: true,
    },
    students: [studentInGroupSchema],
    reelTitle: {
      type: String,
      required: [true, 'Please provide reel title'],
      trim: true,
    },
    reelDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    reelCategory: {
      type: String,
      enum: ['Comedy', 'Drama', 'Action', 'Educational', 'Creative', 'Other'],
      required: [true, 'Please select reel category'],
    },
    reelDuration: {
      type: Number,
      required: [true, 'Please provide reel duration in seconds'],
      min: [15, 'Minimum reel duration is 15 seconds'],
      max: [60, 'Maximum reel duration is 60 seconds'],
    },
    reelLink: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      default: 399,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    stripePaymentId: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    participationCertificateIssued: {
      type: Boolean,
      default: false,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['submitted', 'approved', 'shortlisted', 'winner', 'rejected'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

export default models.ReelCompetition || model('ReelCompetition', reelCompetitionSchema);
