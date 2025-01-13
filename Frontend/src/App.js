import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: null,
    rol: null,
  });

  // Función para manejar el login
  const handleLogin = async (token, rol) => {
    try {
      localStorage.setItem("user", JSON.stringify({ token, rol })); // Guarda el token y rol en localStorage
      setUser({
        isAuthenticated: true,
        token,
        rol,
      });
    } catch (err) {
      console.error("Error al guardar el estado de usuario:", err);
    }
  };

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token, rol } = JSON.parse(storedUser);

      // Opcional: Verificar token con el backend
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setUser({
              isAuthenticated: true,
              token,
              rol,
            });
          } else {
            console.warn("Sesión expirada o token inválido.");
            localStorage.removeItem("user");
          }
        })
        .catch((err) => {
          console.error("Error al verificar token:", err);
        });
    }
  }, []);

  // Renderizado condicional basado en autenticación
  return (
    <Router>
      {!user.isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar rol={user.rol} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
