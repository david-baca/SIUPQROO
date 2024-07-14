const leerDBF = require('./leerDBF');
const path = require('path');
const Periodo = require('../../model/Periodo');
const Alumnos = require('../../model/Alumnos');
const Meterias = require('../../model/Materias');
const Grupos = require('../../model/Grupos');
const ListCalif = require('../../model/ListCalif');
const writeEstado = require('./escribirEstados');

// Función principal para el proceso de extracción de List_calif
async function procesarListCalif() {
    // Leer archivo DBF
    const filePath = path.resolve(__dirname, '../../DBF/DLISTA.DBF');
    const registrosDLISTA = await leerDBF(filePath);
    // Variable de iteración
    for (let i = 0; i < registrosDLISTA.length; i++) {
        const registro = registrosDLISTA[i];
        // Paso 4: Extraer PDOCVE y verificar si existe en la tabla periodos
        const { PDOCVE, ALUCTR, MATCVE, GPOCVE, LISCAL } = registro;
        const periodo = await Periodo.findByPk(PDOCVE);
        if (periodo != null) {
            // Paso 6: Extraer ALUCTR y registrar la matrícula
            try {// Crear un nuevo alumno si no existe
                await Alumnos.findOrCreate({
                    where: { matricula: ALUCTR },
                    defaults: { matricula: ALUCTR }
                });
            } catch (error) {
                writeEstado(`${PDOCVE}.txt`, `Error al cargar el alumno en la BD: ${ALUCTR} - ${error}`);
            }                
            // Paso 8: Extraer MATCVE y registrar la materia
            try {// Crear una nueva meteria si no existe
                await Meterias.findOrCreate({
                    where: { codigo: MATCVE },
                    defaults: { codigo: MATCVE }
                });
            } catch (error) {
                writeEstado(`${PDOCVE}.txt`, `Error al cargar la meteria en la BD: ${MATCVE} - ${error}`);
            }  
            // Paso 11: Extraer GPOCVE y registrar el grupo
            try {// Crear un nuevo grupo si no existe
                await Grupos.findOrCreate({
                    where: { codigo: GPOCVE },
                    defaults: { codigo: GPOCVE }
                });
            } catch (error) {
                writeEstado(`${PDOCVE}.txt`, `Error al cargar el grupo en la BD: ${GPOCVE} - ${error}`);
            }  
            //crear una lista de calificaciones
            try {// buscar el id asignado a la materia
                materia = await Meterias.findOne({where:{codigo: MATCVE}});
                grupo = await Grupos.findOne({where:{codigo: GPOCVE}});
                await ListCalif.create({
                    fk_grupos: grupo.pk,
                    fk_materias: materia.pk,
                    fk_alumnos: ALUCTR,
                    calif: LISCAL,
                    fk_Periodos: PDOCVE
                });
            } catch (error) {
                writeEstado(`${PDOCVE}.txt`, `al cargar la lista de calificacion se intenta 
                    meter como grupo fk ${grupo.pk} materia fk ${materia.pk} alumno fk 
                    ${ALUCTR} calificacion ${LISCAL} y como fk periodo  ${PDOCVE} - ${error}`);
            }  
        }
    }
    return null;
}
module.exports = procesarListCalif; 