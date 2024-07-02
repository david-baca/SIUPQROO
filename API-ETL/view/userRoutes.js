const express = require('express');
const extractController = require('../controller/extractionContraller');
const router = express.Router();

// router.post('/users', userController.createUser);
// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

router.post('/extraccion', extractController.getRegistersDBF);

module.exports = router;
