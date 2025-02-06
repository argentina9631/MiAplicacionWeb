// backend/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes"); // Asegúrate de que este archivo exista

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Agregar log para verificar que la aplicación está iniciando correctamente
console.log("🚀 Servidor iniciando...");

// Middleware para loguear cada solicitud (depuración)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Usar las rutas de usuario
app.use("/api/users", userRoutes);

// Ruta de prueba para verificar que el backend está corriendo
app.get("/", (req, res) => {
  res.send("✅ Servidor en funcionamiento");
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Definir el puerto desde el .env o usar 8080 por defecto
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
