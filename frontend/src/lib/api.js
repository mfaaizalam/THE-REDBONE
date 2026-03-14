// api.js
import { axiosInstance } from "./axios"; // relative path check karo

export const  submitOrder = async (payload) => {
  try {
    const response = await axiosInstance.post("/orders", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server Error" };
  }
};

