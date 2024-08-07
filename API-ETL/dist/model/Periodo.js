const { DataTypes } = require('sequelize');
const sequelize = require('../../dist/config/database');

const Periodos = sequelize.define('Periodo', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  Periodo: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'Periodos',
  timestamps: false
});

module.exports = Periodos;
