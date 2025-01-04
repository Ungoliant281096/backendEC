const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./services/login');
const registroRoutes = require('./services/registro');

const app = express();
const port = 1717;

app.use(bodyParser.json());

// Rutas de login
app.use('/BLogin', loginRoutes);

// Rutas de registro
app.use('/BRegistro', registroRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});