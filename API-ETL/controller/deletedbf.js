
function deleteDBF(req, res) {
    res.status(501).json({ message: 'La eliminación de documentos DBF y BD no está implementada.' });
}

module.exports = {
    deleteDBF,
};