const express = require('express');
const dbfController = require('../controller/dbfContraller');
const extractController = require('../controller/extractionContraller');

const router = express.Router();

// POST /api/dbf/upload
router.post('/upload', dbfController.upload, dbfController.uploadDBF);
router.post('/extract', extractController.getRegistersDBF);

module.exports = router;
