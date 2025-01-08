const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
