import { Server, Socket } from "socket.io";
import { generateUniqueCode, newGameActivity } from "../../../services/generateGameService";
import { getGameActivity, setGameActivity, insertGameActivity, endGame } from "../../../services/gameManagerService";

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
  const connectedHosts = new Map();

  io.on("connection", (socket: Socket) => {
    socket.on("createRoom", async () => {
      // Generate unique code
      const roomId = generateUniqueCode();
      socket.join(roomId);

      // Save roomId and host
      connectedHosts.set(socket.id, roomId);

      const game_activity = newGameActivity(socket.id, roomId);

      // Add room in database
      await insertGameActivity(game_activity, roomId);

      // Send to host
      game_activity.role = "host";
      socket.emit("roomCreated", game_activity);
    });

    socket.on("startGame", async (roomId: string) => {

        // Get game activity from database, set it as started
        const game_activity = await getGameActivity(roomId);
        game_activity.stage = "started";

        // Update game activity
        await setGameActivity(game_activity, roomId);

        // Send game activity to host and all players
        game_activity.role = "host";
        socket.emit("updateGameActivity", game_activity);

        game_activity.role = "player";
        socket.broadcast.to(roomId).emit("updateGameActivity", game_activity);
    });

    socket.on("disconnect", async () => {
        if (connectedHosts.has(socket.id)) {
            const roomId = connectedHosts.get(socket.id);

            // End game
            const game_activity = await getGameActivity(roomId);
            game_activity.stage = "ended";
            await setGameActivity(game_activity, roomId);
            await endGame(roomId);

            // Send to all players
            socket.broadcast.to(roomId).emit('hostLeft', game_activity);
        }
    });
  });
};

export default hostSocketConnection;
