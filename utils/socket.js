import { Server } from "socket.io";
import Wallet from "../models/Wallet.js";

export const initSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("placeBet", async ({ room, userId, amount }) => {
      const wallet = await Wallet.findOne({ userId });

      if (!wallet || wallet.balance < amount) {
        return socket.emit("error", "Insufficient balance");
      }

      wallet.balance -= amount;
      await wallet.save();

      io.to(room).emit("newBet", { userId, amount });
    });

    socket.on("gameResult", async ({ room, winners }) => {
      for (const w of winners) {
        const wallet = await Wallet.findOne({ userId: w.userId });
        if (wallet) {
          wallet.balance += w.win;
          await wallet.save();
        }
      }

      io.to(room).emit("result", { room, winners });
    });

  });
};
