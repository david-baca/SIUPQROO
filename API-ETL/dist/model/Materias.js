const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Materias = sequelize.define('Materia', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
  },
  codigo: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  Cant_alum_rep: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  Cant_alum_ap: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'Materias',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = Materias;
