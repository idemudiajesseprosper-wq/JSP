import { Manrope } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jsp-rho.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "J.S.P. Real Estate & Property Ventures | Properties, Rentals & Land",
  description:
    "Discover property rentals, property sales, land and property management services from J.S.P. Real Estate & Property Ventures in Benin City, Nigeria.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
