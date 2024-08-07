const leerDBF = require('./leerDBF');
const Profesores = require('../../model/Profesores');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarProfesores() {
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
}

module.exports = procesarProfesores;