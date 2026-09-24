import { redirect } from "next/navigation";
import AdminPasswordForm from "@/components/AdminPasswordForm";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/adminAuth";

export const metadata = {
  title: "Security | JSP Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSecurityPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <AdminShell
      eyebrow="ACCOUNT SECURITY"
      title="Password & security."
      description="Change the permanent password used to access the JSP staff dashboard."
    >
      <div className="admin-security-layout">
        <AdminPasswordForm />
        <aside className="admin-security-note">
          <span>SECURITY NOTE</span>
          <h2>Keep the workspace private.</h2>
          <p>
            Never share the admin password through WhatsApp, email or public
            documents. Change it immediately if someone who should not have
            access has seen it.
          </p>
          <dl>
            <div>
              <dt>Session duration</dt>
              <dd>8 hours</dd>
            </div>
            <div>
              <dt>Password storage</dt>
              <dd>Salted secure hash</dd>
            </div>
            <div>
              <dt>Customer accounts</dt>
              <dd>Not required</dd>
            </div>
          </dl>
        </aside>
      </div>
    </AdminShell>
  );
}
