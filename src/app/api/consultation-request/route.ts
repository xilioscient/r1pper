import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Form validation schema (same as client-side)
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  serviceType: z.enum([
    "pentest",
    "security-audit",
    "code-review",
    "network-security",
    "web-security",
    "training",
    "other",
  ]),
  budget: z.enum(["small", "medium", "large", "enterprise", "discuss"]),
  timeline: z.enum(["urgent", "short", "medium", "long", "flexible"]),
  description: z.string().min(10).max(1000),
  priority: z.enum(["low", "normal", "high"]),
});

// Simple in-memory rate limiting
const requestLog = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // requests per hour
const RATE_WINDOW = 3600000; // 1 hour in milliseconds

// Hardcoded CSRF token (in production, this should be rotated regularly)
const CSRF_TOKEN = "the-eye-security-token-2024";

// Email configuration using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "root.gore.it@gmail.com",
    // Use App Password instead of regular password
    pass: "your-gmail-app-password",
  },
});

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    // Check rate limit
    const now = Date.now();
    const userRequests = requestLog.get(ip) || { count: 0, timestamp: now };

    // Clean up old entries
    if (now - userRequests.timestamp > RATE_WINDOW) {
      userRequests.count = 0;
      userRequests.timestamp = now;
    }

    if (userRequests.count >= RATE_LIMIT) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    // Update rate limit counter
    userRequests.count++;
    requestLog.set(ip, userRequests);

    // Validate CSRF token
    const csrfToken = request.headers.get("x-csrf-token");
    if (!csrfToken || csrfToken !== CSRF_TOKEN) {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = formSchema.parse(body);

    // Prepare email content
    const emailContent = `
      Nuova Richiesta di Consulenza
      
      Nome: ${validatedData.name}
      Email: ${validatedData.email}
      Azienda: ${validatedData.company || "Non specificata"}
      Tipo di Servizio: ${validatedData.serviceType}
      Budget: ${validatedData.budget}
      Tempistica: ${validatedData.timeline}
      Priorità: ${validatedData.priority}
      
      Descrizione:
      ${validatedData.description}
      
      IP: ${ip}
      Data: ${new Date().toISOString()}
    `;

    // Send notification email
    await transporter.sendMail({
      from: "root.gore.it@gmail.com",
      to: "root.gore.it@gmail.com",
      subject: `Nuova richiesta di consulenza da ${validatedData.name}`,
      text: emailContent,
    });

    // Send auto-reply
    await transporter.sendMail({
      from: "root.gore.it@gmail.com",
      to: validatedData.email,
      subject: "Richiesta ricevuta - The Eye",
      text: `
        Gentile ${validatedData.name},

        Grazie per averci contattato. Abbiamo ricevuto la tua richiesta di consulenza e la esamineremo al più presto.
        
        Ti risponderemo entro 24-48 ore lavorative.
        
        Cordiali saluti,
        The Eye Team
      `,
    });

    return NextResponse.json({
      message: "Richiesta inviata con successo",
      requestId: crypto.randomUUID(),
    });
  } catch (error) {
    console.error("Errore richiesta consulenza:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dati non validi",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Errore interno del server",
      },
      { status: 500 },
    );
  }
}
