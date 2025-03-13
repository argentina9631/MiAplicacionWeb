// backend/models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.id_persona, p.nombre_persona, p.email ' +
      'FROM Usuarios u ' +
      'JOIN Personas p ON u.id_persona = p.id_persona ' +
      'WHERE p.email = ?',
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0]; // Retorna el primer usuario encontrado
  }
}

module.exports = User;
