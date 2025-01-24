// frontend/src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/users/login', {
        email,
        password
      });
      console.log('Login exitoso', response.data);
      // Aquí podrías almacenar el token y redirigir a otra página o hacer otra acción
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;


