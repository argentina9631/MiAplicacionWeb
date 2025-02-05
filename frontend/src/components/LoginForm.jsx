// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/api/users/login`, { email, password });
      console.log("Token recibido:", response.data.token);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Error al conectar con el servidor");
    }
  };

  return (
    <>
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
      </div>

      <footer>
        Creado por Pablo Rivero
      </footer>
    </>
  );
};

export default LoginForm;
