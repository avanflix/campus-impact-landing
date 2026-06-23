import mongoose, { Schema, model, models } from 'mongoose';

const workshopRegistrationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workshops: [
      {
        name: {
          type: String,
          enum: ['Direction', 'Acting', 'Photography', 'Videography', 'Modeling'],
          required: true,
        },
        price: {
          type: Number,
          default: 199,
        },
      },
    ],
    totalWorkshops: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
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
    certificateIssued: {
      type: Boolean,
      default: false,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default models.WorkshopRegistration || model('WorkshopRegistration', workshopRegistrationSchema);
