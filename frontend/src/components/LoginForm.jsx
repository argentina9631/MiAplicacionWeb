// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth'; // Importa la función de login desde auth.js

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
      const data = await login(email, password); // Llama a la función login de auth.js
      if (data && data.token) {
        console.log("Token recibido:", data.token);
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso");
        navigate("/"); // Redirige a la página principal después de login
      } else {
        throw new Error("Respuesta del servidor inválida");
      }
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
