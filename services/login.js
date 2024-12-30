const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Importar la base de datos (en un caso real)
const { usuarios } = require('../models/users'); // Importar desde un módulo de base de datos

router.post('/', (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const contraseñaCorrecta = bcrypt.compareSync(contraseña, usuarioEncontrado.contraseña);

  if (!contraseñaCorrecta) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario }, 'secreto_super_secreto', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;