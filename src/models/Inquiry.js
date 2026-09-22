import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    propertyId: { type: String, required: true, index: true },
    propertyTitle: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
      index: true,
    },
    fingerprint: { type: String, required: true, index: true },
  },
  { timestamps: true },
);
inquirySchema.index({ fingerprint: 1, createdAt: -1 });
export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", inquirySchema);
