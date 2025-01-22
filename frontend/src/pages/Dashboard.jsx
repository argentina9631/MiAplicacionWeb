//frontend/src/pages/Dashboard
import React from 'react';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;

