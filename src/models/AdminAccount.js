import mongoose from "mongoose";

const adminAccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    passwordChangedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.AdminAccount ||
  mongoose.model("AdminAccount", adminAccountSchema);
