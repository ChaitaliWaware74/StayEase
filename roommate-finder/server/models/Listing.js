import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  rent: Number,
  roomType: String,
  propertyType: String,
  genderPreference: String,
  requiredCount: Number,
  address: String,
  description: String,
  images: [String],
  contactPhone: String,
  parking: { type: Boolean, default: false },
  electricityIncluded: { type: Boolean, default: false },
  water24: { type: Boolean, default: false },
  contactEmail: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);