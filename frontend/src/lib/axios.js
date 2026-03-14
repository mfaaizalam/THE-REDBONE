import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://the-redbone-7xuw.vercel.app/api",
    // baseURL:"http://localhost:5000/api",
      withCredentials:true,
})