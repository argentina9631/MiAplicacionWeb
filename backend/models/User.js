// backend/models/User.js

const db = require('../config/db');

class User {
    static async findByEmail(email) {
        try {
            const [rows] = await db.execute(`
                SELECT U.id_usuario, U.nombre_usuario, U.contrasena_hash, P.email
                FROM Usuarios U
                JOIN Personas P ON U.id_persona = P.id_persona
                WHERE P.email = ?
            `, [email]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error en findByEmail:', error);
            throw error;
        }
    }
}

module.exports = User;
