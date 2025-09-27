import express from "express";
import Emotion from "../models/Emotion.js";

const router = express.Router();

// Shto emocion
router.post("/", async (req, res) => {
  try {
    const emotion = new Emotion(req.body);
    await emotion.save();
    res.status(201).json(emotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Merr të gjitha emocionet
router.get("/", async (req, res) => {
  try {
    const emotions = await Emotion.find().sort({ date: -1 });
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
