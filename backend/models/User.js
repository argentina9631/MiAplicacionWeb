// backend/models/User.js
const db = require('../config/db');

const findByEmail = (email, callback) => {
    const query = `
        SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.email 
        FROM Usuarios u
        INNER JOIN Personas p ON u.id_persona = p.id_persona
        WHERE p.email = ?;
    `;

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('❌ Error en findByEmail:', err.message);
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
};

module.exports = { findByEmail };
