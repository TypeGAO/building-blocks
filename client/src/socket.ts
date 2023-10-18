import { io } from "socket.io-client"

export const socket = io(import.meta.env.DEV ? "http://localhost:3000" : "http://buildingblockstest.us-east-2.elasticbeanstalk.com", {
  autoConnect: true,
})
