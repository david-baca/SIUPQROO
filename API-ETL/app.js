const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use('/api', userRoutes);
// Sincronización y creación de la base de datos si no existe
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(async (error) => {
        console.error('Error al sincronizar la base de datos:', error);
        
        // Si hay un error, intentar ejecutar el script create.sql para crear la base de datos
        const createScriptPath = path.join(__dirname, 'siupqroo.sql');
        try {
            if (fs.existsSync(createScriptPath)) {
                const createScript = fs.readFileSync(createScriptPath, 'utf8');
                await sequelize.query(createScript);
                console.log('Base de datos creada utilizando el script create.sql');
            } else {
                console.error('No se encontró el script create.sql en el directorio actual.');
            }
        } catch (error) {
            console.error('Error al ejecutar el script create.sql:', error);
        }
    });
module.exports = app;
