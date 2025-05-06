const db = require('../db/database');

// Buscar usuario por nombre
function findUser(username, callback) {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    callback(err, row);
  });
}

// Registrar nuevo usuario
function createUser(username, hashedPassword, callback) {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
    callback(err, this.lastID);
  });
}

module.exports = { findUser, createUser };
