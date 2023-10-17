"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const sockets_1 = require("./routes/sockets");
const mountRoutes = require('./routes/router.ts');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://buildingblockstest.us-east-2.elasticbeanstalk.com",
    },
});
(0, sockets_1.hostSocketConnection)(io);
(0, sockets_1.playerSocketConnection)(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mountRoutes(app);
