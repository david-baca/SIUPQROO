const express = require('express');
const bodyParser = require('body-parser');
const dataController = require('../Controladores/datacontraller');
require('dotenv').config(); //llama a el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/data', dataController.getData);
app.post('/api/data', dataController.addData);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

