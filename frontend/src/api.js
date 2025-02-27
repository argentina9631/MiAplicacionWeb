// frontend/src/api.js
import axios from 'axios';

// Definir la URL base del backend desde las variables de entorno
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;