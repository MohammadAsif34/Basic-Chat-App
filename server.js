import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import Routes from "./routes/index.js";
import { setupSocket } from "./config/socket.js";

const app = express();
const server = http.createServer(app);

const io = setupSocket(server);

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

connectDB();
// routes();
app.use("/api4/chat/v1/", Routes);

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
