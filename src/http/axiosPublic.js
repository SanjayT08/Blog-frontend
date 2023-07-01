import axios from "axios";

export const BASE_URL = "https://blog-application-mern.netlify.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
