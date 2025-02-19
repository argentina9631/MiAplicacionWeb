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
        // Buscar a la persona por email
        const personQuery = 'SELECT * FROM Personas WHERE email = ?';
        const [personResults] = await db.query(personQuery, [email]);

        if (personResults.length === 0) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        const person = personResults[0];

        // Buscar al usuario asociado a la persona
        const userQuery = 'SELECT * FROM Usuarios WHERE id_persona = ?';
        const [userResults] = await db.query(userQuery, [person.id_persona]);

        if (userResults.length === 0) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        const user = userResults[0];

        // Comparar la contraseña proporcionada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.contrasena_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: person.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id_usuario: user.id_usuario, email: person.email } });
    } catch (err) {
        console.error('Error en loginUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { loginUser };
