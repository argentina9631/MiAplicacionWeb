// frontend/src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar({ rol }) {
    let opciones = [];

    // Definir las opciones de navegación según el rol
    switch (rol) {
        case 'ADMINISTRADOR':
            opciones = ['dashboard', 'usuarios', 'reportes'];
            break;
        case 'DUEÑO':
            opciones = ['dashboard', 'inventario'];
            break;
        case 'SUPERVISOR':
            opciones = ['dashboard', 'tareas'];
            break;
        case 'RECEPCIONISTA':
            opciones = ['reservas'];
            break;
        case 'CLIENTE':
            opciones = ['perfil', 'reservas'];
            break;
        default:
            opciones = [];
            break;
    }

    return (
        <div style={{ width: '200px', backgroundColor: '#333', color: '#fff', height: '100vh' }}>
            <nav>
                {opciones.map((opcion) => (
                    <Link key={opcion} to={`/${opcion}`} style={{ display: 'block', padding: '10px', color: '#fff' }}>
                        {opcion}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
