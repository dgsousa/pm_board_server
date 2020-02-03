const socketServer = require("socket.io");
const addRequestListeners = require('./actionListeners');
const addDatabaseListeners = require('./databaseListeners');
const os = require('os');


const socketSetup = (server, database) => {
    const io = socketServer(server);
    io.on('connection', (socket) => {
        addDatabaseListeners(socket, database);
        socket.on("request", addRequestListeners(database));
        // socket.emit("message", JSON.stringify({
        //     'hostname': os.hostname(),
        //     'ip': ip.address()
        // }));
        console.log('socket io has now been connected');
    })
}

module.exports = socketSetup;