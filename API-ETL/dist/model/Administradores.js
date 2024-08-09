// models/Administradores.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuarios = require('./Usuarios');

const Administradores = sequelize.define('Administradores', {
  fk_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuarios,
      key: 'pk'
    }
  }
}, {
  tableName: 'Administradores',
  timestamps: false
});

module.exports = Administradores;
