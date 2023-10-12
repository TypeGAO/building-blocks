import { Server, Socket } from "socket.io";
import { generateUniqueCode, newGameActivity } from "../../../services/generateGameService";

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
      let strSQL = ` INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started) 
                     VALUES ($1, false, $2, $3, NOW())`;
      await query(strSQL, [roomId, 1, game_activity]);

      game_activity.role = "host";
      socket.emit("roomCreated", game_activity);
    });
  });
};

export default hostSocketConnection;
