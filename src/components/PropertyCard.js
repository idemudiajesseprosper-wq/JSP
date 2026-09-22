"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InquiryForm from "@/components/InquiryForm";

function priceLabel(property) {
  if (!property.price) return "Price on request";
  return `₦${Number(property.price).toLocaleString("en-NG")}${property.pricePeriod ? ` / ${property.pricePeriod}` : ""}`;
}
export default function PropertyCard({ property }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);
  const id = String(property._id);
  const wa = `https://wa.me/2348161268386?text=${encodeURIComponent(`Hello JSP Real Estate, I am interested in ${property.title} (${id}) in ${property.location}. I would like to know more.`)}`;
  return (
    <>
      <article className="public-property-card">
        <button
          type="button"
          className="property-card-open"
          onClick={() => setOpen(true)}
          aria-label={`View details for ${property.title}`}
        >
          <div className="card-media">
            <Image
              src={property.images?.[0] || "/images/jsp-hero-property.jpeg"}
              alt={property.title}
              fill
              sizes="(max-width:740px) 100vw, 33vw"
            />
            <span>
              {property.listingType === "rent" ? "For Rent" : "For Sale"}
            </span>
            <i>View details →</i>
          </div>
          <section>
            <div className="card-price">
              <strong>{priceLabel(property)}</strong>
              <small>
                {property.pricePeriod ? `/ ${property.pricePeriod}` : ""}
              </small>
            </div>
            <h2>{property.title}</h2>
            <p>⌖ {property.location}</p>
            <ul>
              {property.bedrooms ? (
                <li>⌂ {property.bedrooms} bedrooms</li>
              ) : null}
              {property.bathrooms ? (
                <li>♨ {property.bathrooms} bathrooms</li>
              ) : null}
              <li>◇ {property.propertyType}</li>
            </ul>
          </section>
        </button>
      </article>
      {open ? (
        <div
          className="property-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${property.title} details`}
        >
          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Close property details"
          />
          <aside className="property-drawer">
            <header>
              <span>Property Details</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close property details"
              >
                ×
              </button>
            </header>
            <div className="drawer-property-media">
              <Image
                src={property.images?.[0] || "/images/jsp-hero-property.jpeg"}
                alt={property.title}
                fill
                sizes="(max-width:740px) 100vw, 52vw"
              />
            </div>
            <div className="drawer-property-content">
              <span className="eyebrow">
                {property.listingType === "rent" ? "For rent" : "For sale"}
              </span>
              <h2>{property.title}</h2>
              <strong>{priceLabel(property)}</strong>
              <p className="drawer-location">⌖ {property.location}</p>
              <div className="drawer-facts">
                {property.bedrooms ? (
                  <span>
                    <b>{property.bedrooms}</b> Bedrooms
                  </span>
                ) : null}
                {property.bathrooms ? (
                  <span>
                    <b>{property.bathrooms}</b> Bathrooms
                  </span>
                ) : null}
                <span>
                  <b>{property.propertyType}</b> Type
                </span>
              </div>
              <p>{property.description}</p>
              {property.videos?.[0] ? (
                <video
                  muted
                  controls
                  preload="metadata"
                  src={property.videos[0]}
                />
              ) : null}
              <div className="drawer-ctas">
                <a
                  className="button whatsapp"
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
                <a className="outline dark-outline" href="tel:+2349064668429">
                  Call JSP
                </a>
              </div>
              <Link
                className="full-details-link"
                href={`/properties/${property.slug}`}
              >
                Open shareable property page →
              </Link>
              <InquiryForm property={{ id, title: property.title }} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
