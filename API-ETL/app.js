const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerDBF = require('./view/dbfRoutes');
const routerUser = require('./view/userRoutes');
const routerCarrera = require('./view/carreraRoute');
const routeCheck = require('./view/checkRoute');
const sequelize = require('./config/database');
const app = express();
// Configuración básica de CORS para permitir todas las solicitudes
app.use(cors({
    origin: 'http://localhost:3700', // Permitir solicitudes solo desde este dominio
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos en las solicitudes
  }));
app.use(bodyParser.json()); 
app.use('/dbf', routerDBF);
app.use('/user', routerUser);
app.use('/carrera', routerCarrera);
app.use('/check', routeCheck);

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
