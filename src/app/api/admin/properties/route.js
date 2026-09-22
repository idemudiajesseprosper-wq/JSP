import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { validatePropertyInput } from "@/lib/adminProperties";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function POST(request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const input = await request.json();
    const result = validatePropertyInput(input);
    if (result.error) return NextResponse.json(result, { status: 400 });
    await connectDB();
    const slugBase =
      result.property.title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "property";
    const property = await Property.create({
      ...result.property,
      slug: `${slugBase}-${randomBytes(3).toString("hex")}`,
    });
    return NextResponse.json(
      { id: String(property._id), slug: property.slug },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not save property." },
      { status: 500 },
    );
  }
}
