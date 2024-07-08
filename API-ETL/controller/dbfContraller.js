const fs = require('fs');
const multer = require("multer");
const path = require('path');

const archivosPermitidos = ['DPERIO.DBF', 'DGRUPO.DBF', 'DLISTA.DBF', 'DMATER.DBF', 'DPLANE.DBF', 'DALUMN.DBF', 'DPERSO.DBF'];

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "DBF");
    },
    filename: function(req, file, cb) {
        // Verificar si el nombre del archivo está en la lista de permitidos
        if (archivosPermitidos.includes(file.originalname)) {
            cb(null, file.originalname);
        } else {
            cb(new Error('Nombre de archivo no permitido'));
        }
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");

exports.uploadDBF = (req, res) => {
    console.log(req.body)
    if (!req.file) {
        return res.status(400).send({ estado: false,error: "No se ha proporcionado ningún archivo o el archivo no está permitido." });
    }
    res.send({ estado: true,data: "Cargado" });
};
