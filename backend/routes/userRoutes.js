// backend/routes/userRoutes.js

const express = require('express');
const crypto = require('crypto'); // Usado en lugar de bcrypt si el hash es SHA-256
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Si la base de datos usa SHA-256 en lugar de bcrypt
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
        if (passwordHash !== user.password) {
            console.warn(`⚠️ Contraseña incorrecta para usuario: ${user.email}`);
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user.idUsuario }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, idUsuario: user.idUsuario });
    } catch (error) {
        console.error(`❌ Error en /login: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
