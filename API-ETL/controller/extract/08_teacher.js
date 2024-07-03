const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Profesores = require('../../model/Profesores');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarProfesores() {
    try {
        // Leer archivo DBF
        const filePath = path.resolve(__dirname, '../../DBF/DPERSO.DBF');
        const registrosDBF = await leerDBF(filePath);
        // Variable de iteración
        for (let i = 0; i < registrosDBF.length; i++) {
            const registro = registrosDBF[i];
            const { PERCVE, PERNOM, PERAPP, PERAPM } = registro;
            // Buscar la profesor por su clave PERCVE
            const profesor = await Profesores.findByPk(PERCVE);
            if (profesor) {
                // Si la profesor existe, actualizar su nombre
                profesor.nombre = PERAPP+" "+PERAPM+" "+PERNOM; // Actualiza el nombre de el profesor
                await profesor.save(); // Guarda los cambios en la base de datos
            }
        }
        console.log('Proceso de profesor completado.');
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
module.exports = procesarProfesores;