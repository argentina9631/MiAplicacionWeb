// backend/routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta protegida para verificar sesión
router.get('/verify', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
