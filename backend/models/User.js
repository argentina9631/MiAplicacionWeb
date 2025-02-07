// backend/models/User.js
const db = require('../config/db');

class User {
    static async findByEmail(email) {
        try {
            const [rows] = await db.execute(
                'SELECT id_usuario, nombre_usuario, contrasena_hash, id_persona, nombre_persona, email FROM usuarios WHERE email = ?',
                [email]
            );

            if (rows.length === 0) return null;
            return rows[0];
        } catch (error) {
            console.error('❌ Error en findByEmail:', error.message);
            throw new Error('Error al buscar el usuario por email');
        }
    }
}

module.exports = User;
