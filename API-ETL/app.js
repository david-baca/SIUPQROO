const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerDBF = require('./dist/view/dbfRoutes');
const routerUser = require('./dist/view/userRoutes');
const routerCarrera = require('./dist/view/carreraRoute');
const routeCheck = require('./dist/view/checkRoute');
const routePeriodo = require('./dist/view/periodoRoute');
const routerReports = require('./dist/view/reposrtsRoute');
const sequelize = require('./dist/config/database');
const app = express();
require('dotenv').config();
const port_front = process.env.ORIGIN_PORT_FRONT || 3700;
// Configuración básica de CORS para permitir todas las solicitudes
app.use(cors({
    origin: `http://localhost:${port_front}`, // Permitir solicitudes solo desde este dominio
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos en las solicitudes
  }));
app.use(bodyParser.json()); 
app.use('/dbf', routerDBF);
app.use('/user', routerUser);
app.use('/carrera', routerCarrera);
app.use('/check', routeCheck);
app.use('/periodo', routePeriodo);
app.use('/reports', routerReports);

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
