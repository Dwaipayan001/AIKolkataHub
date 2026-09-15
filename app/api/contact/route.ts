import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const ALLOWED_COURSES = new Set([
  'Python Foundations',
  'AI & Machine Learning',
  'Agentic AI Lab',
  'Data Science Studio',
  'Not sure yet / General enquiry',
]);

type Enquiry = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  course?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown, limit: number) =>
  typeof value === 'string' ? value.trim().slice(0, limit) : '';

export async function POST(request: Request) {
  let enquiry: Enquiry;

  try {
    enquiry = (await request.json()) as Enquiry;
  } catch {
    return Response.json({ error: 'Invalid enquiry.' }, { status: 400 });
  }

  // Bots commonly fill hidden fields that real visitors never see.
  if (clean(enquiry.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(enquiry.name, 100);
  const email = clean(enquiry.email, 254);
  const phone = clean(enquiry.phone, 30);
  const course = clean(enquiry.course, 100);
  const message = clean(enquiry.message, 3000);
  const isDemo = enquiry.type === 'demo';
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneDigits = phone.replace(/\D/g, '');
  const validPhone =
    /^[+\d().\s-]+$/.test(phone) &&
    phoneDigits.length >= 7 &&
    phoneDigits.length <= 15;

  if (
    !name ||
    !validEmail ||
    !ALLOWED_COURSES.has(course) ||
    (isDemo && !validPhone)
  ) {
    return Response.json(
      {
        error:
          'Please check your name, email, phone number and selected course.',
      },
      { status: 400 },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'hellocodeadda@gmail.com';

  if (
    !smtpHost ||
    !Number.isFinite(smtpPort) ||
    !smtpUser ||
    !smtpPassword ||
    !fromEmail ||
    !toEmail
  ) {
    console.error(
      'Contact email requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD and CONTACT_FROM_EMAIL.',
    );
    return Response.json(
      {
        error:
          'Email delivery is temporarily unavailable. Please email us directly.',
      },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    const subject = isDemo
      ? `Free demo request: ${course}`
      : `New enquiry: ${course}`;
    const body = [
      isDemo ? 'FREE DEMO REQUEST' : 'GENERAL ENQUIRY',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Course: ${course}`,
      '',
      message || 'No additional message provided.',
    ].join('\n');

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text: body,
    });
  } catch (error) {
    console.error('SMTP contact delivery failed.', error);
    return Response.json(
      { error: 'We could not send your enquiry. Please try again shortly.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
