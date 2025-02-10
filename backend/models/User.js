// backend/models/User.js
const db = require('../config/db');

const User = {
    async findByEmail(email) {
        try {
            const query = `
                SELECT U.id_usuario, U.nombre_usuario, U.contrasena_hash, P.email
                FROM b8biz3pozkccjo4cgtlo.Usuarios U
                JOIN b8biz3pozkccjo4cgtlo.Personas P ON U.id_persona = P.id_persona
                WHERE P.email = ?`;

            console.log('🔍 Ejecutando consulta:', query, 'con email:', email);
            const [rows] = await db.execute(query, [email]);

            console.log('📌 Resultado de la consulta:', rows);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findByEmail:', error);
            throw error;
        }
    }
};

module.exports = User;
