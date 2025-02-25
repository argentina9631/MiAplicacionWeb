// backend/models/User.js
const db = require('../config/db');

class User {
    static async findByEmail(email) {
        const query = `
            SELECT u.id_usuario, p.email, u.contrasena_hash 
            FROM Personas p 
            INNER JOIN Usuarios u ON p.id_persona = u.id_persona 
            WHERE p.email = ?`;
        
        const [results] = await db.query(query, [email]);
        return results.length > 0 ? results[0] : null;
    }
}

module.exports = User;
