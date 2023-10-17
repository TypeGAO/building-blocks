"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateGameService_1 = require("../../../services/generateGameService");
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
const hostSocketConnection = (io) => {
    io.on("connection", (socket) => {
        socket.on("createRoom", () => __awaiter(void 0, void 0, void 0, function* () {
            const roomId = (0, generateGameService_1.generateUniqueCode)();
            socket.join(roomId);
            socket.emit("roomCreated", { roomId, stage: "lobby", role: "host" });
            // Add room in database
            const game_activity = (0, generateGameService_1.newGameActivity)(roomId);
            let strSQL = ` INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started) 
                     VALUES ($1, false, $2, $3, NOW())`;
            yield query(strSQL, [roomId, 1, game_activity]);
        }));
    });
};
exports.default = hostSocketConnection;
