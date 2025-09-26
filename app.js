import connectDB from "./Config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { PORT, NODE_ENV } from "./Config/env.js";
import { errorMiddleware } from "./Middlewares/errorMiddleware.js";
import authRoutes from "./Routes/authRoutes.js";

// Connect database
connectDB();

const app = express();

// ✅ Middlewares first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

// ✅ Routes next
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

// ✅ Error middleware last
app.use(errorMiddleware);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
