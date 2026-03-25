import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { message: "Please complete every field before sending the message." },
      { status: 400 },
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const contactTo = process.env.CONTACT_TO_EMAIL ?? gmailUser;

  if (!gmailUser || !gmailAppPassword || !contactTo) {
    return NextResponse.json(
      {
        message:
          "Message capture is ready, but email delivery needs GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_TO_EMAIL configured on the server.",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const safeName = String(body.name).trim();
  const safeEmail = String(body.email).trim();
  const safeMessage = String(body.message).trim();
  const safeNameHtml = escapeHtml(safeName);
  const safeEmailHtml = escapeHtml(safeEmail);
  const safeMessageHtml = escapeHtml(safeMessage);

  await transporter.sendMail({
    from: `"Portfolio Recruiter Contact" <${gmailUser}>`,
    to: contactTo,
    replyTo: safeEmail,
    subject: `New recruiter message from ${safeName}`,
    text: [
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      "",
      "Message:",
      safeMessage,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin-bottom:12px;">New recruiter message</h2>
        <p><strong>Name:</strong> ${safeNameHtml}</p>
        <p><strong>Email:</strong> ${safeEmailHtml}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:12px;padding:16px;background:#f9fafb;">
          ${safeMessageHtml}
        </div>
      </div>
    `,
  });

  return NextResponse.json({
    message: "Message sent successfully. Eshaan will receive it in Gmail.",
  });
}
