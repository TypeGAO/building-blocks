import { Server, Socket } from "socket.io";
import { Player, GameActivity } from '../../types';
import { addPlayer } from "../../../services/generateGameService";
import { getGameActivity, setGameActivity, getExpectedOutput, runCode } from "../../../services/gameManagerService";


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
    socket.on("joinRoom", async (roomId: string, nickname: string) => {
      // Get the socket.io room that is used for the roomId
      const room = io.sockets.adapter.rooms.get(roomId);

      if (room) {
        // Get game activity, check game not started
        const game_activity = await getGameActivity(roomId);
        // Game must be in lobby stage
        if (game_activity.stage == "lobby") {
            // Join the socket.io room
            socket.join(roomId);

            // Search for duplicate nicknames in the same roomId
            const values = Array.from(connectedPlayers.values());
            if (values.find((player: Player) => player.roomId === roomId 
                                             && player.nickname === nickname)) {
                // Send to client to display error
                socket.emit("duplicateName");
                return;
            }

            // Add player to Map of all players
            const new_player = addPlayer(roomId, nickname);
            connectedPlayers.set(socket.id, new_player);

            // Add a player, and save it
            game_activity.players.push(new_player);
            await setGameActivity(game_activity, roomId);

            // Send the new game activity to the host and all clients
            game_activity.role = "host";
            socket.broadcast.to(game_activity.masterSocket).emit("updateGameActivity", game_activity);

            game_activity.role = "player";
            game_activity.nickname = nickname;
            socket.emit("roomJoined", game_activity);
        } else {
            socket.emit("cannotJoinGame");
        }

      } else {
        // Send error to client
        socket.emit("roomNotFound", `Room ${roomId} not found`);
      }
    });

    socket.on("runCode",  async (roomId: string, code: string, nickname: string, questionId: number) => {
        const game_activity = await getGameActivity(roomId);

        // Run code, get test case expected output, compare it to output
        const output = await runCode(code);
        const expected_output = await getExpectedOutput(questionId);
        const code_correct = output === expected_output;

        // Get submissions
        const submissions = game_activity.players.find((player: Player) => player.roomId === roomId && player.nickname === nickname).submissions;

        if (code_correct) {
            game_activity.players.find((player: Player) => player.roomId === roomId && player.nickname === nickname).currentQuestion += 1;

            // Score based on submissions and random value
            const rand = Math.floor(Math.random() * 5) + 1;
            game_activity.players.find((player: Player) => player.roomId === roomId && player.nickname === nickname).score += (100 - submissions*10 + rand);

            // Reset submisisons
            game_activity.players.find((player: Player) => player.roomId === roomId && player.nickname === nickname).submissions = 0;

            socket.emit("correct", output);
        } else {
            // Increase submissions (max 5 for score penalty)
            if (submissions <= 5) {
                game_activity.players.find((player: Player) => player.roomId === roomId && player.nickname === nickname).submissions += 1;
            }
            socket.emit("wrong", output);
        }

        // Save and send game activity
        await setGameActivity(game_activity, roomId);

        game_activity.role = "host";
        socket.broadcast.to(game_activity.masterSocket).emit("updateGameActivity", game_activity);

        game_activity.role = "player";
        game_activity.nickname = nickname;
        socket.emit("updateGameActivity", game_activity);
    });

    socket.on("hostLeft",  async (roomId: string) => {
      // Find the player based on socket id
      if (connectedPlayers.has(socket.id)) {
        const { roomId, nickname } = connectedPlayers.get(socket.id);

        // Delete it from the Map of all players
        connectedPlayers.delete(socket.id);
      }
    });

    socket.on("disconnect", async () => {
      // Find the player based on socket id
      if (connectedPlayers.has(socket.id)) {
        const { roomId, nickname } = connectedPlayers.get(socket.id);

        // Delete it from the Map of all players
        connectedPlayers.delete(socket.id);

        if (roomId) {
          // Get socket.io room based on roomId
          const room = io.sockets.adapter.rooms.get(roomId);
          if (room) {
            // Get game activity, remove player that left, update game activity
            const game_activity = await getGameActivity(roomId);
            game_activity.players  = game_activity.players.filter((p: Player) => p.nickname !== nickname);
            await setGameActivity(game_activity, roomId);

            // Send new game activity to host
            game_activity.role = "host";
            socket.broadcast.to(game_activity.masterSocket).emit("updateGameActivity", game_activity);
          }
        }
      }
    });
  });
};

export default playerSocketConnection;
