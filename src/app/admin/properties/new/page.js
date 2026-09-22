import { redirect } from "next/navigation";
import AdminPropertyForm from "@/components/AdminPropertyForm";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/adminAuth";

export const metadata = {
  title: "Add Property | JSP Admin",
  robots: { index: false, follow: false },
};
export default async function NewPropertyPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <AdminShell
      eyebrow="NEW LISTING"
      title="Add a property."
      description="A few clear details are all you need to get started. Save a draft at any time."
    >
      <AdminPropertyForm />
    </AdminShell>
  );
}
