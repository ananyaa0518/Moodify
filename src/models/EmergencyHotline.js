import mongoose from "mongoose";

const EmergencyHotlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  country: String,
  description: String,
  availableHours: String,
  website: String,
  tags: [String], // e.g., ['suicide', 'crisis', 'trauma']
  isVerified: { type: Boolean, default: false },
  lastVerified: Date
});

export default mongoose.models.EmergencyHotline || 
  mongoose.model("EmergencyHotline", EmergencyHotlineSchema);
