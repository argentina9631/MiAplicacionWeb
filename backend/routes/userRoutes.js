// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);

router.get("/", (req, res) => {
    res.send("Ruta de usuarios funcionando");
});

module.exports = router;