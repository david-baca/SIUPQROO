const express = require('express');
const userController = require('../controller/userContraller');  // Corrige el nombre del archivo controlador

const routerUser = express.Router();

routerUser.post('/create', userController.createUser);
routerUser.get('/read', userController.getAllUsers);
routerUser.get('/read/:id', userController.getUserById);
routerUser.get('/read/email/:correo', userController.getUserByCorreo);
routerUser.put('/update/:id', userController.updateUser);  // Corrige la ruta para incluir el ID del usuario
routerUser.delete('/delete/:id', userController.deleteUser);  // Corrige la ruta para incluir el ID del usuario

// Rutas para Directores
routerUser.post('/directors/create', userController.createDirect);
routerUser.get('/directors/:id', userController.getDirectByIdUser);  // Corrige el nombre del método en el controlador
routerUser.delete('/directors/delete/:id', userController.deleteDirectByIdUser);

// Rutas para Secretarios Académicos
routerUser.post('/secreacad/create', userController.createSecreAcad);
routerUser.get('/secreacad/:id', userController.getSecreAcadByIdUser);
routerUser.delete('/secreacad/delete/:id', userController.deleteSecreAcadByIdUser);

// Rutas para Administradores
routerUser.post('/admin/create', userController.createAdmin);
routerUser.get('/admin/:id', userController.getAdminByIdUser);
routerUser.delete('/admin/delete/:id', userController.deleteAdminByIdUser);

module.exports = routerUser;
