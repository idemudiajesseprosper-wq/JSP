"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/Toast";

const initial = {
  title: "",
  description: "",
  propertyType: "house",
  listingType: "sale",
  price: "",
  pricePeriod: "",
  location: "",
  address: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  features: "",
  status: "available",
  featured: false,
  published: false,
  images: [],
  videos: [],
};

export default function AdminPropertyForm({ property }) {
  const router = useRouter();
  const [values, setValues] = useState(
    property
      ? {
          ...initial,
          ...property,
          price: property.price ?? "",
          bedrooms: property.bedrooms ?? "",
          bathrooms: property.bathrooms ?? "",
          features: (property.features || []).join("\n"),
          images: property.images || [],
          videos: property.videos || [],
        }
      : initial,
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  function change(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  async function upload(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: data,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed.");
        const key = result.resourceType === "video" ? "videos" : "images";
        setValues((current) => ({
          ...current,
          [key]: [...current[key], result.url],
        }));
      }
    } catch (cause) {
      setError(cause.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }
  function removeMedia(key, index) {
    setValues((current) => ({
      ...current,
      [key]: current[key].filter((_, item) => item !== index),
    }));
  }
  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        property
          ? `/api/admin/properties/${property._id}`
          : "/api/admin/properties",
        {
          method: property ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save property.");
      router.push("/admin/properties");
      router.refresh();
    } catch (cause) {
      setError(cause.message);
      setSaving(false);
    }
  }
  return (
    <form className="admin-property-form" onSubmit={save}>
      <div className="admin-form-main">
        <section className="admin-form-section">
          <div className="admin-step">
            <span>01</span>
            <div>
              <h2>The essentials</h2>
              <p>Start with the details customers need first.</p>
            </div>
          </div>
          <div className="admin-field-grid">
            <label className="wide">
              Property title{" "}
              <input
                name="title"
                value={values.title}
                onChange={change}
                placeholder="e.g. 4-bedroom duplex in GRA"
                required
                minLength={5}
                maxLength={120}
              />
            </label>
            <label>
              Listing type{" "}
              <select
                name="listingType"
                value={values.listingType}
                onChange={change}
              >
                <option value="sale">For sale</option>
                <option value="rent">For rent</option>
              </select>
            </label>
            <label>
              Property type{" "}
              <select
                name="propertyType"
                value={values.propertyType}
                onChange={change}
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="flat">Flat</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>
            <label>
              Price (₦){" "}
              <input
                name="price"
                type="number"
                min="0"
                value={values.price}
                onChange={change}
                placeholder="0 = price on request"
                required
              />
            </label>
            <label>
              Price period{" "}
              <input
                name="pricePeriod"
                value={values.pricePeriod}
                onChange={change}
                placeholder="e.g. year, month"
                maxLength={40}
              />
            </label>
            <label>
              Location{" "}
              <input
                name="location"
                value={values.location}
                onChange={change}
                placeholder="e.g. GRA, Benin City"
                required
                maxLength={120}
              />
            </label>
            <label>
              Street address (optional){" "}
              <input
                name="address"
                value={values.address}
                onChange={change}
                placeholder="Only add if safe to share"
                maxLength={240}
              />
            </label>
            <label>
              Bedrooms{" "}
              <input
                name="bedrooms"
                type="number"
                min="0"
                max="100"
                value={values.bedrooms}
                onChange={change}
                placeholder="0"
              />
            </label>
            <label>
              Bathrooms{" "}
              <input
                name="bathrooms"
                type="number"
                min="0"
                max="100"
                value={values.bathrooms}
                onChange={change}
                placeholder="0"
              />
            </label>
            <label>
              Area (optional){" "}
              <input
                name="area"
                value={values.area}
                onChange={change}
                placeholder="e.g. 450 sqm"
                maxLength={60}
              />
            </label>
            <label>
              Availability{" "}
              <select name="status" value={values.status} onChange={change}>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </label>
          </div>
        </section>
        <section className="admin-form-section">
          <div className="admin-step">
            <span>02</span>
            <div>
              <h2>Tell the story</h2>
              <p>
                A clear description and a few highlights help buyers decide.
              </p>
            </div>
          </div>
          <div className="admin-field-grid">
            <label className="wide">
              Description{" "}
              <textarea
                name="description"
                value={values.description}
                onChange={change}
                rows={6}
                placeholder="Describe the property, condition, surroundings and what makes it special."
                maxLength={5000}
              />
            </label>
            <label className="wide">
              Features{" "}
              <textarea
                name="features"
                value={values.features}
                onChange={change}
                rows={4}
                placeholder="One feature per line, e.g. Parking, Balcony, Backup power"
              />
            </label>
          </div>
        </section>
        <section className="admin-form-section">
          <div className="admin-step">
            <span>03</span>
            <div>
              <h2>Photos &amp; video</h2>
              <p>
                Upload real property media. The first photo becomes the cover.
              </p>
            </div>
          </div>
          <label className="admin-upload">
            {uploading ? "Uploading…" : "+ Add photos or videos"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
              multiple
              onChange={upload}
              disabled={uploading}
            />
            <small>JPG, PNG, WebP, MP4, WebM or MOV · up to 25MB each</small>
          </label>
          {values.images.length ? (
            <div className="admin-media-grid">
              {values.images.map((url, index) => (
                <div key={url} className="admin-media-item">
                  <Image
                    src={url}
                    alt={`Property upload ${index + 1}`}
                    width={400}
                    height={300}
                    unoptimized
                  />
                  {index === 0 ? <span>Cover photo</span> : null}
                  <button
                    type="button"
                    onClick={() => removeMedia("images", index)}
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          {values.videos.length ? (
            <div className="admin-video-list">
              {values.videos.map((url, index) => (
                <div key={url}>
                  Video {index + 1}
                  <button
                    type="button"
                    onClick={() => removeMedia("videos", index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </div>
      <aside className="admin-form-side">
        <div className="admin-publish-panel">
          <span className="admin-eyebrow">FINAL STEP</span>
          <h2>Ready to share?</h2>
          <p>
            Save as a draft while you work. Publish when the details and cover
            photo are ready.
          </p>
          <label className="admin-toggle">
            <input
              type="checkbox"
              name="published"
              checked={values.published}
              onChange={change}
            />
            <span>Publish on website</span>
          </label>
          <label className="admin-toggle">
            <input
              type="checkbox"
              name="featured"
              checked={values.featured}
              onChange={change}
            />
            <span>Mark as featured</span>
          </label>
          <Toast message={error} type="error" onDismiss={() => setError("")} />
          <button type="submit" disabled={saving || uploading}>
            {saving
              ? "Saving…"
              : property
                ? "Save changes →"
                : values.published
                  ? "Publish property →"
                  : "Save draft →"}
          </button>
          <Link href="/admin/properties">Cancel and return to properties</Link>
        </div>
      </aside>
    </form>
  );
}
