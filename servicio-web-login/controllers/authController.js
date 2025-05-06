const bcrypt = require('bcryptjs');
const { findUser, createUser } = require('../models/userModel');

// Registro de usuario
function register(req, res) {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

    createUser(username, hash, (err, id) => {
      if (err) return res.status(400).json({ error: 'Usuario ya existe' });

      res.status(201).json({ message: 'Usuario registrado con éxito', id });
    });
  });
}

// Inicio de sesión
function login(req, res) {
  const { username, password } = req.body;

  findUser(username, (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Error en la autenticación' });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.json({ message: 'Autenticación satisfactoria' });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    });
  });
}

module.exports = { register, login };
