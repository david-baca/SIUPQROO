const { Dbf } = require('dbf-reader');
const fs = require('fs');
const Carreras = require('../../model/Carreras');

// Función principal para el proceso de extracción de grupos
async function procesarCarreras(){
    try {
        // Leer archivo DBF
        const registrosDBF = await leerDBF('../../DBF/DPLANE.dbf');
        // Variable de iteración
        for (let i = 0; i < registrosDBF.length; i++) {
            const registro = registrosDBF[i];
            const { CARCVE, PLACOF } = registro;
            // Buscar la carrera por su clave CARCVE
            const carrera = await Carreras.findByPk(CARCVE);
            if (carrera) {
                // Si la carrera existe, actualizar su nombre
                carrera.nombre = PLACOF; // Actualiza el nombre de la carrera
                await carrera.save(); // Guarda los cambios en la base de datos
            }
        }
        console.log('Proceso de Carreras completado.');
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

module.exports = procesarCarreras;