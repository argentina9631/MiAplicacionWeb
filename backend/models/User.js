const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  // Buscar usuario por correo electrónico
  static async findByEmail(email) {
    // Realiza un JOIN entre Usuarios y Personas para obtener los detalles completos del usuario
    const [rows] = await db.execute(
      'SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.id_persona, p.nombre_persona, p.email ' +
      'FROM Usuarios u ' +
      'JOIN Personas p ON u.id_persona = p.id_persona ' +
      'WHERE p.email = ?',
      [email]
    );

    // Si no se encuentra el usuario, retorna null
    if (rows.length === 0) {
      return null;
    }

    return rows[0]; // Retorna el primer usuario encontrado
  }

  // Crear un nuevo usuario
  static async create(user) {
    // Hashear la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Insertar el usuario en la tabla Usuarios
    const [result] = await db.execute(
      'INSERT INTO Usuarios (nombre_usuario, contrasena_hash, id_persona) VALUES (?, ?, ?)',
      [user.username, hashedPassword, user.id_persona]
    );

    return result.insertId; // Retorna el ID del usuario insertado
  }

  // Verificar la contraseña
  static async verifyPassword(storedHash, password) {
    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    return await bcrypt.compare(password, storedHash);
  }
}

module.exports = User;