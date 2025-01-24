// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware'); // Importamos el middleware

// Ruta para login (sin protección, ya que es donde el usuario inicia sesión)
router.post('/login', async (req, res, next) => {
  try {
    // Aquí iría tu lógica de login (como llamarlo al controlador de login)
    res.json({ mensaje: 'Login exitoso' });
  } catch (error) {
    next(error);
  }
});

// Ruta protegida que requiere autenticación (por ejemplo, obtener perfil de usuario)
router.get('/perfil', verificarToken, (req, res) => {
  // Esta ruta solo se ejecuta si el token es válido
  res.json({
    mensaje: 'Acceso al perfil permitido',
    usuarioId: req.usuarioId,  // El ID del usuario extraído del token
    rolId: req.rolId,          // El ID del rol extraído del token
  });
});

// Otras rutas relacionadas con usuarios pueden seguir aquí

module.exports = router;
