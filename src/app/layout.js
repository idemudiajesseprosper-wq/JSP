import { Manrope } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import "./globals.css";
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata = {
  title: "J.S.P. Real Estate & Property Ventures | Properties, Rentals & Land",
  description:
    "Discover property rentals, property sales, land and property management services from J.S.P. Real Estate & Property Ventures in Delta State, Nigeria.",
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
