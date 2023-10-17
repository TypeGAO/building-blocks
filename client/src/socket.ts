import { io } from "socket.io-client"

export const socket = io("http://buildingblockstest.us-east-2.elasticbeanstalk.com", {
  path: "/socket.io",
  autoConnect: true,
})
