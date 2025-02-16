// frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Verificando token...");
      api.get('/api/users/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log("Usuario verificado:", response.data.user);
        setUser(response.data.user);
      })
      .catch(error => {
        console.error("Error al verificar el token:", error);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    console.log("Iniciando sesión con:", { email });
    try {
      const response = await api.post('/api/users/login', { email, password });
      console.log("Respuesta de login:", response.data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  const logout = () => {
    console.log("Cerrando sesión");
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useAuth;