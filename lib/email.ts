import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface EmailTemplate {
  subject: string;
  html: string;
}

export function generateVerificationEmail(
  firstName: string,
  verificationLink: string
): EmailTemplate {
  return {
    subject: 'Verify Your Campus Impact Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Campus Impact, ${firstName}!</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationLink}</p>
        <p>This link expires in 24 hours.</p>
      </div>
    `,
  };
}

export function generateWorkshopConfirmationEmail(
  firstName: string,
  workshops: string[],
  totalAmount: number
): EmailTemplate {
  const workshopList = workshops.map((w) => `<li>${w}</li>`).join('');

  return {
    subject: 'Workshop Registration Confirmation - Campus Impact',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Workshop Registration Confirmed!</h2>
        <p>Dear ${firstName},</p>
        <p>Your workshop registration has been confirmed. Here are your details:</p>
        <h3>Registered Workshops:</h3>
        <ul>
          ${workshopList}
        </ul>
        <p><strong>Total Amount Paid: ₹${totalAmount}</strong></p>
        <p>You will receive a certificate upon completion of the workshops.</p>
        <p>Thank you for registering with Campus Impact!</p>
      </div>
    `,
  };
}

export function generateReelCompetitionConfirmationEmail(
  leaderName: string,
  groupName: string,
  reelTitle: string,
  amount: number,
  students: Array<{ firstName: string; lastName: string; college: string }>
): EmailTemplate {
  const studentsList = students
    .map((s) => `<li>${s.firstName} ${s.lastName} - ${s.college}</li>`)
    .join('');

  return {
    subject: 'Reel Competition Registration Confirmed - Campus Impact',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reel Competition Registration Confirmed!</h2>
        <p>Dear ${leaderName},</p>
        <p>Your group's registration for the Reel Competition has been confirmed.</p>
        <h3>Group Details:</h3>
        <p><strong>Group Name:</strong> ${groupName}</p>
        <p><strong>Reel Title:</strong> ${reelTitle}</p>
        <p><strong>Amount Paid:</strong> ₹${amount}</p>
        <h3>Group Members:</h3>
        <ul>
          ${studentsList}
        </ul>
        <p>You will receive a participation certificate for all group members.</p>
        <p>Thank you for participating in Campus Impact Reel Competition!</p>
      </div>
    `,
  };
}

export function generatePaymentReceiptEmail(
  firstName: string,
  transactionId: string,
  amount: number,
  description: string,
  date: string
): EmailTemplate {
  return {
    subject: 'Payment Receipt - Campus Impact',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Payment Receipt</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for your payment. Here is your receipt:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Transaction ID</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Description</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${description}</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹${amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${date}</td>
          </tr>
        </table>
        <p>Keep this receipt for your records.</p>
      </div>
    `,
  };
}

export async function sendEmail(
  to: string,
  template: EmailTemplate
): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: template.subject,
      html: template.html,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
