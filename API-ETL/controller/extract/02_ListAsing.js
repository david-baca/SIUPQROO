const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Periodos = require('../../model/Periodo');
const Carreras = require('../../model/Carreras');
const Profesores = require('../../model/Profesores');
const Grupos = require('../../model/Grupos');
const ListAsing = require('../../model/ListAsing');

// Función principal para el proceso de extracción de  List_Asing
async function procesarList_Asing() {
    try {
        // Leer archivo DBF
        const registrosDGRUPO = await leerDBF('../../DBF/DGRUPO.dbf');
        // Variable de iteración
        for (let i = 0; i < registrosDGRUPO.length; i++) {
            const registro = registrosDGRUPO[i];
            // Paso 4: Extraer PDOCVE y verificar si existe en la tabla periodos
            const { PDOCVE, GPOCVE, CARCVE, PERCVE} = registro;
            const periodo = await Periodos.findByPk(PDOCVE);
            if (periodo != null) {
                // Paso 6: Extraer CARCVE y registrar la carrera
                try {// Crear una nueva carrera si no existe
                    await Carreras.findOrCreate({
                        where: { pk: CARCVE },
                        defaults: { pk: CARCVE }
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error la cargar la carrera en la BD: ${CARCVE} - ${error}\n`);
                }                
                // Paso 8: Extraer GPOCVE para registrar el grupo
                try {// Crear un nuevo grupo si no exuiste
                    await Grupos.findOrCreate({
                        where: { codigo: GPOCVE },
                        defaults: { codigo: GPOCVE, Carreras_pk: CARCVE }
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error al cargar el grupo en la BD: ${GPOCVE} - ${error}\n`);
                }  
                // Paso 11: Extraer PERCVE para registrar un profesor
                try {// Crear un nuevo profesor si no existe
                    await Profesores.findOrCreate({
                        where: { pk: PERCVE },
                        defaults: { pk: PERCVE }
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error al cargar el profesor en la BD: ${PERCVE} - ${error}\n`);
                }  
                //crear una lista de asignaciones
                try {// Crear una nueva lista de asignaciones
                    await ListAsing.create({
                        Profesores_pk: PERCVE,
                        Carreras_pk: CARCVE,
                    });
                } catch (error) {
                    fs.appendFileSync('estado.txt', `Error al cargar la lista de asignaciones - ${error}`);
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
procesarList_Asing()
     .then(() => console.log('Proceso completado'))
     .catch(error => console.error('Error en el proceso principal:', error));
