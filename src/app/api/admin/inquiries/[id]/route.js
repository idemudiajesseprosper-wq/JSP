import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

const statuses = ["new", "contacted", "qualified", "closed"];
export async function PATCH(request, { params }) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = await request.json();
  if (!statuses.includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  await connectDB();
  const inquiry = await Inquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  ).lean();
  if (!inquiry)
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  return NextResponse.json({ inquiry });
}
