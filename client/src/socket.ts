import { io } from "socket.io-client"
import { DEV_SERVER_URL, PROD_SERVER_URL } from "./constants"

export const socket = io(
  import.meta.env.DEV ? DEV_SERVER_URL : PROD_SERVER_URL,
  {
    autoConnect: true,
  }
)
