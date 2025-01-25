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
            const response = await axios.post(
                'https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/users/login',
                { email, password }
            );
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.reload();
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;



