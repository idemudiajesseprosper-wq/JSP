import { NextResponse } from "next/server";
import { adminCookie, createSession, verifyPassword } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import AdminAccount from "@/models/AdminAccount";

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

  const normalizedEmail = String(email).trim().toLowerCase();
  if (normalizedEmail !== process.env.ADMIN_EMAIL.trim().toLowerCase())
    return NextResponse.json(
      { error: "Invalid admin credentials." },
      { status: 401 },
    );

  let configuredHash = process.env.ADMIN_PASSWORD_HASH;
  try {
    await connectDB();
    const account = await AdminAccount.findOne({ email: normalizedEmail })
      .select("+passwordHash")
      .lean();
    if (account?.passwordHash) configuredHash = account.passwordHash;
  } catch {
    // Keep the bootstrap credential available while Atlas is temporarily unavailable.
  }

  if (!verifyPassword(String(password), configuredHash))
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
