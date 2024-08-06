const client_io = require("socket.io-client");

async function reload_process () {
  const socket = client_io("http://localhost:3051");
  socket.emit("cargando",);
  socket.on('procesado',() => {
    socket.disconnect()
  });
}


module.exports = reload_process;