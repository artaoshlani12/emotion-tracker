import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// lidhja me MongoDB Compass
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB u lidh me sukses");
  app.listen(PORT, () => console.log(`🚀 Serveri po dëgjon në portën ${PORT}`));
})
.catch(err => console.error("❌ Gabim lidhjeje MongoDB:", err));
