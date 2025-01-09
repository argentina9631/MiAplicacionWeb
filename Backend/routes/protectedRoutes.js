// backend/routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { verificarToken, verificarPermiso } = require('../middleware/authMiddleware');

router.get('/dashboard', verificarToken, verificarPermiso('dashboard'), (req, res) => {
    res.json({ mensaje: 'Bienvenido al dashboard' });
});

router.get('/usuarios', verificarToken, verificarPermiso('usuarios'), (req, res) => {
    res.json({ mensaje: 'Gestión de usuarios' });
});

module.exports = router;
