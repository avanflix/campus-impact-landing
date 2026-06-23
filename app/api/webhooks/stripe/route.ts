import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Stripe from 'stripe';
import Payment from '@/models/Payment';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import ReelCompetition from '@/models/ReelCompetition';
import User from '@/models/User';
import {
  sendEmail,
  generateWorkshopConfirmationEmail,
  generateReelCompetitionConfirmationEmail,
  generatePaymentReceiptEmail,
} from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const registrationId = paymentIntent.metadata.registrationId;
        const userId = paymentIntent.metadata.userId;
        const registrationType = paymentIntent.metadata.type;

        // Find payment record
        const payment = await Payment.findOne({
          stripePaymentIntentId: paymentIntent.id,
        });

        if (payment) {
          payment.status = 'completed';
          payment.transactionId = paymentIntent.id;
          payment.paidAt = new Date();
          await payment.save();

          // Update registration based on type
          if (registrationType === 'workshop') {
            const registration = await WorkshopRegistration.findByIdAndUpdate(
              registrationId,
              {
                paymentStatus: 'completed',
                transactionId: paymentIntent.id,
              },
              { new: true }
            );

            // Get user and send confirmation email
            const user = await User.findById(userId);
            if (user && registration) {
              const workshopNames = registration.workshops.map((w: any) => w.name);
              const emailTemplate = generateWorkshopConfirmationEmail(
                user.firstName,
                workshopNames,
                registration.totalAmount
              );
              await sendEmail(user.email, emailTemplate);

              // Send receipt
              const receiptTemplate = generatePaymentReceiptEmail(
                user.firstName,
                paymentIntent.id,
                registration.totalAmount,
                `Workshop Registration - ${workshopNames.join(', ')}`,
                new Date().toLocaleDateString()
              );
              await sendEmail(user.email, receiptTemplate);
            }
          } else if (registrationType === 'reelCompetition') {
            const registration = await ReelCompetition.findByIdAndUpdate(
              registrationId,
              {
                paymentStatus: 'completed',
                transactionId: paymentIntent.id,
              },
              { new: true }
            );

            // Get user and send confirmation email
            const user = await User.findById(userId);
            if (user && registration) {
              const emailTemplate = generateReelCompetitionConfirmationEmail(
                user.firstName,
                registration.groupName,
                registration.reelTitle,
                registration.totalAmount,
                registration.students
              );
              await sendEmail(user.email, emailTemplate);

              // Send receipt
              const receiptTemplate = generatePaymentReceiptEmail(
                user.firstName,
                paymentIntent.id,
                registration.totalAmount,
                `Reel Competition - ${registration.groupName}`,
                new Date().toLocaleDateString()
              );
              await sendEmail(user.email, receiptTemplate);
            }
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const payment = await Payment.findOne({
          stripePaymentIntentId: paymentIntent.id,
        });

        if (payment) {
          payment.status = 'failed';
          payment.failureReason =
            paymentIntent.last_payment_error?.message || 'Payment failed';
          await payment.save();

          // Update registration
          const registrationType = paymentIntent.metadata.type;
          if (registrationType === 'workshop') {
            await WorkshopRegistration.findByIdAndUpdate(
              paymentIntent.metadata.registrationId,
              { paymentStatus: 'failed' }
            );
          } else if (registrationType === 'reelCompetition') {
            await ReelCompetition.findByIdAndUpdate(
              paymentIntent.metadata.registrationId,
              { paymentStatus: 'failed' }
            );
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
