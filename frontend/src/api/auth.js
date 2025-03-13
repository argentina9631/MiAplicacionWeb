// frontend/src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error en login:', error.response?.data || error.message);
        throw new Error(error.response?.data.message || 'Error en el servidor');
    }
};