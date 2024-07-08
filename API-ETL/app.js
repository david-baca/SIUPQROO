const express = require('express');
const bodyParser = require('body-parser');
const router = require('./view/userRoutes');
const sequelize = require('./config/database');
const app = express();
app.use(bodyParser.json());
app.use('/api', router);

// Sincronización y creación de la base de datos si no existe
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(async (error) => {
        console.error("Error al sincronizar la base de datos:\n"+
        "Porfavor asegurese de que su gestor de base de datos este correndo o que exista la base de datos siupqroo ");
        process.exit(1);
    });
//const initializeApp = require('./config/initialize'); inicializador de creacion de base de datos
//initializeApp() elemento aun no funcional
module.exports = app;
