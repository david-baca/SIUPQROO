const express = require('express');
const periodoController = require("../controller/periodoContraller")
const routePeriodo = express.Router();

routePeriodo.get('/', periodoController.getAllPeriodos);

module.exports = routePeriodo;