// frontend/src/api.js
import axios from 'axios';

// Usa la variable de entorno REACT_APP_API_URL
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; // Default a localhost si no está configurado

const api = axios.create({
  baseURL, // URL base configurada dinámicamente
});

export default api;

