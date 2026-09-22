import AdminLoginForm from "@/components/AdminLoginForm";
export const metadata = {
  title: "Admin Login | JSP Real Estate",
  robots: { index: false, follow: false },
};
export default function AdminLogin() {
  return (
    <main className="admin-login-page">
      <AdminLoginForm />
    </main>
  );
}
