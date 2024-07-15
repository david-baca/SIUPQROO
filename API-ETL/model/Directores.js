// models/Directores.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuarios = require('./Usuarios');
const Carreras = require('./Carreras');

const Directores = sequelize.define('Directores', {
  fk_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuarios,
      key: 'pk'
    }
  },
  fk_Carrera: {
    type: DataTypes.INTEGER,
    references: {
      model: Carreras,
      key: 'pk'
    }
  }
}, {
  tableName: 'Directores',
  timestamps: false
});

module.exports = Directores;
