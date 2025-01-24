// frontend/src/components/LoginForm.jsx
import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!process.env.REACT_APP_API_URL) {
      console.error('Error: REACT_APP_API_URL no está definido en las variables de entorno.');
      setErrorMessage('Error interno. Por favor, contacta al administrador.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Redirige al dashboard
      } else {
        setErrorMessage(data.message || 'Credenciales inválidas.');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error.message);
      setErrorMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
