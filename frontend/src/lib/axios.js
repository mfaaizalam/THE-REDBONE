import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL:"https://portfolio-theta-seven-33.vercel.app/api",
    baseURL:"http://localhost:5000/api",
      withCredentials:true,
})