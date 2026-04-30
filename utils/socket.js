import { Server } from "socket.io";
import { updateWalletAfterBet } from "../controllers/walletController.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ======================
    // JOIN ROOM (roulette / slot)
    // ======================
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Joined room: ${room}`);
    });

    // ======================
    // LEAVE ROOM
    // ======================
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });

    // ======================
    // PLACE BET (ROOM BASED)
    // ======================
    socket.on("placeBet", async (data) => {
      try {
        const { room, userId, amount, game } = data;

        // emit live bet to same room only
        io.to(room).emit("newBet", {
          userId,
          amount,
          game,
          room
        });

        // wallet deduction (backend logic)
        await updateWalletAfterBet(userId, amount, "bet");

      } catch (err) {
        console.log("Bet error:", err.message);
      }
    });

    // ======================
    // GAME RESULT PER ROOM
    // ======================
    socket.on("gameResult", async (data) => {
      try {
        const { room, result, winners } = data;

        // broadcast result only to that room
        io.to(room).emit("result", {
          room,
          result,
          winners
        });

        // update wallet for winners
        if (winners && winners.length > 0) {
          for (const w of winners) {
            await updateWalletAfterBet(w.userId, w.winAmount, "win");
          }
        }

      } catch (err) {
        console.log("Result error:", err.message);
      }
    });

    // ======================
    // DISCONNECT
    // ======================
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
