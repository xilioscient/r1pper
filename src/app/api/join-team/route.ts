import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const message = `
🚀 Nuova Richiesta di Unione al Team

👤 Nome: ${data.name}
📧 Email: ${data.email}
🔗 GitHub: ${data.github}
💼 Ruolo: ${data.role}
🛠 Skills: ${data.skills}

📝 Messaggio:
${data.message}
    `;

    const mailOptions = {
      from: EMAIL_USER,
      to: "root.gore.it@gmail.com",
      subject: `Nuova richiesta di unione al team da ${data.name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing team join request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
