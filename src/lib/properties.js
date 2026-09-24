import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function getPublishedProperties(filters = {}) {
  if (!process.env.MONGODB_URI) return [];

  try {
    await connectDB();
    const query = { published: true };
    if (filters.type) query.propertyType = filters.type;
    if (filters.listing) query.listingType = filters.listing;
    if (filters.location)
      query.location = { $regex: filters.location, $options: "i" };
    if (filters.search)
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { location: { $regex: filters.search, $options: "i" } },
      ];

    return JSON.parse(
      JSON.stringify(
        await Property.find(query).sort({ featured: -1, createdAt: -1 }).lean(),
      ),
    );
  } catch (error) {
    console.warn(
      "Published properties are temporarily unavailable:",
      error.message,
    );
    return [];
  }
}

export async function getProperty(slug) {
  if (!process.env.MONGODB_URI) return null;

  try {
    await connectDB();
    return JSON.parse(
      JSON.stringify(await Property.findOne({ slug, published: true }).lean()),
    );
  } catch (error) {
    console.warn(
      "Property details are temporarily unavailable:",
      error.message,
    );
    return null;
  }
}

export function priceLabel(property) {
  if (!property.price) return "Price on request";
  return `₦${Number(property.price).toLocaleString("en-NG")}${property.pricePeriod ? ` / ${property.pricePeriod}` : ""}`;
}
