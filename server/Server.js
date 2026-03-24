import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import menuRoutes from "./routes/menuRoutes.js";
import subMenuRoutes from "./routes/SubMenuRoute.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/menus", menuRoutes);
app.use("/api/submenus", subMenuRoutes);
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

// ✅ MongoDB connect
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`mongoDB URI: ${mongoURI}`);
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ PORT logic
const PORT =
  process.env.NODE_ENV === "production"
    ? process.env.PORT
    : 5000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`
  );
});