const app = require('express')();
const server = require('http').Server(app);

const database = require('./database');
const socketSetup = require('./socketSetup');
const port = 3000;

socketSetup(server, database);


server.listen(port, () => {
    console.log("app is listening on port 3000");
})