const app = require('./app');
const http = require('http');
const { Server } = require('socket.io'); // Asegúrate de usar `Server` en lugar de `io`
const PORT = 3051;

const PORT_API = process.env.PORT || 3000;

app.listen(PORT_API, () => {
    console.log(`Servidor corriendo en el puerto ${PORT_API}`);
}); 

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*', // Cambia según tu configuración
    }
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    socket.on('cargando', () => {
        console.log('Se realizó un proceso');
        io.emit('procesado')
    });
});

server.listen(PORT, () => {
    console.log(`Servidor Socket.IO corriendo en el puerto ${PORT}`);
});