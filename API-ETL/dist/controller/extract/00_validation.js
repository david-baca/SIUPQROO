const fs = require('fs');
// Función para validar la existencia de archivos DBF
async function validarArchivos() {
    const archivos = ['DPERIO.DBF', 'DGRUPO.DBF', 'DLISTA.DBF', 'DMATER.DBF', 
        'DCARRE.DBF', 'DALUMN.DBF', 'DPERSO.DBF'];
    for (const archivo of archivos) {
        if (!fs.existsSync(`./dist/DBF/${archivo}`)) {
            return { estado: false, mensaje: `Falta el archivo ${archivo}. Cargue primero los archivos DBF.` };
        }
    }
    return { estado: true, mensaje: 'Todos los archivos DBF están presentes.' };
} 
module.exports = validarArchivos;
