// backend/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // Reemplaza body-parser

console.log("🚀 Servidor iniciando...");

app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

// Rutas de la API
app.use("/api/users", userRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
