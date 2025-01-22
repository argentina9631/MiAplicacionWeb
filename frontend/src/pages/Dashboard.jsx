import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token está en el localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    
    // Redirigir a la ruta personalizada, en este caso, la ruta de inicio
    window.location.href = 'http://localhost:8080';  // Redirigir al inicio de sesión externo
  };

  return (
    <div>
      <h1>Bienvenido a la pantalla principal</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
