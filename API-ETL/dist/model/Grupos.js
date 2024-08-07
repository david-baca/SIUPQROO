const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Grupos = sequelize.define('Grupo', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  cant_mat: {
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
    allowNull: false,
    unique: true
  },
  turno: {
    type: DataTypes.STRING(1),
    allowNull: true,
    defaultValue: null
  },
  fk_carreras: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Grupos',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = Grupos;
