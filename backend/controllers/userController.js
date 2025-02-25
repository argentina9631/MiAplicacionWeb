// backend/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Buscar usuario por email
        const query = `
            SELECT u.id_usuario, p.email, u.contrasena_hash 
            FROM Personas p 
            INNER JOIN Usuarios u ON p.id_persona = u.id_persona 
            WHERE p.email = ?`;
        
        const [results] = await db.query(query, [email]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        const user = results[0];

        // Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.contrasena_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id_usuario: user.id_usuario, email: user.email } });
    } catch (err) {
        console.error('Error en loginUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { loginUser };
