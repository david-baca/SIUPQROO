const sequelize = require('../config/database');
const Grupos = require('./Grupos');
const Materias = require('./Materias');
const Alumnos = require('./Alumnos');
const Periodos = require('./Periodo');
const Carreras = require('./Carreras');
const Profesores = require('./Profesores');
const ListCalif = require('./ListCalif');
const ListAsing = require('./ListAsing');
const Directores = require('./Directores');
const Administradores = require('./Administradores');
const SecretariosAcademicos = require('./SecretariosAcademicos');
const Usuarios = require('./Usuarios');

// Definir las asociaciones

// Profesores -> ListAsing
Profesores.hasMany(ListAsing, {
  foreignKey: 'fk_profesores',
  sourceKey: 'pk',
  as: 'ListAsing'
});

ListAsing.belongsTo(Profesores, {
  foreignKey: 'fk_profesores',
  targetKey: 'pk',
  as: 'Profesor'
});

// Grupos -> ListAsing
Grupos.hasMany(ListAsing, {
  foreignKey: 'fk_grupos',
  sourceKey: 'pk',
  as: 'ListAsing'
});

ListAsing.belongsTo(Grupos, {
  foreignKey: 'fk_grupos',
  targetKey: 'pk',
  as: 'Grupo'
});

// Materias -> ListAsing
Materias.hasMany(ListAsing, {
  foreignKey: 'fk_materias',
  sourceKey: 'pk',
  as: 'ListAsing'
});

ListAsing.belongsTo(Materias, {
  foreignKey: 'fk_materias',
  targetKey: 'pk',
  as: 'Materia'
});

// Grupos -> ListCalif
Grupos.hasMany(ListCalif, {
  foreignKey: 'fk_grupos',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Grupos, {
  foreignKey: 'fk_grupos',
  targetKey: 'pk',
  as: 'Grupo'
});
//Grupos -> Carreras
Grupos.belongsTo(Carreras, {
  foreignKey: 'fk_carreras',
  targetKey: 'pk',
  as: 'Carrera'
});
Carreras.hasMany(Grupos, {
  foreignKey: 'fk_carreras',
  sourceKey: 'pk',
  as: 'Grupo'
});
// Materias -> ListCalif
Materias.hasMany(ListCalif, {
  foreignKey: 'fk_materias',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Materias, {
  foreignKey: 'fk_materias',
  targetKey: 'pk',
  as: 'Materia'
});

// Alumnos -> ListCalif
Alumnos.hasMany(ListCalif, {
  foreignKey: 'fk_alumnos',
  sourceKey: 'matricula',
  as: 'ListCalif'
});

ListCalif.belongsTo(Alumnos, {
  foreignKey: 'fk_alumnos',
  targetKey: 'matricula',
  as: 'Alumno'
});

// Periodos -> ListCalif
Periodos.hasMany(ListCalif, {
  foreignKey: 'fk_Periodos',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Periodos, {
  foreignKey: 'fk_Periodos',
  targetKey: 'pk',
  as: 'Periodo'
});

// Usuarios -> Directores
Usuarios.hasMany(Directores, {
  foreignKey: 'fk_Usuario',
  as: 'Directores'
});

Directores.belongsTo(Usuarios, {
  foreignKey: 'fk_Usuario',
  as: 'Usuario'
});

// Carreras -> Directores
Carreras.hasMany(Directores, {
  foreignKey: 'fk_Carrera',
  as: 'Directores'
});

Directores.belongsTo(Carreras, {
  foreignKey: 'fk_Carrera',
  as: 'Carrera'
});

// Usuarios -> Administradores
Usuarios.hasMany(Administradores, {
  foreignKey: 'fk_Usuario',
  as: 'Administradores'
});

Administradores.belongsTo(Usuarios, {
  foreignKey: 'fk_Usuario',
  as: 'Usuario'
});

// Usuarios -> SecretariosAcademicos
Usuarios.hasMany(SecretariosAcademicos, {
  foreignKey: 'fk_Usuario',
  as: 'SecretariosAcademicos'
});

SecretariosAcademicos.belongsTo(Usuarios, {
  foreignKey: 'fk_Usuario',
  as: 'Usuario'
});

module.exports = {
  sequelize,
  Grupos,
  Materias,
  Alumnos,
  Periodos,
  Carreras,
  Profesores,
  ListCalif,
  ListAsing,
  Usuarios,
  Directores,
  Administradores,
  SecretariosAcademicos
};
