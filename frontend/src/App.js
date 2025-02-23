//frontend/src/App.js
import React from "react";
import useAuth from "./hooks/useAuth"; // Importar el hook
import LoginForm from "./components/LoginForm";
import PersonasList from './components/PersonasList'; // Ruta ajustada según tu estructura
import "./App.css";

function App() {
    const { user, logout } = useAuth(); // Usar el usuario y logout del hook

    return (
        <div>
            
            {user ? (
                <div>
                    <h2>Hola, {user.name}</h2>
                    <button onClick={logout}>Cerrar sesión</button>
                    <PersonasList /> {/* Mostrar la lista de personas */}
                </div>
            ) : (
                <LoginForm />
            )}
            <p className="created-by">Creado por A1B1</p> {/* Texto agregado */}
        </div>
    );
}

export default App;