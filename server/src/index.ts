import express from "express";
import http from "http";
import { Server } from "socket.io";
import { hostSocketConnection, playerSocketConnection } from "./routes/sockets";
const mountRoutes = require('./routes/router.ts');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

hostSocketConnection(io);
playerSocketConnection(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mountRoutes(app);
