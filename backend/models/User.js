// backend/models/User.js

const pool = require('../config/db');

const User = {
    async findByEmail(email) {
        try {
            const [rows] = await pool.query(`
                SELECT u.idUsuario, p.email, u.password
                FROM Personas p
                INNER JOIN Usuarios u ON p.idPersona = u.idPersona
                WHERE p.email = ?`, 
                [email]
            );

            if (rows.length === 0) {
                console.warn(`⚠️ No se encontró un usuario con el email: ${email}`);
                return null;
            }

            return rows[0];
        } catch (error) {
            console.error(`❌ Error en findByEmail: ${error.message}`);
            throw new Error('Error al buscar usuario por email');
        }
    }
};

module.exports = User;
