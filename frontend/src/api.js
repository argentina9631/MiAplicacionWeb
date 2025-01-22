// frontend/src/api.js
import axios from 'axios';

// Usa la variable de entorno REACT_APP_API_URL
const baseURL = process.env.REACT_APP_API_URL || 'https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/'; // Default a localhost si no está configurado

const api = axios.create({
  baseURL, // URL base configurada dinámicamente
});

export default api;

