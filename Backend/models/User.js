const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await db.execute(
      'INSERT INTO Usuarios (email, password, id_persona) VALUES (?, ?, ?)',
      [user.email, hashedPassword, user.id_persona]
    );
    return result.insertId;
  }
}

module.exports = User;
