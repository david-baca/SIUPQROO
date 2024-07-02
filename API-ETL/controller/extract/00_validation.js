const fs = require('fs');
// Función para validar la existencia de archivos DBF
async function validarArchivos() {
    const archivos = ['DPERIO.DBF', 'DGRUPO.dbf', 'DLISTA.dbf', 'DMATER.dbf', 
        'DPLANE.dbf', 'DALUMN.dbf', 'DPERSO.dbf'];
    for (const archivo of archivos) {
        if (!fs.existsSync(`./DBF/${archivo}`)) {
            return { estado: false, mensaje: `Falta el archivo ${archivo}. Cargue primero los archivos DBF.` };
        }
    }
    return { estado: true, mensaje: 'Todos los archivos DBF están presentes.' };
}
module.exports = {
    validarArchivos,
};
// validarArchivos()    
//     .then(resultado => console.log(resultado))
//     .catch(error => console.error('Error en el proceso principal:', error));
