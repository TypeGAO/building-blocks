import { Server, Socket } from "socket.io";
import { generateUniqueCode, newGameActivity } from "../../../services/generateGameService";
import { getGameActivity, setGameActivity, insertGameActivity } from "../../../services/gameManagerService";

const query = require('../../db/index.ts');
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
    socket.on("createRoom", async () => {
      const roomId = generateUniqueCode();
      socket.join(roomId);

      const game_activity = newGameActivity(socket.id, roomId);

      // Add room in database
      await insertGameActivity(game_activity, roomId);

      game_activity.role = "host";
      socket.emit("roomCreated", game_activity);
    });

    socket.on("startGame", async (roomId: string) => {

        const game_activity = await getGameActivity(roomId);
        game_activity.stage = "started";

        await setGameActivity(game_activity, roomId);

        game_activity.role = "host";
        socket.emit("updateGameActivity", game_activity);

        game_activity.role = "player";
        socket.broadcast.to(roomId).emit("updateGameActivity", game_activity);
    });
  });
};

export default hostSocketConnection;
