import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./src/auth/auth.routes.js";
import userRoutes from "./src/user/user.routes.js";
import messageRoutes from "./src/message/message.routes.js";
import { socketInitilize } from "./src/config/socket.config.js";
import { corsOptions } from "./src/config/cors.config.js";
import connectDB from "./src/config/db.config.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: corsOptions });

socketInitilize(io); // Socket Initilization
// app.use(cors(corsOptions)); // Cors Integration
app.use(express.json()); // Json Integration

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Database Initilization
connectDB();

// mongoose
//   .connect("mongodb+srv://asif_db:asif_db@asifdb.93hrm.mongodb.net/")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  console.log("SYSTEM_CHECK");
  res.status(200).json({
    code: 200,
    success: true,
    message: "Welcome to ChatApp backend Server",
  });
});

// -----------------------------------
// ROUTES
// -----------------------------------
app.use("/api/auth", authRoutes); // authentication routes
app.use("/api/user", userRoutes); // users route
app.use("/api/user", messageRoutes); // messages routes

// -----------------------------------
// SOCKET CONNECTION
// -----------------------------------

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// -----------------------------------
// SERVER START
// -----------------------------------
server.listen(process.env.PORT || 8080, (err) => {
  if (err) console.error(`Server starting failed!! :: ${err.message}`);

  console.log(`Server running on ${process.env.PORT || 8080}`);
});
