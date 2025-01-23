// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';

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
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <Router>
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
