// frontend/src/api.js
import axios from 'axios';

// Detectar si estamos en producción o desarrollo
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api' // URL del backend en desarrollo (puedes ajustar el puerto si es necesario)
    : 'https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api'; // URL del backend en Clever Cloud (producción)

const api = axios.create({
  baseURL, // URL base configurada dinámicamente
});

export default api;
