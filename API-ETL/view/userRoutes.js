const express = require('express');
const loadDBFContraller = require('../controller/DBF/loadDBF');
const extractionDBFContraller = require('../controller/DBF/extractionDBF');
const deleteDBFContraller = require('../controller/DBF/deleteDBF');

const routerUser = express.Router();
// POST /api/dbf/upload
routerUser.post('/create', loadDBFContraller.load, loadDBFContraller.loadDBF);
routerUser.get('/read', loadDBFContraller.load, loadDBFContraller.loadDBF);
routerUser.put('/update', loadDBFContraller.load, loadDBFContraller.loadDBF);
routerUser.delete('/delete', loadDBFContraller.load, loadDBFContraller.loadDBF);

module.exports = routerUser;