import express from "express";
import http from "http";
import { Server } from "socket.io";
import { hostSocketConnection, playerSocketConnection } from "./routes/sockets";
import cors from "cors";
const mountRoutes = require("./routes/router.ts");

const app = express();
const server = http.createServer(app);

interface SocketData {
  gameActivities: Map<string, object>;
}

const io = new Server<SocketData>(server, {
  cors: {
    origin: (process.env.NODE_DEV == "true" ? "http://localhost:5173" : "https://bblocks.live"),
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

app.use(
  cors({
    origin: (process.env.NODE_DEV == "true" ? "http://localhost:5173" : "https://bblocks.live"),
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

hostSocketConnection(io);
playerSocketConnection(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mountRoutes(app);
