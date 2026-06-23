import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import Payment from '@/models/Payment';
import User from '@/models/User';
import { getAuthToken, verifyToken } from '@/lib/auth';
import { sendEmail, generateWorkshopConfirmationEmail } from '@/lib/email';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get authenticated user
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized - please login' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { workshops } = body;

    // Validation
    if (!workshops || !Array.isArray(workshops) || workshops.length === 0) {
      return NextResponse.json(
        { message: 'Please select at least one workshop' },
        { status: 400 }
      );
    }

    // Validate workshop names
    const validWorkshops = ['Direction', 'Acting', 'Photography', 'Videography', 'Modeling'];
    for (const workshop of workshops) {
      if (!validWorkshops.includes(workshop)) {
        return NextResponse.json(
          { message: `Invalid workshop: ${workshop}` },
          { status: 400 }
        );
      }
    }

    // Check for duplicates
    const uniqueWorkshops = [...new Set(workshops)];
    if (uniqueWorkshops.length !== workshops.length) {
      return NextResponse.json(
        { message: 'Duplicate workshops selected' },
        { status: 400 }
      );
    }

    // Calculate amount (199 per workshop)
    const totalAmount = uniqueWorkshops.length * 199;

    // Create workshop registration
    const workshopData = uniqueWorkshops.map((name: string) => ({
      name,
      price: 199,
    }));

    const registration = await WorkshopRegistration.create({
      userId: decoded.userId,
      workshops: workshopData,
      totalWorkshops: uniqueWorkshops.length,
      totalAmount,
      paymentStatus: 'pending',
    });

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert to paise
      currency: 'inr',
      metadata: {
        registrationId: registration._id.toString(),
        userId: decoded.userId,
        type: 'workshop',
      },
    });

    // Update registration with stripe payment ID
    registration.stripePaymentId = paymentIntent.id;
    await registration.save();

    // Create payment record
    await Payment.create({
      userId: decoded.userId,
      registrationType: 'workshop',
      registrationId: registration._id,
      amount: totalAmount,
      paymentMethod: 'stripe',
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    return NextResponse.json(
      {
        message: 'Workshop registration created',
        registration: {
          id: registration._id,
          workshops: uniqueWorkshops,
          totalAmount,
          clientSecret: paymentIntent.client_secret,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Workshop registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}

// Get user's workshop registrations
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const registrations = await WorkshopRegistration.find({
      userId: decoded.userId,
    });

    return NextResponse.json(
      {
        registrations,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fetch registrations error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
