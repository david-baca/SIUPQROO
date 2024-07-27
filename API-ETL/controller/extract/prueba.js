const path = require('path');
const Periodos = require('../../model/Periodo');
const leerDBF = require('./leerDBF');

// Función principal para el proceso de extracción de List_Asing
async function procesarList_Asing() {
    try {
        // Leer archivo DBF
        const filePath = path.resolve(__dirname, '../../DBF/DGRUPO.DBF');
        console.log('File path:', filePath);
        const registrosDGRUPO = await leerDBF(filePath);
        console.log('Number of records:', registrosDGRUPO.length);

        // Variable de iteración
        for (let i = 0; i < registrosDGRUPO.length; i++) {
            const registro = registrosDGRUPO[i];
            // Paso 4: Extraer PDOCVE y verificar si existe en la tabla periodos
            const { PDOCVE, GPOCVE, CARCVE, PERCVE } = registro;
            console.log('Processing record:', registro);
            const periodo = await Periodos.findByPk(PDOCVE);
            console.log('Periodo found:', periodo);

            if (periodo != null) {
                console.log('Matching record:', registro);
            } else {
                console.log('No matching period found for PDOCVE:', PDOCVE);
            }
        }

        return 'Procesamiento completado';
    } catch (error) {
        console.error('Error procesando List_Asing:', error);
        throw error; // Re-lanzar el error para manejarlo en el lugar que se llame la función
    }
}

procesarList_Asing()
    .then((result) => console.log(result))
    .catch((error) => console.error('Error en la ejecución principal:', error));
