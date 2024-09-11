import "dotenv-flow/config";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import createServer from "./utils/createServer";

dotenv.config();
connectDB();

export const app = createServer();
