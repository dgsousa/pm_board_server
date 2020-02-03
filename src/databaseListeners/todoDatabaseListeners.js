const os = require('os');
const ip = require('ip');
const version = require('../../package.json').version;
const exec = require('child_process').exec;
const { promisify } = require('util');

const timeStarted = (new Date()).toString();


const todoAdded = async (socketMessageHandler, database) => {
	return database.ref("/todos").on("child_added", snap => {
		const key = snap.key;
		const val = snap.val();
		const lastGitCommit = await execSync('git rev-parse HEAD');
		return socketMessageHandler({
			type: 'addTodo',
			val: `
				hostname: ${os.hostname()}
				ip: ${ip.address()}
				version: ${version}
				running since: ${timeStarted}
				lastCommit: ${lastGitCommit.toString()}
			`,
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