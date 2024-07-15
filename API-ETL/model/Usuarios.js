// models/Usuarios.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('Usuarios', {
  pk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuarios;