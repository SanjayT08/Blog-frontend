import axios from "axios";
const BASE_URL = "https://blog-backend-api-p4jb.onrender.com"; 
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
