const leerDBF = require('./leerDBF');
const Materias = require('../../model/Materias');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarMaterias() {
    // Leer archivo DBF
    const filePath = path.resolve(__dirname, '../../DBF/DMATER.DBF');
    const registrosDBF = await leerDBF(filePath);
    // Variable de iteración
    for (let i = 0; i < registrosDBF.length; i++) {
        const registro = registrosDBF[i];
        const { MATCVE, MATNOM } = registro;
        // Buscar la materia por su clave MATCVE
        const materia = await Materias.findOne( {where: {codigo: MATCVE} } );
        if (materia) {
            // Si la materia existe, actualizar su nombre
            materia.nombre = MATNOM; // Actualiza el nombre de la materia
            await materia.save(); // Guarda los cambios en la base de datos
        }
    }
}
module.exports = procesarMaterias;