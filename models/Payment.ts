import mongoose, { Schema, model, models } from 'mongoose';

const paymentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    registrationType: {
      type: String,
      enum: ['workshop', 'reelCompetition'],
      required: true,
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'registrationType',
    },
    amount: {
      type: Number,
      required: [true, 'Please provide payment amount'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal'],
      default: 'stripe',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    stripePaymentIntentId: {
      type: String,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    receiptUrl: {
      type: String,
    },
    failureReason: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default models.Payment || model('Payment', paymentSchema);
