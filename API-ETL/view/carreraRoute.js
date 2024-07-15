const express = require('express');
const carreraContraller = require('../controller/carreraContraller');

const routerCarrera = express.Router();

routerCarrera.get('/read', carreraContraller.getAllCarrera);
routerCarrera.get('/read/:id', carreraContraller.getCarreraById);

module.exports = routerCarrera;
