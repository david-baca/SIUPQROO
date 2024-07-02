const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListAsing = sequelize.define('ListAsig', {
  Profesores_pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Carreras_pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'List_Asig',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = ListAsing;
