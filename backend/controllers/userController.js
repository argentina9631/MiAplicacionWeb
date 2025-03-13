// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await User.findByEmail(email);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const user = users[0];
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login exitoso', token, user });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};