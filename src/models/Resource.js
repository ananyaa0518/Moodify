import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  description: String,
  type: { 
    type: String, 
    enum: ['article', 'video', 'podcast', 'tool'],
    required: true 
  },
  tags: [String], // e.g., ['anxiety', 'depression', 'stress']
  moodMatch: {
    type: String,
    enum: ['Positive', 'Neutral', 'Negative'],
    required: true
  },
  source: String, // e.g., 'Psychology Today', 'YouTube'
  upvotes: { type: Number, default: 0 },
  scrapedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.Resource || 
  mongoose.model("Resource", ResourceSchema);
