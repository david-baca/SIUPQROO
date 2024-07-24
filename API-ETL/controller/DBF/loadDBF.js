const multer = require("multer");
const path = require('path');
const fs = require('fs');
const archivosPermitidos = ['DPERIO.DBF', 'DGRUPO.DBF', 'DLISTA.DBF', 'DMATER.DBF', 'DCARRE.DBF', 'DALUMN.DBF', 'DPERSO.DBF'];
const dbfDirectory = path.join(__dirname, '../../DBF');

//configuracion de entrada de cargha de archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, dbfDirectory);
    },
    filename: function(req, file, cb) {
        // Verificar y crear la carpeta DBF si no existe
        if (!fs.existsSync(dbfDirectory)) {
            fs.mkdirSync(dbfDirectory, { recursive: true });
        }
        // Verificar si el nombre del archivo está en la lista de permitidos
        if (archivosPermitidos.includes(file.originalname)) {
            cb(null, file.originalname);
        } else {
            cb(new Error('Nombre de archivo no permitido'));
        }
    }
});

//controlador aplicando la configuracion de entrada
const load = multer({ storage: storage });

//exposicion de entrada unica con el ttulo myFile
exports.load = load.single("myFile");

//exposicion de aoparatdo para la carga de DBFS
exports.loadDBF = (req, res) => {
    console.log(req.body)
    if (!req.file) {
        return res.status(400).send({ estado: false,error: "No se ha proporcionado ningún archivo o el archivo no está permitido." });
    }
    res.send({ estado: true,data: "Cargado" });
};
