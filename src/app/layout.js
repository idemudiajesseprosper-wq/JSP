import { Manrope } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jsprealtyng.com/";
const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "J.S.P. Real Estate & Property Ventures | Properties, Rentals & Land",
  description:
    "Discover property rentals, property sales, land and property management services from J.S.P. Real Estate & Property Ventures in Benin City, Nigeria.",
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "J.S.P. Real Estate & Property Ventures",
    title: "J.S.P. Real Estate & Property Ventures",
    description:
      "Browse properties, rentals, land and professional property management services in Benin City, Nigeria.",
    images: [
      {
        url: "/images/jsp-hero-sunset-landscape.png",
        width: 1672,
        height: 941,
        alt: "A contemporary JSP property at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J.S.P. Real Estate & Property Ventures",
    description:
      "Browse properties, rentals, land and professional property management services in Benin City, Nigeria.",
    images: ["/images/jsp-hero-sunset-landscape.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires script text and serializeJsonLd escapes tag delimiters.
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "J.S.P. Real Estate & Property Ventures",
              url: siteUrl,
              logo: `${siteUrl}/images/jsp-logo-transparent.png`,
              image: `${siteUrl}/images/jsp-hero-sunset-landscape.png`,
              telephone: "+2349064668429",
              email: "jsprealestateandpropertymanage@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Along Ogheghe Road, off Sapele Road Bypass",
                addressLocality: "Benin City",
                addressRegion: "Edo",
                addressCountry: "NG",
              },
              areaServed: ["Benin City", "Edo", "Delta", "Nigeria"],
              sameAs: ["https://wa.me/2348161268386"],
            }),
          }}
        />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
