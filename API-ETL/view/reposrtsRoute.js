const express = require('express');
const deleteDBFContraller = require('../controller/DBF/deleteDBF');
const routerReports = express.Router();

// POST /api/dbf/upload 
routerReports.get('/all', loadDBFContraller.load);

module.exports = routerReports;