// frontend/src/api.js
import axios from 'axios';

// Leer la URL del backend desde las variables de entorno
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

