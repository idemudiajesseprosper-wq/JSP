import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    propertyType: {
      type: String,
      enum: ["house", "apartment", "flat", "land", "commercial"],
    },
    listingType: { type: String, enum: ["sale", "rent"] },
    price: Number,
    pricePeriod: String,
    location: String,
    address: String,
    bedrooms: Number,
    bathrooms: Number,
    area: String,
    images: [String],
    videos: [String],
    features: [String],
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export default mongoose.models.Property ||
  mongoose.model("Property", propertySchema);
