import Image from "next/image";
import Link from "next/link";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import { ArrowUpRightIcon } from "@/components/ArrowIcons";

const navigation = [
  ["Home", "/"],
  ["Properties", "/properties"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const pageContent = {
  services: {
    eyebrow: "What JSP does",
    title: "One partner, every property move.",
    intro:
      "From finding the right home to protecting the value of one you already own, JSP brings practical property services together with clear, attentive guidance.",
    image: "/images/renting-service-house.jpeg",
    imageAlt: "A residential home representing JSP property services",
    imageNote: "Rent · Buy · Sell · Manage",
    statement: "Property support shaped around real life.",
    statementText:
      "We work with renters, buyers, sellers and property owners across Edo, Delta and other cities in Nigeria—making every next step easier to understand.",
    items: [
      [
        "Renting",
        "Homes, apartments and flats selected around your needs, location and budget.",
      ],
      [
        "Property sales",
        "Thoughtful support for clients buying or selling residential and commercial property.",
      ],
      [
        "Land sales",
        "Land opportunities presented with the information needed to make a confident decision.",
      ],
      [
        "Property management",
        "Practical oversight, apartment management, furnished-property support and maintenance coordination.",
      ],
      [
        "Pre-owned home essentials",
        "Carefully presented second-hand furniture and home appliances for practical, comfortable living.",
      ],
    ],
  },
  about: {
    eyebrow: "About JSP",
    title: "Property is personal. So are we.",
    intro:
      "J.S.P. Real Estate & Property Ventures helps people find, rent, buy, sell and manage property with confidence, clarity and dependable local support.",
    image: "/images/jsp-why-choose-interior.jpeg",
    imageAlt: "A warm, thoughtfully finished living space",
    imageNote: "JSP · Real Estate & Property Ventures",
    statement: "Rooted in Benin City. Connected across Nigeria.",
    statementText:
      "Our headquarters is in Benin City, and our work serves clients across Edo, Delta and other cities in Nigeria. Wherever the opportunity is, we bring the same considered approach.",
    items: [
      [
        "Trusted service",
        "Straightforward support built around your needs and long-term interests.",
      ],
      [
        "Transparent process",
        "Clear communication from the first conversation to the final decision.",
      ],
      [
        "Quality opportunities",
        "Properties, land and home solutions presented with care and useful context.",
      ],
      [
        "Client-focused guidance",
        "A responsive team that listens first and helps you move with confidence.",
      ],
    ],
  },
  contact: {
    eyebrow: "Contact JSP",
    title: "The right property starts with a conversation.",
    intro:
      "Tell us what you want to rent, buy, sell or manage. Our team will help you understand the next step and identify suitable options.",
    image: "/images/jsp-hero-interior.jpeg",
    imageAlt: "A refined modern interior",
    imageNote: "Headquarters · Benin City",
    statement: "Speak directly with the JSP team.",
    statementText:
      "Our headquarters is in Benin City, serving property clients across Edo, Delta and other cities in Nigeria.",
    items: [
      ["WhatsApp", "+234 816 126 8386"],
      ["Call", "+234 906 466 8429"],
      ["Email", "jsprealestateandpropertymanage@gmail.com"],
      ["Visit", "Along Ogheghe Road, off Sapele Road, Bypass, Benin City"],
    ],
  },
};

function Brand() {
  return (
    <Link className="inner-brand" href="/" aria-label="JSP homepage">
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
        <nav aria-label="Primary navigation">
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
          <nav aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <Link
            className="inner-drawer-cta"
            href="https://wa.me/2348161268386?text=Hello%20JSP%20Real%20Estate%2C%20I%20would%20like%20to%20make%20an%20enquiry."
            target="_blank"
            rel="noopener noreferrer"
          >
            Start a WhatsApp chat{" "}
            <span>
              <ArrowUpRightIcon />
            </span>
          </Link>
        </aside>
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer className="editorial-page-footer">
      <div className="shell editorial-footer-grid">
        <div>
          <Brand />
          <p>
            Property discovery and professional management across Edo, Delta and
            other cities in Nigeria.
          </p>
        </div>
        <div>
          <span>Headquarters</span>
          <p>Along Ogheghe Road, off Sapele Road, Bypass, Benin City</p>
        </div>
        <div>
          <span>Direct contact</span>
          <a href="tel:+2349064668429">+234 906 466 8429</a>
          <a href="mailto:jsprealestateandpropertymanage@gmail.com">
            jsprealestateandpropertymanage@gmail.com
          </a>
        </div>
      </div>
      <div className="shell editorial-footer-base">
        <span>© 2026 J.S.P. Real Estate & Property Ventures.</span>
        <Link href="/properties">Browse properties →</Link>
      </div>
    </footer>
  );
}

function ContactItem({ title, detail }) {
  const href =
    title === "WhatsApp"
      ? "https://wa.me/2348161268386"
      : title === "Call"
        ? "tel:+2349064668429"
        : title === "Email"
          ? "mailto:jsprealestateandpropertymanage@gmail.com"
          : null;
  const body = (
    <>
      <span>{title}</span>
      <h2>{detail}</h2>
      <b aria-hidden="true">
        <ArrowUpRightIcon />
      </b>
    </>
  );
  return href ? (
    <a className="editorial-contact-row" href={href} data-reveal>
      {body}
    </a>
  ) : (
    <div className="editorial-contact-row" data-reveal>
      {body}
    </div>
  );
}

export default function SectionPage({ page }) {
  const content = pageContent[page];
  const isContact = page === "contact";
  return (
    <>
      <PageNav />
      <ScrollRevealObserver />
      <main className={`editorial-page editorial-page-${page}`}>
        <section className="editorial-page-hero">
          <div className="shell editorial-page-hero-grid">
            <div className="editorial-page-heading" data-reveal="left">
              <span className="eyebrow">{content.eyebrow}</span>
              <h1>{content.title}</h1>
              <p>{content.intro}</p>
              <Link
                className="editorial-page-action"
                href={isContact ? "https://wa.me/2348161268386" : "/contact"}
              >
                {isContact ? "Chat with JSP" : "Talk to JSP"}{" "}
                <span>
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </div>
            <figure className="editorial-page-visual" data-reveal="right">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                priority
                sizes="(max-width: 780px) 100vw, 48vw"
              />
              <figcaption>{content.imageNote}</figcaption>
            </figure>
          </div>
        </section>

        <section className="shell editorial-page-statement" data-reveal>
          <span>JSP / {content.eyebrow}</span>
          <h2>{content.statement}</h2>
          <p>{content.statementText}</p>
        </section>

        <section className="shell editorial-page-offerings">
          <div className="editorial-page-offerings-head" data-reveal="left">
            <span className="eyebrow">
              {isContact
                ? "Reach us directly"
                : page === "about"
                  ? "Why clients choose JSP"
                  : "Our expertise"}
            </span>
            <h2>
              {isContact
                ? "Choose the way you want to connect."
                : page === "about"
                  ? "Built on clarity and care."
                  : "Practical support at every stage."}
            </h2>
          </div>
          <div className="editorial-page-list">
            {content.items.map(([title, detail], index) =>
              isContact ? (
                <ContactItem key={title} title={title} detail={detail} />
              ) : (
                <article key={title} data-reveal>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                  <span aria-hidden="true">
                    <ArrowUpRightIcon />
                  </span>
                </article>
              ),
            )}
          </div>
        </section>

        {page === "services" && (
          <section
            className="editorial-management-band"
            id="property-management"
          >
            <div className="shell" data-reveal>
              <span className="eyebrow">For property owners</span>
              <h2>
                Your property.
                <br />
                <em>Properly managed.</em>
              </h2>
              <p>
                From property oversight and apartment management to
                furnished-property support and maintenance coordination, JSP
                helps owners protect the everyday value of their property.
              </p>
              <Link href="/contact">
                Discuss your property with JSP{" "}
                <span>
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </div>
          </section>
        )}

        <section className="editorial-page-closing">
          <div className="shell" data-reveal>
            <span>Ready when you are.</span>
            <h2>
              {isContact
                ? "Let’s start with what you need."
                : "Find your next property move with JSP."}
            </h2>
            <Link href={isContact ? "tel:+2349064668429" : "/properties"}>
              {isContact ? "Call JSP" : "Explore properties"} <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
