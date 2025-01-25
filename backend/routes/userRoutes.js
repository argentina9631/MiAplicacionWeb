// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware'); // Middleware de autenticación

// Ruta para login
router.post('/login', (req, res) => {
    // Implementación del login
    res.json({ mensaje: 'Inicio de sesión correcto' });
});

// Ruta para verificar token
router.get('/auth/verify', verificarToken, (req, res) => {
    res.json({ mensaje: 'Token válido', usuarioId: req.usuarioId, rolId: req.rolId });
});

module.exports = router;

