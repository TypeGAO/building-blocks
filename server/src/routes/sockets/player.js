"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const playerSocketConnection = (io) => {
    const connectedPlayers = new Map();
    io.on("connection", (socket) => {
        socket.on("joinRoom", (roomId) => {
            const room = io.sockets.adapter.rooms.get(roomId);
            if (room) {
                socket.join(roomId);
                connectedPlayers.set(socket.id, {
                    roomId,
                    nickname: "foobar", // TODO: Add support for nicknames
                });
                socket.emit("roomJoined", {
                    roomId,
                    stage: "lobby",
                    role: "player",
                });
                const playerCount = room.size - 1;
                io.to(roomId).emit("playerCount", playerCount);
                socket.to(roomId).emit("playerJoined", socket.id);
            }
            else {
                socket.emit("roomNotFound", `Room ${roomId} not found`);
            }
        });
        socket.on("disconnect", () => {
            if (connectedPlayers.has(socket.id)) {
                const { roomId } = connectedPlayers.get(socket.id);
                connectedPlayers.delete(socket.id);
                if (roomId) {
                    const room = io.sockets.adapter.rooms.get(roomId);
                    if (room) {
                        const playerCount = room.size - 1;
                        io.to(roomId).emit("playerCount", playerCount);
                    }
                }
            }
        });
    });
};
exports.default = playerSocketConnection;
