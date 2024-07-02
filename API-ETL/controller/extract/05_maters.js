const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Materias = require('../../model/Materias');

// Función principal para el proceso de extracción de grupos
async function procesarMaterias() {
    try {
        // Leer archivo DBF
        const registrosDBF = await leerDBF('../../DBF/DMATER.dbf');
        // Variable de iteración
        
        console.log(registrosDBF)
        for (let i = 0; i < registrosDBF.length; i++) {
            const registro = registrosDBF[i];
            const { MATCVE, MATNOM } = registro;
            // Buscar la materia por su clave MATCVE
            const materia = await Materias.findByPk(MATCVE);
            if (materia) {
                // Si la materia existe, actualizar su nombre
                materia.nombre = MATNOM; // Actualiza el nombre de la materia
                await materia.save(); // Guarda los cambios en la base de datos
            }
        }
        console.log('Proceso de materias completado.');
    } catch (error) {
        console.error('Error en el proceso:', error);
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

module.exports = procesarMaterias;