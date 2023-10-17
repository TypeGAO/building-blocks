"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newGameActivity = exports.addPlayer = exports.generateUniqueCode = void 0;
// Create random 7 character code
function generateUniqueCode() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
exports.generateUniqueCode = generateUniqueCode;
function addPlayer(username) {
    return {
        username: username,
        currentQuestion: 0,
        score: 0,
        buildingBlocksIDs: []
    };
}
exports.addPlayer = addPlayer;
function newGameActivity(roomID) {
    return {
        roomID: roomID,
        timeRemaining: -1,
        players: []
    };
}
exports.newGameActivity = newGameActivity;
