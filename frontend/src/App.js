// frontend/src/App.js
import React from "react";
import useAuth from "./hooks/useAuth"; // Importar el hook
import LoginForm from "./components/LoginForm";

function App() {
    const { user, logout } = useAuth(); // Usar el usuario y logout del hook

    return (
        <div>
            <h1>Bienvenido a Mi Aplicación Web</h1>
            {user ? (
                <div>
                    <h2>Hola, {user.name}</h2>
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            ) : (
                <LoginForm />
            )}
        </div>
    );
}

export default App;
