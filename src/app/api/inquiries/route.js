import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Property from "@/models/Property";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").replace(/[^\d+]/g, "");
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const message = String(body.message || "").trim();
    const propertyId = String(body.propertyId || "").trim();
    const propertyTitle = String(body.propertyTitle || "").trim();
    if (
      fullName.length < 2 ||
      phone.replace(/\D/g, "").length < 10 ||
      message.length < 10 ||
      !propertyId ||
      !propertyTitle
    )
      return NextResponse.json(
        { error: "Please complete all required fields correctly." },
        { status: 400 },
      );
    if (email && !emailPattern.test(email))
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    await connectDB();
    const property = await Property.findOne({
      $or: [{ _id: mongooseId(propertyId) }, { slug: propertyId }],
      published: true,
    })
      .lean()
      .catch(() => null);
    if (property && property.title !== propertyTitle)
      return NextResponse.json(
        { error: "Property information is invalid." },
        { status: 400 },
      );
    const fingerprint = createHash("sha256")
      .update(`${propertyId}|${phone}|${message.toLowerCase()}`)
      .digest("hex");
    const recent = await Inquiry.exists({
      fingerprint,
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
    });
    if (recent)
      return NextResponse.json(
        { error: "This inquiry was already submitted recently." },
        { status: 409 },
      );
    await Inquiry.create({
      propertyId,
      propertyTitle,
      fullName,
      phone,
      email: email || undefined,
      message,
      status: "new",
      fingerprint,
    });
    return NextResponse.json(
      { message: "Your inquiry has been sent to JSP." },
      { status: 201 },
    );
  } catch (error) {
    const unavailable = error.message?.includes("MONGODB_URI");
    return NextResponse.json(
      {
        error: unavailable
          ? "Inquiry service is awaiting database configuration."
          : "Unable to submit your inquiry right now.",
      },
      { status: unavailable ? 503 : 500 },
    );
  }
}
function mongooseId(value) {
  return /^[a-f\d]{24}$/i.test(value) ? value : "000000000000000000000000";
}
