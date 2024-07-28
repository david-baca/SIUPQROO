const express = require('express');
const reportsContraller = require('../controller/reportsContraller');
const routerReports = express.Router();

// POST /api/dbf/upload 
routerReports.post('/all', reportsContraller.ReportALL);

module.exports = routerReports;