import { Server, Socket } from "socket.io";

const playerSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("joinRoom", (roomId: string) => {
      const room = io.sockets.adapter.rooms.get(roomId);

      if (room) {
        socket.join(roomId);
        socket.emit("roomJoined", roomId);

        const playerCount = io.sockets.adapter.rooms.get(roomId)?.size;
        socket.to(roomId).emit("gameActivity", { playerCount: playerCount });
      } else {
        socket.emit("roomNotFound", `Room ${roomId} not found`);
      }
    });

    socket.on("disconnect", () => {});
  });
};

export default playerSocketConnection;
