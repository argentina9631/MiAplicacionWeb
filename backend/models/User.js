// backend/models/User.js
const db = require('../config/db'); // Asegúrate de importar tu conexión MySQL

async function findByEmail(email) {
    try {
        const [rows] = await db.execute(
            `SELECT Usuarios.id_usuario, Usuarios.nombre_usuario, Usuarios.contrasena_hash, 
                    Personas.email 
             FROM Usuarios
             JOIN Personas ON Usuarios.id_persona = Personas.id_persona
             WHERE Personas.email = ?`,
            [email]
        );

        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error en findByEmail:', error);
        throw error;
    }
}

module.exports = User;