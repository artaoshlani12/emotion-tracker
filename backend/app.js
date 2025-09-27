import express from "express";
import cors from "cors";
import emotionRoutes from "./routes/emotionRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/emotions", emotionRoutes);

export default app;
