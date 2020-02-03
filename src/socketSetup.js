const socketServer = require("socket.io");
const addRequestListeners = require('./actionListeners');
const addDatabaseListeners = require('./databaseListeners');
const execSync = require('child_process').execSync;

const gitCommit = execSync('git rev-parse HEAD').toString();
console.log(gitCommit);

const socketSetup = (server, database) => {
    const io = socketServer(server);
    io.on('connection', (socket) => {
        addDatabaseListeners(socket, database, gitCommit);
        socket.on("request", addRequestListeners(database));
        console.log('socket io has now been connected');
    })
}

module.exports = socketSetup;