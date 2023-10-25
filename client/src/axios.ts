import axios from "axios"
import { DEV_SERVER_URL, PROD_SERVER_URL } from "./constants"

const axiosClient = axios.create({
  baseURL: import.meta.env.DEV ? DEV_SERVER_URL : PROD_SERVER_URL,
})

export default axiosClient
