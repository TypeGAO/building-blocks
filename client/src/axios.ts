import axios from "axios"

const axiosClient = axios.create({
  baseURL: (import.meta.env.DEV ? "http://localhost:3000" : "http://buildingblockstest.us-east-2.elasticbeanstalk.com"),
})

export default axiosClient
