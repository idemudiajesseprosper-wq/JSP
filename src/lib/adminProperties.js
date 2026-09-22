const types = ["house", "apartment", "flat", "land", "commercial"];
const listings = ["sale", "rent"];
const statuses = ["available", "sold", "rented"];

function cleanText(value, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function mediaUrls(value, kind) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((url) => {
      if (typeof url !== "string") return false;
      try {
        const parsed = new URL(url);
        return (
          parsed.protocol === "https:" &&
          parsed.hostname === "res.cloudinary.com" &&
          parsed.pathname.includes(`/${kind}/upload/`)
        );
      } catch {
        return false;
      }
    })
    .slice(0, 20);
}

export function validatePropertyInput(input) {
  const title = cleanText(input.title, 120);
  const location = cleanText(input.location, 120);
  const description = cleanText(input.description, 5000);
  const price = Number(input.price);
  const bedrooms = Number(input.bedrooms || 0);
  const bathrooms = Number(input.bathrooms || 0);
  const published = input.published === true;
  const images = mediaUrls(input.images, "image");
  const videos = mediaUrls(input.videos, "video");
  if (title.length < 5)
    return { error: "Give this property a title of at least 5 characters." };
  if (!location) return { error: "Add the property's location." };
  if (!types.includes(input.propertyType))
    return { error: "Choose a property type." };
  if (!listings.includes(input.listingType))
    return { error: "Choose For Sale or For Rent." };
  if (!statuses.includes(input.status || "available"))
    return { error: "Choose a valid availability status." };
  if (!Number.isFinite(price) || price < 0)
    return { error: "Enter a valid price (0 for price on request)." };
  if (
    ![bedrooms, bathrooms].every(
      (number) => Number.isInteger(number) && number >= 0 && number <= 100,
    )
  )
    return { error: "Bedrooms and bathrooms must be whole numbers." };
  if (published && !images.length)
    return { error: "Add at least one photo before publishing." };
  return {
    property: {
      title,
      description,
      propertyType: input.propertyType,
      listingType: input.listingType,
      price,
      pricePeriod: cleanText(input.pricePeriod, 40),
      location,
      address: cleanText(input.address, 240),
      bedrooms,
      bathrooms,
      area: cleanText(input.area, 60),
      images,
      videos,
      features: (Array.isArray(input.features)
        ? input.features
        : String(input.features || "").split(/[,\n]/)
      )
        .map((feature) => cleanText(feature, 80))
        .filter(Boolean)
        .slice(0, 30),
      status: input.status || "available",
      featured: input.featured === true,
      published,
    },
  };
}
