import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

import { initSocket } from "./utils/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/game", gameRoutes);

// health check
app.get("/", (req, res) => {
  res.send("MegaRbajee Backend Running 🚀");
});

// db connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// socket
initSocket(server);

// server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
