import { NextResponse } from "next/server";
import {
  adminCookie,
  createPasswordHash,
  isAdmin,
  verifyPassword,
} from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import AdminAccount from "@/models/AdminAccount";

function validPassword(password) {
  return (
    password.length >= 12 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export async function PATCH(request) {
  if (!(await isAdmin()))
    return NextResponse.json(
      { error: "Your session has expired. Sign in again." },
      { status: 401 },
    );

  try {
    const { currentPassword, newPassword, confirmPassword } =
      await request.json();
    if (newPassword !== confirmPassword)
      return NextResponse.json(
        { error: "The new passwords do not match." },
        { status: 400 },
      );
    if (!validPassword(String(newPassword || "")))
      return NextResponse.json(
        {
          error:
            "Use at least 12 characters with uppercase, lowercase, a number and a symbol.",
        },
        { status: 400 },
      );
    if (currentPassword === newPassword)
      return NextResponse.json(
        { error: "Choose a password different from your current password." },
        { status: 400 },
      );

    await connectDB();
    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const account = await AdminAccount.findOne({ email }).select(
      "+passwordHash",
    );
    const currentHash =
      account?.passwordHash || process.env.ADMIN_PASSWORD_HASH;
    if (!verifyPassword(String(currentPassword || ""), currentHash))
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 400 },
      );

    const passwordHash = createPasswordHash(newPassword);
    await AdminAccount.findOneAndUpdate(
      { email },
      { email, passwordHash, passwordChangedAt: new Date() },
      { upsert: true, new: true, runValidators: true },
    );

    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookie.name, "", {
      ...adminCookie.options,
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not change the password." },
      { status: 500 },
    );
  }
}
