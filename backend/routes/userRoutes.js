// backend/routes/userRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar el token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: { id_usuario: decoded.id_usuario, email: decoded.email } });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
});

module.exports = router;