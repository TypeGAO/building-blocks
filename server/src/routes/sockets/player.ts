import { Server, Socket } from "socket.io";
import { Player, GameActivity } from '../../types';
import { addPlayer } from "../../../services/generateGameService";
import { getGameActivity, setGameActivity } from "../../../services/gameManagerService";

const query = require('../../db/index.ts');

/**
 * playerSocketConnection(io)
 *
 * This function handles the socket connection for players.
 *
 * @param {Server} io - The socket.io server instance.
 *
 * @event connection - Listens for a new socket connection.
 * @event joinRoom - Listens for a player's request to join a room by room id.
 * @event roomJoined - Emits an event to the player to indicate successful room join.
 * @event playerCount - Emits an event to all players in a room to update the current player count.
 * @event roomNotFound - Emits an event to the player if the requested room id does not exist.
 * @event disconnect - Listens for a player disconnecting and updates player counts accordingly.
 *
 * Upon connection, a player can join an existing room by specifying the room ID using 'joinRoom'.
 * If the room exists, the player is added to the room, and relevant events are emitted.
 * If the room doesn't exist, a 'roomNotFound' event is emitted to the player.
 *
 * When a player disconnects, their information is removed, and the player count in the room is updated.
 */
const playerSocketConnection = (io: Server) => {
  const connectedPlayers = new Map();

  io.on("connection", async (socket: Socket) => {
      // TODO: reject taken nicknames
    socket.on("joinRoom", async (roomId: string, nickname: string) => {
      const room = io.sockets.adapter.rooms.get(roomId);

      if (room) {
        socket.join(roomId);

        const new_player = addPlayer(roomId, nickname);
        connectedPlayers.set(socket.id, new_player);

        const game_activity = await getGameActivity(roomId);

        game_activity.players.push(new_player);

        await setGameActivity(game_activity, roomId);

        game_activity.role = "host";
        socket.broadcast.to(game_activity.masterSocket).emit("updateGameActivity", game_activity);

        game_activity.role = "player";
        socket.emit("roomJoined", game_activity);
      } else {
        socket.emit("roomNotFound", `Room ${roomId} not found`);
      }
    });

    socket.on("disconnect", async () => {
      if (connectedPlayers.has(socket.id)) {
        const { roomId, nickname } = connectedPlayers.get(socket.id);

        connectedPlayers.delete(socket.id);

        if (roomId) {
          const room = io.sockets.adapter.rooms.get(roomId);
          if (room) {
            const game_activity = await getGameActivity(roomId);

            game_activity.players  = game_activity.players.filter((p: Player) => p.nickname !== nickname);

            await setGameActivity(game_activity, roomId);

            game_activity.role = "host";
            socket.broadcast.to(game_activity.masterSocket).emit("updateGameActivity", game_activity);
          }
        }
      }
    });
  });
};

export default playerSocketConnection;
