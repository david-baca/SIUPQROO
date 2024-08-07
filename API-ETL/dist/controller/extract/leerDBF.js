const {DBFFile} = require('dbffile');
const fs = require('fs');

// Función para leer archivo DBF usando dbffile
async function leerDBF(filePath) {
    try {
        const dbf = await DBFFile.open(filePath, { encoding: 'ISO-8859-1' });
        const registros = [];
        for await (const record of dbf) {
            const registro = {};
            dbf.fields.forEach(field => {
                if (record[field.name] instanceof Date) {
                    const date = new Date(record[field.name]);
                    date.setMonth(date.getMonth());
                    registro[field.name] = date;
                } else {
                    registro[field.name] = record[field.name];
                }
            });
            registros.push(registro);
        }
        return registros;
    } catch (error) {
        throw new Error('Error al leer el archivo DBF: ' + error.message);
    }
}
module.exports = leerDBF;
