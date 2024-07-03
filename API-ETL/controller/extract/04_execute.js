const procesarMaterias = require('./05_maters');
const procesarCarreras = require('./06_careers');
const procesarEstudiantes = require('./07_students');
const procesarProfesores = require('./08_teacher');

// Función principal para el proceso de ejecución
async function procesarExecute() {
    try {
        // Ejecutar cada proceso en paralelo
        await Promise.all([
            procesarMaterias(),
            procesarCarreras(),
            procesarEstudiantes(),
            procesarProfesores()
        ]);

        console.log('Todos los procesos completados.');
    } catch (error) {
        console.error('Error en el proceso principal:', error);
    }
}

module.exports = procesarExecute; 