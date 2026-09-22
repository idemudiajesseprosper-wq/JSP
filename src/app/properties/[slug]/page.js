import Image from "next/image";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import { PageNav } from "@/components/SectionPage";
import { getProperty, priceLabel } from "@/lib/properties";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  return property
    ? {
        title: `${property.title} | J.S.P. Real Estate`,
        description: property.description,
      }
    : { title: "Property Not Found | JSP" };
}
export default async function PropertyPage({ params }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();
  const id = String(property._id);
  const whatsapp = `https://wa.me/2348161268386?text=${encodeURIComponent(`Hello JSP Real Estate, I am interested in ${property.title} (${id}) in ${property.location}. I would like to know more about the property.`)}`;
  return (
    <>
      <PageNav />
      <main className="property-detail">
        <section className="property-gallery">
          <Image
            src={property.images?.[0] || "/images/jsp-hero-property.jpeg"}
            alt={property.title}
            fill
            priority
            sizes="100vw"
          />
        </section>
        <section className="shell property-summary">
          <div>
            <span className="eyebrow">
              {property.listingType === "rent" ? "For rent" : "For sale"}
            </span>
            <h1>{property.title}</h1>
            <p className="location">⌖ {property.location}</p>
          </div>
          <strong>{priceLabel(property)}</strong>
        </section>
        <section className="shell property-body">
          <article>
            <h2>About this property</h2>
            <p>{property.description}</p>
            <div className="property-facts">
              <span>
                <small>Type</small>
                {property.propertyType}
              </span>
              {property.bedrooms ? (
                <span>
                  <small>Bedrooms</small>
                  {property.bedrooms}
                </span>
              ) : null}
              {property.bathrooms ? (
                <span>
                  <small>Bathrooms</small>
                  {property.bathrooms}
                </span>
              ) : null}
              <span>
                <small>Property ID</small>
                {id}
              </span>
            </div>
            {property.videos?.length ? (
              <div className="property-video-gallery">
                <h2>Property videos</h2>
                {property.videos.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="property-video-link"
                  >
                    Watch property video {property.videos.indexOf(url) + 1} ↗
                  </a>
                ))}
              </div>
            ) : null}
            <h2>Features</h2>
            <ul>
              {property.features?.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <p>
              <b>Address:</b> {property.address}
            </p>
          </article>
          <aside>
            <h2>Interested in this property?</h2>
            <p>Contact JSP directly. You do not need an account.</p>
            <a
              className="button whatsapp"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <a className="outline dark-outline" href="tel:+2349064668429">
              Call +234 906 466 8429
            </a>
          </aside>
        </section>
        <section className="inquiry-wrap">
          <div className="shell">
            <InquiryForm property={{ id, title: property.title }} />
          </div>
        </section>
      </main>
    </>
  );
}
