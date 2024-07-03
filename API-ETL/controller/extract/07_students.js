const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Alumnos = require('../../model/Alumnos');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarEstudiantes() {
    try {
        // Leer archivo DBF
        const filePath = path.resolve(__dirname, '../../DBF/DALUMN.DBF');
        const registrosDBF = await leerDBF(filePath);
        // Variable de iteración
        for (let i = 0; i < registrosDBF.length; i++) {
            const registro = registrosDBF[i];
            const { ALUCTR, ALUNOM, ALUAPP, ALUAPM } = registro;
            // Buscar la alumno por su clave ALUCTR
            const alumno = await Alumnos.findByPk(ALUCTR);
            if (alumno) {
                // Si la alumno existe, actualizar su nombre
                alumno.nombre = ALUAPP+" "+ALUAPM+" "+ALUNOM; // Actualiza el nombre de el alumno
                await alumno.save(); // Guarda los cambios en la base de datos
            }
        }
        console.log('Proceso de Alumnos completado.');
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
module.exports = procesarEstudiantes;