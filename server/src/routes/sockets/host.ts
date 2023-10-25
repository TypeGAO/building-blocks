import { Server, Socket } from "socket.io";
import { generateUniqueCode, newGameActivity } from "../../../services/generateGameService";
import { getGameActivity, setGameActivity, insertGameActivity, endGame } from "../../../services/gameManagerService";
import { Player } from '../../types';

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

    socket.on("pauseGame", async (roomId: string) => {

        // Get game activity from database, set it as paused
        const game_activity = await getGameActivity(roomId);
        game_activity.stage = "paused";

        // Update game activity
        await setGameActivity(game_activity, roomId);

        // Send game activity to host and all players
        game_activity.role = "host";
        socket.emit("updateGameActivity", game_activity);

        game_activity.role = "player";
        socket.broadcast.to(roomId).emit("updateGameActivity", game_activity);
    });

    socket.on("kickPlayer", async (nickname: string) => {
            const roomId = connectedHosts.get(socket.id);
            const game_activity = await getGameActivity(roomId);

            // Remove player from list
            game_activity.players  = game_activity.players.filter((p: Player) => p.nickname !== nickname);

            await setGameActivity(game_activity, roomId);

            game_activity.role = "host";
            game_activity.stage = "lobby";
            socket.emit('updateGameActivity', game_activity);

            // Send to all players
            socket.broadcast.to(roomId).emit('kickPlayer', nickname);
            
            game_activity.role = "player";
            game_activity.stage = "lobby";
            socket.broadcast.to(roomId).emit('updateGameActivity', game_activity);
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
