
import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // place bet
    socket.on("placeBet", (data) => {
      io.emit("newBet", data);
    });

    // game result
    socket.on("gameResult", (data) => {
      io.emit("result", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
