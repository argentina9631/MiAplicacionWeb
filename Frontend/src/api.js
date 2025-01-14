// frontend/src/api.js
import axios from 'axios';

// Detectar si estamos en producción o desarrollo
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'b0zikz3dqmgwdwvkjr5b-mysql.services.clever-cloud.com/api' // URL del backend en Clever Cloud
    : 'http://localhost:3000/api'; // Desarrollo local

const api = axios.create({
  baseURL, // URL base configurada dinámicamente
});

export default api;

