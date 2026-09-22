import { NextResponse } from "next/server";
import { adminCookie, createSession, verifyPassword } from "@/lib/adminAuth";
export async function POST(request) {
  const { email, password } = await request.json();
  if (
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD_HASH ||
    !process.env.SESSION_SECRET
  )
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 503 },
    );
  if (
    String(email).toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase() ||
    !verifyPassword(String(password))
  )
    return NextResponse.json(
      { error: "Invalid admin credentials." },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    adminCookie.name,
    createSession(process.env.ADMIN_EMAIL),
    adminCookie.options,
  );
  return response;
}
