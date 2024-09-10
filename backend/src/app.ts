import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import addressRoutes from "./routes/addressRoutes";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", addressRoutes);

export default app;
