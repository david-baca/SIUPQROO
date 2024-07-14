const Alumnos = require("../../model/Alumnos");
const Carreras = require("../../model/Carreras");
const Grupos = require("../../model/Grupos");
const ListAsing = require("../../model/ListAsing");
const ListCalif = require("../../model/ListCalif");
const Materias = require("../../model/Materias");
const Periodo = require("../../model/Periodo");
const Profesores = require("../../model/Profesores");
const fs = require('fs').promises;

const path = require('path');
const patCarpDBF = path.resolve(__dirname, '../../DBF');;
const patCarpEst = path.resolve(__dirname, '../../estado');;
const sequelize = require('../../model/index').sequelize;

exports.deleteDBF = async (req, res) => {
  try {
    //activamos la Aseguradora de Datos
    const transaction = await sequelize.transaction();
    // Eliminando todas las tablas de datos en la BD
    await ListAsing.destroy({ where: {}, transaction }),
    await ListCalif.destroy({ where: {}, transaction }),
    await Grupos.destroy({ where: {}, transaction }),
    await Alumnos.destroy({ where: {}, transaction }),
    await Carreras.destroy({ where: {}, transaction }),
    await Materias.destroy({ where: {}, transaction }),
    await Periodo.destroy({ where: {}, transaction }),
    await Profesores.destroy({ where: {}, transaction })
    await transaction.commit();

    // Eliminación de la carpeta de estados
    try {
      await fs.access(patCarpEst); // Verificar si existe
      await fs.rm(patCarpEst, { recursive: true, force: true }); // Eliminar
    } catch (err) {
      // Ignorar error si la carpeta no existe
    }

    // Eliminación de la carpeta de DBFs
    try {
      await fs.access(patCarpDBF); // Verificar si existe
      await fs.rm(patCarpDBF, { recursive: true, force: true }); // Eliminar
    } catch (err) {
      res.status(500).json({ message: `Error al intentar limpiar los datos. ${err}` });
    }
    res.status(200).json({ message: 'Eliminación exitosa' });
  } catch (err) {
    res.status(500).json({ message: `Error al intentar limpiar los datos. ${err}` });
  }
}