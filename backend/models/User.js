// backend/models/User.js
const pool = require('../config/db');

const User = {
  async findByEmail(email) {
    try {
      const query = `
        SELECT u.idUsuario, p.email, u.password 
        FROM Personas p 
        INNER JOIN Usuarios u ON p.idPersona = u.idPersona 
        WHERE p.email = ?
      `;
      const [rows] = await pool.promise().query(query, [email]);

      if (rows.length === 0) {
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