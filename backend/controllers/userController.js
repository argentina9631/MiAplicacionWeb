// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findByEmail } = require('../models/User');

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    findByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Comparar contraseña con bcrypt
        bcrypt.compare(password, user.contrasena_hash, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error en la autenticación' });

            if (!isMatch) {
                return res.status(400).json({ message: 'Email o contraseña incorrectos' });
            }

            // Generar JWT
            const token = jwt.sign({ id: user.id_usuario, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Inicio de sesión exitoso', token });
        });
    });
};

module.exports = { loginUser };
