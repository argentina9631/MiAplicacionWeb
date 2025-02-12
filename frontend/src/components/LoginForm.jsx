// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth(); // Usar la función login del hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(email, password); // Llamar a la función login
            alert("Inicio de sesión exitoso");
            window.location.href = "/"; // Redirigir después de iniciar sesión
        } catch (error) {
            console.error("Error en login:", error.message);
            setError(error.message);
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
        </div>
    );
};

export default LoginForm;
