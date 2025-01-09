import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";

function App() {
  // Estado para manejar la autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState(null); // Almacena el rol del usuario

  // Función para manejar el login
  const handleLogin = (token, rol) => {
    localStorage.setItem("token", token);  // Guardamos el token
    localStorage.setItem("rol", rol);      // Guardamos el rol del usuario
    setIsAuthenticated(true);
    setUsuarioRol(rol);
  };

  // Función para verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUsuarioRol(localStorage.getItem("rol"));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar rol={usuarioRol} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            {/* Redirige a la página principal (dashboard) si no se encuentra la ruta */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
