// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req, res) => {
    try {
        console.log('➡️ POST /api/users/login recibido');
        console.log('🔹 Request body:', req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        console.log('🔎 Buscando usuario con email:', email);
        const user = await User.findByEmail(email);

        if (!user) {
            console.log('❌ Usuario no encontrado');
            return res.status(400).json({ error: 'Email o contraseña incorrectos' });
        }

        console.log('🟢 Usuario encontrado:', user.nombre_persona);

        const passwordMatch = await bcrypt.compare(password, user.contrasena_hash);
        if (!passwordMatch) {
            console.log('❌ Contraseña incorrecta');
            return res.status(400).json({ error: 'Email o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: user.id_usuario, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('✅ Login exitoso');
        res.json({ token, user: { id: user.id_usuario, email: user.email, nombre: user.nombre_persona } });

    } catch (error) {
        console.error('❌ Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { loginUser };
