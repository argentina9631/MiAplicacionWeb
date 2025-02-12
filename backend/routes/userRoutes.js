// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, verifyToken } = require('../controllers/userController');

// Ruta para login
router.post('/login', loginUser);

// Ruta de verificación de token
router.get('/verify', verifyToken);

module.exports = router;
