import mongoose from "mongoose";
import { notFound, redirect } from "next/navigation";
import AdminPropertyForm from "@/components/AdminPropertyForm";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export const metadata = {
  title: "Edit Property | JSP Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function EditPropertyPage({ params }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  await connectDB();
  const property = await Property.findById(id).lean();
  if (!property) notFound();
  return (
    <AdminShell
      eyebrow="EDIT LISTING"
      title="Edit property."
      description={`Update ${property.title}. Changes to published listings appear on the website after saving.`}
    >
      <AdminPropertyForm property={JSON.parse(JSON.stringify(property))} />
    </AdminShell>
  );
}
