const express = require('express');
const checkController = require("../controller/checkController")
const routeCheck = express.Router();

routeCheck.get('/estado', checkController.getEstado);
routeCheck.get('/preload', checkController.getPreload);

module.exports = routeCheck;