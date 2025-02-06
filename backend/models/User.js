// backend/models/User.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    try {
      console.log("🔎 Buscando usuario con email:", email); // Depuración

      // Ejecutar la consulta
      const [rows] = await db.execute(
        `SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, 
                p.id_persona, p.nombre_persona, p.email 
         FROM Usuarios u 
         INNER JOIN Personas p ON u.id_persona = p.id_persona 
         WHERE p.email = ?`,
        [email]
      );

      console.log("🟢 Filas obtenidas:", rows); // Ver qué devuelve realmente

      if (!rows || rows.length === 0) {
        console.warn("⚠️ No se encontró el usuario con email:", email);
        return null;
      }

      return rows[0]; // Retornar el primer usuario encontrado
    } catch (error) {
      console.error("❌ Error en findByEmail:", error);
      throw new Error("Error al buscar el usuario por email");
    }
  }
}

module.exports = User;
