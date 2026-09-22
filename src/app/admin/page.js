import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Property from "@/models/Property";

export const metadata = {
  title: "Dashboard | JSP Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  let properties = 0,
    published = 0,
    newInquiries = 0,
    recent = [],
    error = "";
  try {
    await connectDB();
    [properties, published, newInquiries, recent] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ published: true }),
      Inquiry.countDocuments({ status: "new" }),
      Property.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .select("title location published images slug createdAt")
        .lean(),
    ]);
    recent = JSON.parse(JSON.stringify(recent));
  } catch (cause) {
    error = cause.message;
  }
  return (
    <AdminShell
      eyebrow="YOUR WORKSPACE"
      title="Good to see you."
      description="Everything you need to manage JSP listings and respond to customers."
      action={
        <Link className="admin-primary-link" href="/admin/properties/new">
          + Add a property
        </Link>
      }
    >
      {error ? (
        <div className="admin-notice">Database unavailable: {error}</div>
      ) : null}
      <div className="admin-stat-grid">
        <Link href="/admin/properties">
          <span>ALL PROPERTIES</span>
          <strong>{properties}</strong>
          <small>View and manage listings ↗</small>
        </Link>
        <Link href="/admin/properties">
          <span>LIVE ON WEBSITE</span>
          <strong>{published}</strong>
          <small>Published properties ↗</small>
        </Link>
        <Link href="/admin/inquiries">
          <span>NEW INQUIRIES</span>
          <strong>{newInquiries}</strong>
          <small>Respond to customers ↗</small>
        </Link>
      </div>
      <div className="admin-dashboard-grid">
        <section className="admin-dashboard-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-eyebrow">YOUR PORTFOLIO</span>
              <h2>Recent properties</h2>
            </div>
            <Link href="/admin/properties">View all ↗</Link>
          </div>
          {recent.length ? (
            recent.map((property) => (
              <Link
                className="admin-recent-row"
                href={`/admin/properties/${property._id}/edit`}
                key={String(property._id)}
              >
                <div className="admin-recent-thumb">
                  {property.images?.[0] ? (
                    <Image
                      src={property.images[0]}
                      alt=""
                      width={160}
                      height={120}
                      unoptimized
                    />
                  ) : (
                    <span>JSP</span>
                  )}
                </div>
                <div>
                  <strong>{property.title}</strong>
                  <small>{property.location}</small>
                </div>
                <span
                  className={
                    property.published ? "admin-pill live" : "admin-pill"
                  }
                >
                  {property.published ? "Live" : "Draft"}
                </span>
              </Link>
            ))
          ) : (
            <p className="admin-dashboard-empty">
              No properties yet. Add your first listing to get started.
            </p>
          )}
        </section>
        <section className="admin-dashboard-panel admin-quickstart">
          <span className="admin-eyebrow">A SIMPLE START</span>
          <h2>List a property in three steps.</h2>
          <ol>
            <li>
              <b>01</b> Add the property details
            </li>
            <li>
              <b>02</b> Upload real photos or a video
            </li>
            <li>
              <b>03</b> Publish when ready
            </li>
          </ol>
          <Link href="/admin/properties/new">Create a listing ↗</Link>
        </section>
      </div>
    </AdminShell>
  );
}
