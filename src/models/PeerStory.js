import mongoose from "mongoose";

const PeerStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  tags: [String], // e.g., ['anxiety', 'recovery', 'therapy']
  isAnonymous: { type: Boolean, default: true },
  helpfulCount: { type: Number, default: 0 },
  sentimentScore: Number,
  createdAt: { type: Date, default: Date.now },
  isModerated: { type: Boolean, default: false }
});

export default mongoose.models.PeerStory || 
  mongoose.model("PeerStory", PeerStorySchema);
