const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { usuarios } = require('../models/users')

router.post('/', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
    }

    const usuarioExistente = usuarios.find(u => u.usuario === usuario)
    if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    const salt = bcrypt.genSaltSync(10);
    const contraseñaHash = bcrypt.hashSync(contraseña, salt);

    const nuevoUsuario = {
        id: usuarios.length + 1,
        usuario,
        contraseña: contraseñaHash
    }
    usuarios.push(nuevoUsuario)

    res.status(201).json({ mensaje: 'Usuario registrado' });
});

module.exports = router;