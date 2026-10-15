import { getPublishedProperties } from "@/lib/properties";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsp-rho.vercel.app";

export default async function sitemap() {
  const staticPages = ["", "/properties", "/services", "/about", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/properties" ? "daily" : "monthly",
      priority: path === "" ? 1 : path === "/properties" ? 0.9 : 0.7,
    }),
  );
  const properties = await getPublishedProperties();
  return [
    ...staticPages,
    ...properties.map((property) => ({
      url: `${siteUrl}/properties/${property.slug}`,
      lastModified: property.updatedAt || property.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
