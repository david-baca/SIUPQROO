const express = require('express');

const routerReports = express.Router();

// POST /api/dbf/upload
routerReports.get('/report', loadDBFContraller.load);

module.exports = routerDBF;