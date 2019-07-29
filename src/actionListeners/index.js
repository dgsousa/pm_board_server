const todoActionListeners = require('./todoActionListeners');

const actionListenersMap = {
	...todoActionListeners,
}


const addRequestListeners = (database) => (request) => {
	const { type } = request;
	return actionListenersMap[type](request, database);
}

module.exports = addRequestListeners;