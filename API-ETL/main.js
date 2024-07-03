const validarArchivos = require('./controller/extract/00_validation');
const procesarPeriodos = require('./controller/extract/01_period');
const procesarList_Asing = require('./controller/extract/02_ListAsing');
const procesarListCalif = require('./controller/extract/03_ListCalif');
const procesarExecute = require('./controller/extract/04_execute');

// Función principal para el proceso de ejecución
async function iniciar() {
    try {
        const per_busq = [
            new Date("September 08, 2022 03:24:00"), 
        ];
        
        // Ejecutar cada proceso en paralelo
        
        await validarArchivos()
        await procesarPeriodos(per_busq)
        await procesarList_Asing()
        await procesarListCalif()
        await procesarExecute()
        
        
        console.log('Todos los procesos de extracción completados.');
    } catch (error) {
        console.error('Error en el proceso principal de extracción:', error);
    }
}

// Llamar a la función para ejecutar todos los procesos
iniciar()
    .then(() => console.log('Proceso global completado'))
    .catch(error => console.error('Error en el proceso global:', error));
