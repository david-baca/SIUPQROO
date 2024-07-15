// models/SecretariosAcademicos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuarios = require('./Usuarios');

const SecretariosAcademicos = sequelize.define('SecretariosAcademicos', {
  fk_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuarios,
      key: 'pk'
    }
  }
}, {
  tableName: 'SecretariosAcademicos',
  timestamps: false
});

module.exports = SecretariosAcademicos;