import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ReelCompetition from '@/models/ReelCompetition';
import Payment from '@/models/Payment';
import { getAuthToken, verifyToken } from '@/lib/auth';
import { sendEmail, generateReelCompetitionConfirmationEmail } from '@/lib/email';
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
    const {
      groupName,
      reelTitle,
      reelDescription,
      reelCategory,
      reelDuration,
      students,
    } = body;

    // Validation
    if (!groupName || !reelTitle || !reelCategory || !reelDuration) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    if (!students || students.length !== 4) {
      return NextResponse.json(
        { message: 'Group must have exactly 4 students' },
        { status: 400 }
      );
    }

    // Validate students data
    const validCategories = ['Comedy', 'Drama', 'Action', 'Educational', 'Creative', 'Other'];
    if (!validCategories.includes(reelCategory)) {
      return NextResponse.json(
        { message: 'Invalid reel category' },
        { status: 400 }
      );
    }

    if (reelDuration < 15 || reelDuration > 60) {
      return NextResponse.json(
        { message: 'Reel duration must be between 15-60 seconds' },
        { status: 400 }
      );
    }

    for (const student of students) {
      if (!student.firstName || !student.lastName || !student.email || !student.phone || !student.college || !student.rollNumber) {
        return NextResponse.json(
          { message: 'All student fields are required' },
          { status: 400 }
        );
      }
    }

    // Create reel competition registration
    const reelRegistration = await ReelCompetition.create({
      leaderId: decoded.userId,
      groupName,
      totalMembers: 4,
      students,
      reelTitle,
      reelDescription,
      reelCategory,
      reelDuration,
      totalAmount: 399,
      paymentStatus: 'pending',
    });

    // Create Stripe payment intent (399 for group of 4)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 399 * 100, // Convert to paise
      currency: 'inr',
      metadata: {
        registrationId: reelRegistration._id.toString(),
        userId: decoded.userId,
        type: 'reelCompetition',
      },
    });

    // Update registration with stripe payment ID
    reelRegistration.stripePaymentId = paymentIntent.id;
    await reelRegistration.save();

    // Create payment record
    await Payment.create({
      userId: decoded.userId,
      registrationType: 'reelCompetition',
      registrationId: reelRegistration._id,
      amount: 399,
      paymentMethod: 'stripe',
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    return NextResponse.json(
      {
        message: 'Reel competition registration created',
        registration: {
          id: reelRegistration._id,
          groupName,
          reelTitle,
          totalAmount: 399,
          studentCount: 4,
          clientSecret: paymentIntent.client_secret,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Reel competition registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}

// Get user's reel competition registrations
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

    const registrations = await ReelCompetition.find({
      leaderId: decoded.userId,
    });

    return NextResponse.json(
      {
        registrations,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fetch reel registrations error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
