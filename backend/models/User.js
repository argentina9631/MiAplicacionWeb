// backend/models/User.js
const db = require('../config/db');

class User {
    static async findByEmail(email) {
        try {
            const [rows] = await db.execute(
                'SELECT id_usuario, nombre_usuario, contrasena_hash, email FROM Usuarios WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                console.log('❌ Usuario no encontrado');
                return null;
            }

            return rows[0];
        } catch (error) {
            console.error('❌ Error en findByEmail:', error);
            throw new Error('Error al buscar el usuario por email');
        }
    }
}

module.exports = User;
