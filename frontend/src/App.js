import React, { useEffect, useState } from 'react';
import { Router, Route, Routes, Navigate } from 'react-router-dom'; // Nota: Usamos Router en lugar de HistoryRouter
import { createBrowserHistory } from 'history'; // Importamos desde el paquete `history`
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';

// Creamos el historial personalizado
const history = createBrowserHistory();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <Router history={history}>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
