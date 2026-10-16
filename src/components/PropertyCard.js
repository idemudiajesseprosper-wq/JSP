"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import InquiryForm from "@/components/InquiryForm";
import PropertyMediaGallery from "@/components/PropertyMediaGallery";

function priceLabel(property) {
  if (!property.price) return "Price on request";
  const amount = Number(property.price).toLocaleString("en-NG");
  const period = property.pricePeriod ? ` / ${property.pricePeriod}` : "";
  return `\u20A6${amount}${period}`;
}

export default function PropertyCard({ property }) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  const id = String(property._id);
  const whatsapp = `https://wa.me/2348161268386?text=${encodeURIComponent(
    `Hello JSP Real Estate, I am interested in ${property.title} (${id}) in ${property.location}. I would like to know more.`,
  )}`;

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
            <span
              className={`card-listing-status status-${property.status || "available"}`}
            >
              {property.status || "available"}
            </span>
            <i>View details &rarr;</i>
          </div>
          <section>
            <div className="card-price">
              <strong>{priceLabel(property)}</strong>
            </div>
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <ul>
              {property.bedrooms ? (
                <li>{property.bedrooms} bedrooms</li>
              ) : null}
              {property.bathrooms ? (
                <li>{property.bathrooms} bathrooms</li>
              ) : null}
              <li>{property.propertyType}</li>
            </ul>
          </section>
        </button>
      </article>

      {open
        ? createPortal(
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
            <header className="property-drawer-header">
              <span>JSP / Listing details</span>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Close property details"
              >
                &times;
              </button>
            </header>

            <PropertyMediaGallery property={property} variant="drawer" />

            <div className="drawer-property-content">
              <div className="drawer-listing-intro">
                <div>
                  <span className="drawer-property-type">
                    {property.propertyType}
                  </span>
                  <span
                    className={`drawer-listing-status status-${property.status || "available"}`}
                  >
                    {property.status || "available"}
                  </span>
                  <h2>{property.title}</h2>
                  <p className="drawer-location">{property.location}</p>
                </div>
                <strong>{priceLabel(property)}</strong>
              </div>

              <dl className="drawer-facts">
                <div>
                  <dt>Property type</dt>
                  <dd>{property.propertyType}</dd>
                </div>
                {property.bedrooms ? (
                  <div>
                    <dt>Bedrooms</dt>
                    <dd>{property.bedrooms}</dd>
                  </div>
                ) : null}
                {property.bathrooms ? (
                  <div>
                    <dt>Bathrooms</dt>
                    <dd>{property.bathrooms}</dd>
                  </div>
                ) : null}
                {property.area ? (
                  <div>
                    <dt>Area</dt>
                    <dd>{property.area}</dd>
                  </div>
                ) : null}
              </dl>

              {property.description ? (
                <section className="drawer-description">
                  <h3>About this property</h3>
                  <p>{property.description}</p>
                </section>
              ) : null}

              {property.features?.length ? (
                <section className="drawer-features">
                  <h3>Key features</h3>
                  <ul>
                    {property.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              ) : null}


              <div className="drawer-ctas">
                <a
                  className="button whatsapp"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
                <a className="outline dark-outline" href="tel:+2349064668429">
                  Call JSP
                </a>
              </div>
              <Link
                className="full-details-link"
                href={`/properties/${property.slug}`}
              >
                View the full listing
              </Link>
              <InquiryForm property={{ id, title: property.title }} />
            </div>
          </aside>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}
