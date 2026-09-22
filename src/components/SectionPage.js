import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["Home", "/"],
  ["Properties", "/properties"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
const pageContent = {
  properties: {
    eyebrow: "Discover JSP properties",
    title: "Find a Property That Fits",
    intro:
      "Browse residential property and land opportunities. Full live listings and filters will be connected when the JSP property database is supplied.",
    items: ["Houses", "Apartments", "Flats", "Land"],
  },
  services: {
    eyebrow: "What we do",
    title: "Property Support, From Search to Management",
    intro:
      "JSP supports renters, buyers, sellers and property owners, and offers quality pre-owned furniture and home appliances.",
    items: [
      "Property Rentals",
      "Property Sales",
      "Land Sales",
      "Property Management",
      "Pre-owned Furniture & Home Appliances",
    ],
  },
  about: {
    eyebrow: "About JSP",
    title: "Your Trusted Property Partner",
    intro:
      "J.S.P. Real Estate & Property Ventures helps clients find, rent, buy, sell and manage suitable residential and commercial property in Delta State, Nigeria.",
    items: [
      "Trusted Service",
      "Transparent Process",
      "Quality Properties",
      "Client-Focused Support",
    ],
  },
  contact: {
    eyebrow: "Talk to JSP",
    title: "Let’s Find Your Perfect Property",
    intro:
      "Tell us what you are looking for and our team will help you identify the right option. Call, email or chat with JSP directly.",
    items: [
      "WhatsApp: +234 816 126 8386",
      "Phone: +234 906 466 8429",
      "Email: jsprealestateandpropertymanage@gmail.com",
      "Office: Along Ogheghe Road, off Sapele Road, Bypass, Benin City",
    ],
  },
};
function Brand() {
  return (
    <Link className="inner-brand" href="/">
      <Image
        src="/images/jsp-logo-transparent.png"
        alt="J.S.P. Real Estate & Properties Management Ventures"
        width={120}
        height={72}
        priority
      />
    </Link>
  );
}
export function PageNav() {
  return (
    <header className="inner-header">
      <div className="shell inner-nav">
        <Brand />
        <nav>
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="pill"
          href="https://wa.me/2348161268386?text=Hello%20JSP%20Real%20Estate%2C%20I%20would%20like%20to%20make%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </Link>
        <input className="inner-toggle" id="inner-toggle" type="checkbox" />
        <label
          className="inner-open"
          htmlFor="inner-toggle"
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </label>
        <aside className="inner-drawer">
          <div>
            <Brand />
            <label
              className="inner-close"
              htmlFor="inner-toggle"
              aria-label="Close navigation"
            >
              ×
            </label>
          </div>
          <nav>
            {navigation.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
export default function SectionPage({ page }) {
  const content = pageContent[page];
  return (
    <>
      <PageNav />
      <main className="inner-main">
        <section className="inner-hero">
          <div className="shell">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
          </div>
        </section>
        <section className="inner-content shell">
          <div className="inner-list">
            {content.items.map((item, index) => (
              <article key={item}>
                <small>0{index + 1}</small>
                <h2>{item}</h2>
                <span>→</span>
              </article>
            ))}
          </div>
          <div className="inner-photo">
            <Image
              src="/images/jsp-hero-property.jpeg"
              alt="Modern property represented by JSP"
              fill
              sizes="(max-width: 740px) 100vw, 50vw"
            />
          </div>
        </section>
        {page === "services" && (
          <section
            className="shell management-detail-page"
            id="property-management"
          >
            <span className="eyebrow">For property owners</span>
            <h2>Your property. Properly managed.</h2>
            <p>
              JSP supports owners with property oversight, apartment management,
              furnished-property support and maintenance coordination. Tell us
              about your property and we can discuss the right level of care.
            </p>
            <Link href="/contact">Discuss your property with JSP →</Link>
          </section>
        )}
      </main>
      <footer className="inner-footer">
        <div className="shell">
          <Brand />
          <span>© 2026 J.S.P. Real Estate & Property Ventures.</span>
        </div>
      </footer>
    </>
  );
}
