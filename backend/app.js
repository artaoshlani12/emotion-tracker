import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Schema dhe Model për emocionet
const emotionSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  note: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Emotion = mongoose.model("Emotion", emotionSchema);

// Routes

// Marr të gjitha emocionet
app.get("/emotions", async (req, res) => {
  try {
    const emotions = await Emotion.find().sort({ createdAt: -1 });
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shto emocion të ri
app.post("/emotions", async (req, res) => {
  try {
    const { mood, note } = req.body;
    if (!mood) return res.status(400).json({ error: "Mood kërkohet" });

    const newEmotion = new Emotion({ mood, note });
    const savedEmotion = await newEmotion.save();
    res.json(savedEmotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
