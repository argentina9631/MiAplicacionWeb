// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("Enviando datos de login:", { email, password });

    try {
      const response = await fetch(`http://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      console.log("Token recibido:", data.token);
      localStorage.setItem("token", data.token);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error en login:", error);
      setError(error.message || "Error desconocido al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="footer-text">Creado por J</p>
    </div>
  );
};

export default LoginForm;
