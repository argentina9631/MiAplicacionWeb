const pool = require('../config/db');

const Personas = {
  // Obtener persona por ID
  async findById(idPersona) {
    try {
      const query = `
        SELECT * FROM Personas
        WHERE id_persona = ?
      `;
      const [rows] = await pool.promise().query(query, [idPersona]);
      
      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error(`❌ Error en findById: ${error.message}`);
      throw new Error('Error al buscar persona por ID');
    }
  },

  // Obtener persona por email
  async findByEmail(email) {
    try {
      const query = `
        SELECT * FROM Personas
        WHERE email = ?
      `;
      const [rows] = await pool.promise().query(query, [email]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error(`❌ Error en findByEmail: ${error.message}`);
      throw new Error('Error al buscar persona por email');
    }
  },

  // Crear nueva persona
  async create(nombrePersona, telefono, dni, email, idDomicilio) {
    try {
      const query = `
        INSERT INTO Personas (nombre_persona, telefono, dni, email, id_domicilio)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.promise().query(query, [nombrePersona, telefono, dni, email, idDomicilio]);
      
      return result.insertId;
    } catch (error) {
      console.error(`❌ Error en create: ${error.message}`);
      throw new Error('Error al crear persona');
    }
  },

  // Actualizar datos de una persona
  async update(idPersona, nombrePersona, telefono, dni, email, idDomicilio) {
    try {
      const query = `
        UPDATE Personas
        SET nombre_persona = ?, telefono = ?, dni = ?, email = ?, id_domicilio = ?
        WHERE id_persona = ?
      `;
      const [result] = await pool.promise().query(query, [nombrePersona, telefono, dni, email, idDomicilio, idPersona]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error(`❌ Error en update: ${error.message}`);
      throw new Error('Error al actualizar persona');
    }
  }
};

module.exports = Personas;
