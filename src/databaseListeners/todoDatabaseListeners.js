const os = require('os');
const ip = require('ip');
const version = require('../../package.json').version;

const timeStarted = (new Date()).toDateString();


const todoAdded = (socketMessageHandler, database) => {
	return database.ref("/todos").on("child_added", snap => {
		const key = snap.key;
		const val = snap.val();
		return socketMessageHandler({
			type: 'addTodo',
			val: JSON.stringify({
				hostname: os.hostname(),
				ip: ip.address(),
				version,
				timeStarted,
			}),
			key,
		});
	})
}


const todoDeleted = (socketMessageHandler, database) => {
	return database.ref("/todos").on("child_removed", snap => {
		const key = snap.key;
		return socketMessageHandler({
			type: 'deleteTodo',
			key,
		});
	})
}


module.exports = {
	todoAdded,
	todoDeleted,
}