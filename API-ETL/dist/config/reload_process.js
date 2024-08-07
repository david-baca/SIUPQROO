const client_io = require("socket.io-client");
require('dotenv').config();
const PORT = process.env.PORT_SOCKET || 3051;
async function reload_process () {
  const socket = client_io(`http://localhost:${PORT}`);
  socket.emit("cargando",);
  socket.on('procesado',() => {
    socket.disconnect()
  });
}
module.exports = reload_process;