import { Server, Socket } from "socket.io";
import { generateUniqueCode } from "../../../services/generateGameService";

/**
 * hostSocketConnection(io)
 *
 * This function handles the socket connection for hosts.
 *
 * @param {Server} io - The socket.io server instance.
 *
 * @event connection - Listens for a new socket connection.
 * @event createRoom - Listens for a host's request to create a new room.
 * @event roomCreated - Emits an event to the host to inform them that a room has been created.
 *
 * Upon connection, a host can create a room and join it.
 * RoomIds are generated using 'generateUniqueCode'
 * After joining the room, a 'roomCreated' event is emitted to the host.
 */
const hostSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("createRoom", () => {
      const roomId = generateUniqueCode();
      socket.join(roomId);
      socket.emit("roomCreated", { roomId, stage: "lobby", role: "host" });
      console.log(roomId);
    });
  });
};

export default hostSocketConnection;
