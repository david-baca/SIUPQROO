const path = require('path');
const Periodos = require('../../model/Periodo');
const Carreras = require('../../model/Carreras');
const Profesores = require('../../model/Profesores');
const Grupos = require('../../model/Grupos');
const ListAsing = require('../../model/ListAsing');
const leerDBF = require('./leerDBF');
const writeEstado = require('./escribirEstados');


// Función principal para el proceso de extracción de  List_Asing
async function procesarList_Asing() {
    // Leer archivo DBF
    const filePath = path.resolve(__dirname, '../../DBF/DGRUPO.DBF');
    const registrosDGRUPO = await leerDBF(filePath);
    // Variable de iteración
    for (let i = 0; i < registrosDGRUPO.length; i++) {
        const registro = registrosDGRUPO[i];
        // Paso 4: Extraer PDOCVE y verificar si existe en la tabla periodos
        const { PDOCVE, GPOCVE, CARCVE, PERCVE} = registro;
        const periodo = await Periodos.findByPk(PDOCVE);
        if (periodo != null) {
            // control de error en caso de que no exista profesor para alguna carrera
            if(PERCVE!=null){
                // Paso 6: Extraer CARCVE y registrar la carrera
                try {// Crear una nueva carrera si no existe
                    await Carreras.findOrCreate({
                        where: { pk: CARCVE },
                        defaults: { pk: CARCVE }
                    });
                } catch (error) {
                    writeEstado(`${PDOCVE}.txt`, `Error la cargar la carrera en la BD: ${CARCVE} - ${error}`);
                }                
                // Paso 8: Extraer GPOCVE para registrar el grupo
                try {// Crear un nuevo grupo si no exuiste
                    await Grupos.findOrCreate({
                        where: { codigo: GPOCVE },
                        defaults: { codigo: GPOCVE, Carreras_pk: CARCVE }
                    });
                } catch (error) {
                    writeEstado(`${PDOCVE}.txt`, `Error al cargar el grupo en la BD: ${GPOCVE} - ${error}`);
                }  
                // Paso 11: Extraer PERCVE para registrar un profesor
                try {// Crear un nuevo profesor si no existe
                    await Profesores.findOrCreate({
                        where: { pk: PERCVE },
                        defaults: { pk: PERCVE }
                    });
                } catch (error) {
                    writeEstado(`${PDOCVE}.txt`, `Error al cargar el profesor en la BD: ${PERCVE} - ${error}`);
                }  
                //crear una lista de asignaciones
                try {// Crear una nueva lista de asignaciones
                    await ListAsing.create({
                        Profesores_pk: PERCVE,
                        Carreras_pk: CARCVE,
                    });
                } catch (error) {
                    writeEstado(`${PDOCVE}.txt`, `Error al cargar la lista de asignaciones - ${error}`);
                }  
                
            }else{
                writeEstado(`${PDOCVE}.txt`, `Alerta - Se encontro una carreras sin profesor asignado`);
            }
        } 
    }
    return null;
}
module.exports = procesarList_Asing;