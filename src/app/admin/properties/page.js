import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { ArrowUpRightIcon } from "@/components/ArrowIcons";
import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export const metadata = {
  title: "Properties | JSP Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function AdminPropertiesPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  let properties = [],
    error = "";
  try {
    await connectDB();
    properties = JSON.parse(
      JSON.stringify(await Property.find().sort({ createdAt: -1 }).lean()),
    );
  } catch (cause) {
    error = cause.message;
  }
  return (
    <AdminShell
      eyebrow="PROPERTY MANAGEMENT"
      title="Your properties."
      description="Add new listings, edit details, or keep a listing as a draft until it is ready."
      action={
        <Link href="/admin/properties/new" className="admin-primary-link">
          + Add a property
        </Link>
      }
    >
      {error ? (
        <div className="admin-notice">Database unavailable: {error}</div>
      ) : null}
      <div className="admin-list-toolbar">
        <span>
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"}
        </span>
        <span>Drafts stay private until you publish them.</span>
      </div>
      {properties.length ? (
        <div className="admin-property-list">
          {properties.map((property) => (
            <article key={property._id} className="admin-property-row">
              <div className="admin-list-photo">
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
              <div className="admin-list-info">
                <div>
                  <span
                    className={
                      property.published ? "admin-pill live" : "admin-pill"
                    }
                  >
                    {property.published ? "Published" : "Draft"}
                  </span>
                  <span className="admin-pill neutral">
                    {property.listingType === "rent" ? "For rent" : "For sale"}
                  </span>
                </div>
                <h2>{property.title}</h2>
                <p>
                  {property.location} ·{" "}
                  {property.price
                    ? `₦${Number(property.price).toLocaleString("en-NG")}`
                    : "Price on request"}
                </p>
              </div>
              <div className="admin-list-actions">
                <Link href={`/admin/properties/${property._id}/edit`}>
                  Edit property{" "}
                  <ArrowUpRightIcon className="admin-arrow-icon" />
                </Link>
                {property.published ? (
                  <Link href={`/properties/${property.slug}`} target="_blank">
                    View live <ArrowUpRightIcon className="admin-arrow-icon" />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : !error ? (
        <div className="admin-empty-panel">
          <span>01 / YOUR FIRST LISTING</span>
          <h2>Let’s put your first property on the map.</h2>
          <p>
            Start with the basic details. You can save a draft and come back to
            the photos later.
          </p>
          <Link href="/admin/properties/new">
            Add your first property{" "}
            <ArrowUpRightIcon className="admin-arrow-icon" />
          </Link>
        </div>
      ) : null}
    </AdminShell>
  );
}
