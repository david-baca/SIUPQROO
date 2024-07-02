const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListCalif = sequelize.define('ListCalif', {
  fk_grupos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fk_materias: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fk_alumnos: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true
  },
  calif: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  fk_Periodos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'List_Calif',
  timestamps: false
});

module.exports = ListCalif;
