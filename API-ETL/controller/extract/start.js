
const procesarList_Asing = require('./02_ListAsing');
const procesarListCalif = require('./03_ListCalif');
const procesarExecute = require('./04_execute');
const writeEstado = require('./escribirEstados');

async function iniciar() {
    try {
        await writeEstado(`general.txt`, `Iniciando proceso de extraccion`);
        await procesarList_Asing()
        await writeEstado(`general.txt`, `CORECTO fase 1 de extraccion de asignaciones`);
        await procesarListCalif()
        await writeEstado(`general.txt`, `CORECTO fase 2 de extraccion de calificaciones`);
        await procesarExecute()
        await writeEstado(`general.txt`, `CORECTO fase 3 de extraccion de datos en genal`);
        await writeEstado(`general.txt`, `FIN DEL LA EXTRACCION`)

    } catch (error) {
        await writeEstado(`general.txt`, `FALLO EN LA EXTRACCION`);
    }
}

iniciar()
