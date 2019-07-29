const todoDatabaseListeners = require('./todoDatabaseListeners');

const databaseListenersMap = {
	...todoDatabaseListeners,
}

const makeSocketMessageHandler = (socket) => (message) => {
	return socket.emit('message', message);
}

const addDatabaseListeners = (socket, database) => {
	const socketMessageHandler = makeSocketMessageHandler(socket);
	return Object.values(databaseListenersMap).forEach((listener) => {
		listener(socketMessageHandler, database);
	})
}

module.exports = addDatabaseListeners;