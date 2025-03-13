const bcrypt = require("bcrypt");

app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM Usuarios WHERE email = ?";
    
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        
        if (results.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

        const user = results[0];

        // Verificar contraseña
        const match = await bcrypt.compare(password, user.contrasena_hash);
        
        if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

        res.json({ message: "Login exitoso", user });
    });
});
