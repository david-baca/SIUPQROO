const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Periodo = require('../../model/Periodo');
const Alumnos = require('../../model/Alumnos');
const Meterias = require('../../model/Materias');
const Grupos = require('../../model/Grupos');
const ListCalif = require('../../model/ListCalif');

// Función principal para el proceso de extracción de List_calif
async function procesarListCalif() {
    try {
        // Leer archivo DBF
        const registrosDLISTA = await leerDBF('../../DBF/DLISTA.dbf');
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
                    fs.appendFileSync('estado.txt', `Error al cargar el alumno en la BD: ${ALUCTR} - ${error}\n`);
                }                
                // Paso 8: Extraer MATCVE y registrar la materia
                try {// Crear una nueva meteria si no existe
                    await Meterias.findOrCreate({
                        where: { codigo: MATCVE },
                        defaults: { codigo: MATCVE }
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error al cargar la meteria en la BD: ${MATCVE} - ${error}\n`);
                }  
                // Paso 11: Extraer GPOCVE y registrar el grupo
                try {// Crear un nuevo grupo si no existe
                    await Grupos.findOrCreate({
                        where: { codigo: GPOCVE },
                        defaults: { codigo: GPOCVE }
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error al cargar el grupo en la BD: ${GPOCVE} - ${error}\n`);
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
                    fs.appendFileSync('estado.txt', `Error al cargar la lista de calificacion se intenta meter como 
                        grupo fk ${grupo.pk} materia fk ${materia.pk} alumno fk ${ALUCTR} calificacion ${LISCAL}
                        y como fk periodo  ${PDOCVE} - ${error}\n`);
                }  
            }
        }
        return null;
    } catch (error) {
        console.error('Error en el proceso:', error);
        return null;
    }
}
// Función para leer archivo DBF usando dbf-reader
async function leerDBF(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const datatable = Dbf.read(buffer);
        return datatable.rows.map(row => {
            const registro = {};
            datatable.columns.forEach(col => {
                if (row[col.name] instanceof Date) {
                    const date = new Date(row[col.name]);
                    date.setMonth(date.getMonth() - 1);
                    registro[col.name] = date;
                } else {
                    registro[col.name] = row[col.name];
                }
            });
            return registro;
        });
    } catch (error) {
        throw new Error('Error al leer el archivo DBF: ' + error.message);
    }
}

// Ejecutar el proceso
procesarListCalif()
     .then(() => console.log('Proceso completado'))
     .catch(error => console.error('Error en el proceso principal:', error));
