const { Op, Sequelize } = require('sequelize');
const { Grupos, ListCalif, Materias } = require('./index'); // Asegúrate de importar desde el archivo correcto

exports.updateGrupos = async () => {
  try {
    // Obtener todas las calificaciones con el grupo asociado
    const calificaciones = await ListCalif.findAll({
      attributes: ['calif'],
      include: [{
        model: Grupos,
        attributes: ['pk'], // Asegúrate de que 'pk' sea el campo correcto
        as: 'Grupo'
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por grupo
    const calificacionesPorGrupo = calificaciones.reduce((acc, curr) => {
      const grupoPk = curr['Grupo.pk']; // Cambiado a 'Grupo.pk'
      if (!acc[grupoPk]) {
        acc[grupoPk] = [];
      }
      acc[grupoPk].push(curr.calif);
      return acc;
    }, {});

    // Actualizar la información de los grupos
    for (const [grupoPk, califs] of Object.entries(calificacionesPorGrupo)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);

      // Obtener la cantidad de materias asociadas al grupo
      const materiasUnicas = await ListCalif.findAll({
        attributes: ['fk_materias'],
        where: {
          fk_grupos: grupoPk
        },
        include: [{
          model: Materias,
          attributes: ['pk'],
          as: 'Materia'
        }],
        raw: true
      });
      // Filtrar datos repetidos
      const uniqueMaterias = Array.from(new Set(materiasUnicas.map(materia => materia['Materia.pk'])));

      const cantMaterias = uniqueMaterias.length;

      await Grupos.update(
        { p_ap, p_rep, cant_mat: cantMaterias }, // Incluyendo 'cant_mat'
        { where: { pk: grupoPk } } // Cambiado a 'pk'
      );
    }

    console.log('Actualización de grupos completada.');
  } catch (error) {
    console.error('Error actualizando grupos:', error);
  }
};

exports.estadisticasGrupos = async ({ fkCarrera, fkPeriodo }) => {
  try {
    // Obtener todas las calificaciones con el grupo asociado
    const calificaciones = await ListCalif.findAll({
      where: {fk_Periodos: fkPeriodo},
      attributes: ['calif'],
      include: [{
        model: Grupos,
        where: {fk_carreras: fkCarrera},
        attributes: ['pk', 'codigo', 'turno'], // Asegúrate de que 'pk', 'codigo' y 'turno' sean los campos correctos
        as: 'Grupo'
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por grupo
    const calificacionesPorGrupo = calificaciones.reduce((acc, curr) => {
      const grupoPk = curr['Grupo.pk'];
      if (!acc[grupoPk]) {
        acc[grupoPk] = [];
      }
      acc[grupoPk].push(curr.calif);
      return acc;
    }, {});

    let response = [];
    // Calcular estadísticas y preparar la respuesta
    for (const [grupoPk, califs] of Object.entries(calificacionesPorGrupo)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);

      // Obtener la cantidad de materias asociadas al grupo
      const materiasUnicas = await ListCalif.findAll({
        attributes: ['fk_materias'],
        where: {
          fk_grupos: grupoPk
        },
        include: [{
          model: Materias,
          attributes: ['pk'],
          as: 'Materia'
        }],
        raw: true
      });

      // Filtrar datos repetidos
      const uniqueMaterias = Array.from(new Set(materiasUnicas.map(materia => materia['Materia.pk'])));

      const cantMaterias = uniqueMaterias.length;

      const grupo = await Grupos.findByPk(grupoPk)

      response.push({
        'Nombre del grupo': grupo.codigo,
        'Turno del grupo': grupo.turno,
        'Cantidad de materias en el grupo': cantMaterias,
        'Promedio de reprobación': p_rep,
        'Promedio de aprovechamiento': p_ap,
      });
    }

    return response;
  } catch (error) {
    console.error('Error obteniendo estadísticas de grupos:', error);
    return null;
  }
};