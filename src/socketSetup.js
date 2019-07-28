const socketServer = require("socket.io");
const mapToActionListener = require('./actionListeners');


const socketSetup = (server, database) => {
    const io = socketServer(server);
    io.on('connection', (socket) => {
        socket("request", mapToActionListener);
        console.log('socket io has now been connected');
    })
}

module.exports = socketSetup;