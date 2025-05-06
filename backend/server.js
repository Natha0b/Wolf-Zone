const express = require('express');
const cors = require('cors');
const app = express();
const usersRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
