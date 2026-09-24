import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "jsp_admin_session";

function signature(value) {
  return createHmac("sha256", process.env.SESSION_SECRET || "")
    .update(value)
    .digest("base64url");
}

export function createPasswordHash(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(
  password,
  configuredHash = process.env.ADMIN_PASSWORD_HASH,
) {
  if (!configuredHash || !process.env.SESSION_SECRET) return false;
  const [salt, hash] = configuredHash.split(":");
  if (!salt || !hash || !/^[0-9a-f]{128}$/i.test(hash)) return false;
  const candidate = scryptSync(String(password), salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  );
}

export function createSession(email) {
  const payload = `${email}.${Date.now() + 8 * 60 * 60 * 1000}`;
  return `${payload}.${signature(payload)}`;
}

export function verifySession(token) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const signatureSeparator = token.lastIndexOf(".");
  const expirySeparator = token.lastIndexOf(".", signatureSeparator - 1);
  if (expirySeparator < 1 || signatureSeparator <= expirySeparator + 1)
    return false;
  const email = token.slice(0, expirySeparator);
  const expiresAt = token.slice(expirySeparator + 1, signatureSeparator);
  const receivedSignature = token.slice(signatureSeparator + 1);
  const expected = signature(token.slice(0, signatureSeparator));
  if (
    expected.length !== receivedSignature.length ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(receivedSignature))
  )
    return false;
  return (
    Number(expiresAt) > Date.now() &&
    email.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase()
  );
}

export async function isAdmin() {
  return verifySession((await cookies()).get(COOKIE)?.value);
}

export const adminCookie = {
  name: COOKIE,
  options: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  },
};
