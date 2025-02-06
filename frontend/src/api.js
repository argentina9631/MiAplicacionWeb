// frontend/src/api.js
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
