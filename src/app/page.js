import Image from "next/image";
import Link from "next/link";
import FeaturedPropertyCarousel from "@/components/FeaturedPropertyCarousel";
import { ArrowUpRightIcon } from "@/components/ArrowIcons";

const services = [
  ["01", "Renting", "Houses, apartments and flats selected around your needs."],
  [
    "02",
    "Property Sales",
    "Buy and sell residential and commercial properties.",
  ],
  [
    "03",
    "Land Sales",
    "Residential and commercial land in promising locations.",
  ],
  [
    "04",
    "Pre-owned Home Essentials",
    "Quality pre-owned furniture and home appliances for everyday living.",
  ],
];
const Arrow = () => <span aria-hidden="true">→</span>;
function Logo({ light = false }) {
  return (
    <Link href="/" className={`logo ${light ? "light" : ""}`}>
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
function Title({ tag, title, text }) {
  return (
    <div className="title">
      <span className="eyebrow">{tag}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
function Header() {
  return (
    <header>
      <div className="shell nav">
        <Logo />
        <nav className="desktop-nav hero-desktop-nav">
          <a className="active" href="/">
            Home
          </a>
          <a href="/properties">Properties</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <a
          className="pill"
          href="https://wa.me/2348161268386?text=Hello%20JSP%20Real%20Estate%2C%20I%20would%20like%20to%20make%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
        <input className="menu-toggle" id="menu-toggle" type="checkbox" />
        <label
          className="menu-open"
          htmlFor="menu-toggle"
          aria-label="Open navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </label>
        <label
          className="menu-backdrop"
          htmlFor="menu-toggle"
          aria-label="Close navigation"
        ></label>
        <aside className="mobile-drawer" aria-label="Mobile navigation">
          <div className="drawer-head">
            <Logo />
            <label
              htmlFor="menu-toggle"
              className="menu-close"
              aria-label="Close navigation"
            >
              ×
            </label>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/properties">Properties</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <a
            className="button"
            href="https://wa.me/2348161268386?text=Hello%20JSP%20Real%20Estate%2C%20I%20would%20like%20to%20make%20an%20enquiry."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </aside>
      </div>
    </header>
  );
}
function Hero() {
  return (
    <section className="hero editorial-hero" id="home">
      <Image
        className="hero-full-image hero-portrait-image"
        src="/images/jsp-hero-sunset-upscaled.png"
        alt="Contemporary luxury home at sunset"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 740px) 100vw, 1px"
      />
      <Image
        className="hero-full-image hero-landscape-image"
        src="/images/jsp-hero-sunset-landscape.png"
        alt="Contemporary luxury home and lawn at sunset"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 741px) 100vw, 1px"
      />
      <div className="property-wash" />
      <div className="hero-word" aria-hidden="true">
        J S P
      </div>
      <Image
        className="hero-foreground hero-foreground-portrait"
        src="/images/jsp-hero-sunset-upscaled.png"
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        sizes="(max-width: 740px) 100vw, 1px"
      />
      <Image
        className="hero-foreground hero-foreground-landscape"
        src="/images/jsp-hero-sunset-landscape.png"
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        sizes="(min-width: 741px) 100vw, 1px"
      />
      <div className="hero-notes">
        <p>More than property, a place to call home.</p>
        <p>Made to fit your life, today and tomorrow.</p>
      </div>
      <div className="hero-mobile-meta" aria-hidden="true">
        <span>JSP / PROPERTY</span>
        <span>BENIN CITY · NIGERIA</span>
      </div>
      <div className="editorial-statement">
        <h1>
          <span className="hero-desktop-copy">
            A place
            <br />
            that truly
            <br />
            feels like
            <br />
            home.
          </span>
          <span className="hero-mobile-copy">
            A place that
            <br />
            truly feels
            <br />
            like home.
          </span>
        </h1>
        <a className="hero-explore" href="/properties">
          Explore Properties <Arrow />
        </a>
      </div>
      <span className="home-reflection" aria-hidden="true">
        home
      </span>
    </section>
  );
}
function AboutJspIntro() {
  return (
    <section className="about-jsp-intro" aria-labelledby="about-jsp-heading">
      <div className="shell about-jsp-layout">
        <div className="about-jsp-lead">
          <span className="eyebrow">About JSP</span>
          <h2 id="about-jsp-heading">
            Property is personal.
            <br />
            <em>So are we.</em>
          </h2>
        </div>
        <div className="about-jsp-detail">
          <span className="about-jsp-mark" aria-hidden="true">
            JSP / 01
          </span>
          <p>
            J.S.P. Real Estate &amp; Property Ventures helps people find the
            right place and make confident property decisions. From renting and
            sales to land and property management, we bring every step together
            with clear guidance and thoughtful service.
          </p>
          <div className="about-jsp-bottom">
            <span>Find · Own · Manage</span>
            <Link href="/about" className="about-jsp-link">
              Get to know JSP <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section className="section" id="services">
      <div className="shell services">
        <Title
          tag="Our services"
          title="What We Offer"
          text="A complete range of real estate services to help you find, own and manage the right property."
        />
        <div className="service-showcase">
          {services.map(([n, t, d], index) => (
            <article
              className={`service-panel service-panel-${index + 1}`}
              key={t}
            >
              {index === 0 && (
                <Image
                  className="service-panel-image"
                  src="/images/renting-service-house.jpeg"
                  alt="Residential house available through JSP renting services"
                  fill
                  sizes="(max-width: 600px) 100vw, 42vw"
                />
              )}
              <span className="service-number">{n}</span>
              <div className="service-copy">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <span className="service-direction" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function PropertyManagement() {
  return (
    <section
      className="management-section"
      aria-labelledby="management-heading"
    >
      <div className="shell management-layout">
        <div className="management-intro">
          <span className="eyebrow">For property owners</span>
          <h2 id="management-heading">
            Your property.
            <br />
            <em>Properly managed.</em>
          </h2>
          <p>
            Property ownership should feel considered, not complicated. JSP
            supports owners with practical oversight and attentive management
            tailored to their property.
          </p>
          <Link
            className="management-link"
            href="/services#property-management"
          >
            Explore Property Management <Arrow />
          </Link>
        </div>
        <div className="management-details">
          <div className="management-visual">
            <Image
              src="/images/jsp-preowned-furniture.jpeg"
              alt="Green upholstered sofa illustrating pre-owned home furnishings"
              fill
              sizes="(max-width: 780px) 100vw, 48vw"
            />
            <span>Illustrative image · Pre-owned home furnishings</span>
          </div>
          <span className="management-index">The owner experience / JSP</span>
          <ul>
            <li>
              <span>01</span> Property oversight
            </li>
            <li>
              <span>02</span> Apartment management
            </li>
            <li>
              <span>03</span> Furnished-property support
            </li>
            <li>
              <span>04</span> Maintenance coordination
            </li>
          </ul>
          <p>Talk to our team about the services your property needs.</p>
        </div>
      </div>
    </section>
  );
}
function Types() {
  return <FeaturedPropertyCarousel />;
}
function About() {
  return (
    <section className="about" id="about">
      <div className="about-photo">
        <Image
          src="/images/jsp-why-choose-interior.jpeg"
          alt="Warm, thoughtfully furnished living space with a stone fireplace"
          fill
          sizes="(max-width: 600px) calc(100vw - 40px), 50vw"
        />
      </div>
      <div className="about-copy">
        <Title
          tag="Why choose JSP"
          title={
            <>
              Your Vision, <em>Our Priority</em>
            </>
          }
          text="J.S.P. helps clients find, rent, buy, sell and manage property through a clear, professional process."
        />
        <div className="values">
          <span>✓ Trusted Service</span>
          <span>✓ Transparent Process</span>
          <span>✓ Quality Properties</span>
          <span>✓ Client-Focused Support</span>
        </div>
        <a className="link" href="/contact">
          Learn about JSP <Arrow />
        </a>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell contact-grid">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2>
            Let&apos;s Find Your
            <br />
            Perfect Property
          </h2>
          <p>
            Tell us what you&apos;re looking for and our team will help you find
            the right option.
          </p>
          <div className="actions">
            <a
              className="button white"
              href="mailto:jsprealestateandpropertymanage@gmail.com"
            >
              Email JSP
            </a>
            <a className="outline" href="tel:+2349064668429">
              Call Us
            </a>
          </div>
        </div>
        <address>
          <p>
            <small>WhatsApp</small>+234 816 126 8386
          </p>
          <p>
            <small>Phone</small>+234 906 466 8429
          </p>
          <p>
            <small>Email</small>jsprealestateandpropertymanage@gmail.com
          </p>
          <p>
            <small>Office</small>Along Ogheghe Road, off Sapele Road, Bypass,
            Benin City
          </p>
        </address>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="shell footer">
        <div>
          <Logo light />
          <p>
            Premium property discovery and professional management across Edo,
            Delta and other cities in Nigeria.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
        </div>
        <div>
          <h3>Property Types</h3>
          <a href="#houses">Houses</a>
          <a href="#apartments">Apartments</a>
          <a href="#flats">Flats</a>
          <a href="#lands">Lands</a>
        </div>
        <div>
          <h3>Connect</h3>
          <span>WhatsApp: +234 816 126 8386</span>
          <a href="tel:+2349064668429">Call: +234 906 466 8429</a>
          <a href="mailto:jsprealestateandpropertymanage@gmail.com">
            jsprealestateandpropertymanage@gmail.com
          </a>
        </div>
      </div>
      <div className="shell copyright">
        © 2026 J.S.P. Real Estate & Property Ventures.{" "}
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
export default function Home() {
  return (
    <>
      <div className="home-hero-wrap">
        <Header />
        <Hero />
      </div>
      <main>
        <AboutJspIntro />
        <Services />
        <PropertyManagement />
        <Types />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
