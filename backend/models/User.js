// backend/models/User.js
const db = require('../config/db');

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.email FROM Usuarios u JOIN Personas p ON u.id_persona = p.id_persona WHERE p.email = ?',
        [email]
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new Error('Error en la base de datos');
    }
  }
}

module.exports = User;