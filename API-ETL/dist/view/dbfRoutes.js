const express = require('express');
const loadDBFContraller = require('../controller/DBF/loadDBF');
const extractionDBFContraller = require('../controller/DBF/extractionDBF');
const deleteDBFContraller = require('../controller/DBF/deleteDBF');

const routerDBF = express.Router();

// POST /api/dbf/upload
routerDBF.post('/load', loadDBFContraller.load, loadDBFContraller.loadDBF);
routerDBF.post('/extract', extractionDBFContraller.getRegistersDBF);
routerDBF.delete('/delete', deleteDBFContraller.deleteDBF);

module.exports = routerDBF;
