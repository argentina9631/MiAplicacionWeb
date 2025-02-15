import React, { useEffect, useState } from 'react';
import api from '../api';

const PersonasList = () => {
    const [personas, setPersonas] = useState([]);

    // Cargar la lista de personas al montar el componente
    useEffect(() => {
        api.get('/api/personas')
            .then(response => setPersonas(response.data))
            .catch(error => console.error('Error al cargar personas:', error));
    }, []);

    const agregarPersona = () => {
        const nuevaPersona = { nombre: 'Nueva Persona', edad: 20 };
        api.post('/api/personas', nuevaPersona)
            .then(response => setPersonas([...personas, response.data]))
            .catch(error => console.error('Error al agregar persona:', error));
    };

    const eliminarPersona = (id) => {
        api.delete(`/api/personas/${id}`)
            .then(() => setPersonas(personas.filter(persona => persona.id !== id)))
            .catch(error => console.error('Error al eliminar persona:', error));
    };

    return (
        <div>
            <h1>Lista de Personas</h1>
            <ul>
                {personas.map(persona => (
                    <li key={persona.id}>
                        {persona.nombre} - {persona.edad} años
                        <button onClick={() => eliminarPersona(persona.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={agregarPersona}>Agregar Persona</button>
        </div>
    );
};

export default PersonasList;
