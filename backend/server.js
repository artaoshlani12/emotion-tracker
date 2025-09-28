import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Kontrollo që MONGO_URI ekziston
if (!MONGO_URI) {
  console.error("❌ MONGO_URI nuk është konfiguruar në .env");
  process.exit(1);
}

const startServer = async () => {
  try {
    console.log("🌐 Po lidhemi me MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB u lidh me sukses");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Serveri po dëgjon në portën ${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`⚠️ Marr signalin ${signal}, duke mbyllur serverin...`);
      server.close(() => {
        console.log("🛑 Serveri u mbyll");
        mongoose.connection.close(false, () => {
          console.log("✅ Lidhja me MongoDB u mbyll");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

  } catch (err) {
    console.error("❌ Gabim gjatë lidhjes me MongoDB:", err.message);
    process.exit(1);
  }
};

// Capturo gabimet globale të async dhe synchronous
process.on("unhandledRejection", (err) => {
  console.error("❌ Gabim i pakapshëm (unhandledRejection):", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Gabim i pakapshëm (uncaughtException):", err);
  process.exit(1);
});

startServer();
