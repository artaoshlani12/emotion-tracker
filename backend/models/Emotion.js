import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema({
  mood: { type: String, required: true }, // happy, sad, stressed, calm...
  note: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Emotion", emotionSchema);
