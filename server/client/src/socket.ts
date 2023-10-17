import { io } from "socket.io-client"

export const socket = io("http://localhost/backend", {
  autoConnect: true,
})
