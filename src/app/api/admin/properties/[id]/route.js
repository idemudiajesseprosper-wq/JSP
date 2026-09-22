import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { validatePropertyInput } from "@/lib/adminProperties";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function PATCH(request, { params }) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id))
    return NextResponse.json(
      { error: "Invalid property ID." },
      { status: 400 },
    );
  try {
    const input = await request.json();
    const result = validatePropertyInput(input);
    if (result.error) return NextResponse.json(result, { status: 400 });
    await connectDB();
    const property = await Property.findByIdAndUpdate(
      id,
      { $set: result.property },
      { new: true, runValidators: true },
    );
    if (!property)
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );
    return NextResponse.json({ id: String(property._id), slug: property.slug });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not update property." },
      { status: 500 },
    );
  }
}
