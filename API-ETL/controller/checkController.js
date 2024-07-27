const fs = require('fs');
const path = require('path');
const patCarpEst = path.resolve(__dirname, '../estado/general.txt');

exports.getEstado = async (req, res) => {
    // Verificar si el archivo existe
    if (!fs.existsSync(patCarpEst)) {
      return res.status(200).json({ mensaje: 'Sin cargar' });
    }
    // Leer el contenido del archivo
    fs.readFile(patCarpEst, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ mensaje: 'Error al leer el archivo' });
    }
    // Separar el contenido por líneas
    const lineas = data.split('\n');
    // Evaluar cada línea
    for (const linea of lineas) {
      if (linea.includes('FALLO EN LA EXTRACCION')) {
        return res.status(200).json({ mensaje: 'Fallo' });
      }
      if (linea.includes('FIN DEL LA EXTRACCION')) {
        return res.status(200).json({ mensaje: 'Terminado' });
      }
    }
    // Si no se encuentra ninguna de las frases
    return res.status(200).json({ mensaje: 'Cargando...' });
  });
};

exports.getPreload = async (req, res) => {
  //inisializamos los archivos en falso por que no sabemos su estan cargado en el servidor
  const archivos = [
    {archivo:'DPERIO.DBF', exist:false}, 
    {archivo:'DGRUPO.DBF', exist:false},
    {archivo:'DLISTA.DBF', exist:false},
    {archivo:'DMATER.DBF', exist:false}, 
    {archivo:'DCARRE.DBF', exist:false},
    {archivo:'DALUMN.DBF', exist:false},
    {archivo:'DPERSO.DBF', exist:false}];
  for (const archivo of archivos) {
      if (fs.existsSync(`./DBF/${archivo.archivo}`)) {
        archivo.exist=true
      }
  }
  return res.status(200).json(archivos);
}