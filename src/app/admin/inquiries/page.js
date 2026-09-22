import { redirect } from "next/navigation";
import AdminInquiryActions from "@/components/AdminInquiryActions";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export const metadata = {
  title: "Inquiries | JSP Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function InquiriesPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  let inquiries = [],
    error = "";
  try {
    await connectDB();
    inquiries = JSON.parse(
      JSON.stringify(await Inquiry.find().sort({ createdAt: -1 }).lean()),
    );
  } catch (cause) {
    error = cause.message;
  }
  return (
    <AdminShell
      eyebrow="CUSTOMER CONVERSATIONS"
      title="Property inquiries."
      description="See what customers are interested in, follow up, and keep each conversation moving."
    >
      {error ? (
        <div className="admin-notice">Database unavailable: {error}</div>
      ) : null}
      <div className="admin-list-toolbar">
        <span>
          {inquiries.length} {inquiries.length === 1 ? "inquiry" : "inquiries"}
        </span>
        <span>Newest messages appear first.</span>
      </div>
      <div className="admin-inquiries">
        {inquiries.map((item) => (
          <article key={item._id}>
            <div>
              <span className={`status status-${item.status}`}>
                {item.status}
              </span>
              <time>{new Date(item.createdAt).toLocaleString("en-NG")}</time>
            </div>
            <h2>{item.fullName}</h2>
            <p className="admin-property">
              {item.propertyTitle} · ID {item.propertyId}
            </p>
            <p>{item.message}</p>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd>{item.phone}</dd>
              </div>
              {item.email ? (
                <div>
                  <dt>Email</dt>
                  <dd>{item.email}</dd>
                </div>
              ) : null}
            </dl>
            <AdminInquiryActions inquiry={item} />
          </article>
        ))}
        {!error && !inquiries.length ? (
          <div className="admin-empty-panel">
            <span>NO MESSAGES YET</span>
            <h2>Conversations will start here.</h2>
            <p>
              When visitors contact JSP about a published property, their
              inquiry will appear here.
            </p>
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
