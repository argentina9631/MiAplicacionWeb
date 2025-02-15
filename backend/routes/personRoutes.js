const express = require('express');
const router = express.Router();

// Datos de ejemplo
let personas = [
    { id: 1, nombre: 'Juan', edad: 30 },
    { id: 2, nombre: 'María', edad: 25 }
];

// Obtener todas las personas
router.get('/', (req, res) => {
    res.json(personas);
});

// Agregar una nueva persona
router.post('/', (req, res) => {
    const nuevaPersona = req.body;
    nuevaPersona.id = personas.length + 1;
    personas.push(nuevaPersona);
    res.json(nuevaPersona);
});

// Eliminar una persona por ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    personas = personas.filter(persona => persona.id !== id);
    res.json({ mensaje: 'Persona eliminada' });
});

module.exports = router;
