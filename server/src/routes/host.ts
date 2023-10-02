import { Server, Socket } from "socket.io";
import { generateUniqueCode } from "../../services/generateGameService";

const hostSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("createRoom", () => {
      const roomId = generateUniqueCode();
      socket.join(roomId);
      socket.emit("roomCreated", roomId);
    });
  });
};

export default hostSocketConnection;
