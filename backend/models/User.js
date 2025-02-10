// backend/models/User.js
const db = require("../config/db");

class User {
    static async findByEmail(email) {
        try {
            const [rows] = await db.execute(
                `SELECT P.id_persona, U.nombre_usuario, U.contrasena_hash, P.email
                 FROM Personas P
                 LEFT JOIN Usuarios U ON U.id_persona = P.id_persona
                 WHERE P.email = ?`,
                [email]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error en findByEmail:", error);
            throw error;
        }
    }
}

module.exports = User;