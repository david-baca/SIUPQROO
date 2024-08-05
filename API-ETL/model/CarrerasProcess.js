// model/CarrerasProcess.js
const { Op } = require('sequelize');
const { Carreras, ListCalif, Grupos } = require('./index'); // Asegúrate de importar desde el archivo de asociaciones

const updateCarreras = async () => {
  try {
    // Obtener todas las calificaciones con el grupo y la carrera asociada
    const calificaciones = await ListCalif.findAll({
      attributes: ['calif'],
      include: [{
        model: Grupos,
        attributes: ['fk_carreras'],
        as: 'Grupo',
        include: [{
          model: Carreras,
          as: 'Carrera'
        }]
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por carrera
    const calificacionesPorCarrera = calificaciones.reduce((acc, curr) => {
      const carreraId = curr['Grupo.fk_carreras'];
      if (!acc[carreraId]) {
        acc[carreraId] = [];
      }
      acc[carreraId].push(curr.calif);
      return acc;
    }, {});

    // Actualizar la información de las carreras
    for (const [carreraId, califs] of Object.entries(calificacionesPorCarrera)) {
      const materiasAprobadas = califs.filter(calif => calif >= 7).length;
      const materiasReprobadas = califs.filter(calif => calif < 7).length;
      const totalMaterias = califs.length;

      const p_ap = Math.round((materiasAprobadas / totalMaterias) * 100);
      const p_rep = Math.round((materiasReprobadas / totalMaterias) * 100);

      const cantGrupos = await Grupos.count({
        where: {
          fk_carreras: carreraId
        }
      });

      await Carreras.update(
        { p_ap, p_rep, cant_grup: cantGrupos },
        { where: { pk: carreraId } }  // Asegúrate de usar el nombre correcto de la columna primaria
      );
    }

    console.log('Actualización de carreras completada.');
  } catch (error) {
    console.error('Error actualizando carreras:', error);
  }
};

module.exports = updateCarreras;
