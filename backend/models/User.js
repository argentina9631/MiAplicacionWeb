// backend/models/User.js

const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    try {
      console.log("🔎 Buscando usuario con email:", email); // Depuración

      // Ejecutar la consulta
      const result = await db.execute(
        `SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, 
                p.id_persona, p.nombre_persona, p.email 
         FROM Usuarios u 
         INNER JOIN Personas p ON u.id_persona = p.id_persona 
         WHERE p.email = ?`,
        [email]
      );

      console.log("🟢 Resultado crudo de la consulta:", result); // Ver qué devuelve realmente

      // Verificar si result es un arreglo y tiene elementos
      if (!result || !Array.isArray(result[0]) || result[0].length === 0) {
        throw new Error("La consulta no devolvió datos válidos.");
      }

      const rows = result[0]; // Extraer las filas del primer elemento del arreglo
      console.log("📌 Filas obtenidas:", rows);

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("❌ Error en findByEmail:", error);
      throw error;
    }
  }
}

module.exports = User;
