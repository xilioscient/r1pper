import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting map
const rateLimit = new Map();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per window

export function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip || "anonymous";

  // Rate limiting logic
  if (request.nextUrl.pathname.startsWith("/api")) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Clean old entries
    rateLimit.forEach((timestamp, key) => {
      if (timestamp < windowStart) rateLimit.delete(key);
    });

    // Check rate limit
    const requestCount = Array.from(rateLimit.entries()).filter(
      ([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart,
    ).length;

    if (requestCount >= MAX_REQUESTS) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add current request to rate limit map
    rateLimit.set(`${ip}-${now}`, now);
  }

  // Security headers
  const headers = new Headers(request.headers);

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    headers.set(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_SITE_URL || "*",
    );
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  // Security headers for all routes
  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  // Common security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ${process.env.NEXT_PUBLIC_SITE_URL || "*"};
      frame-ancestors 'none';
      form-action 'self';
      base-uri 'self';
    `
      .replace(/\s+/g, " ")
      .trim(),
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
