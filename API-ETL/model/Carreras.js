const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carreras = sequelize.define('Carrera', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  cant_grup: {
    type: DataTypes.STRING(3),
    allowNull: true,
    defaultValue: null
  },
  p_ap: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  p_rep: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'Carreras',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = Carreras;
