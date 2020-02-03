const os = require('os');
const ip = require('ip');
const version = require('../../package.json').version;
const execSync = require('child_process').execSync;

const timeStarted = (new Date()).toString();

const lastGitCommit = execSync('git rev-parse HEAD').toString();
console.log(lastGitCommit);


const todoAdded = (socketMessageHandler, database) => {
	return database.ref("/todos").on("child_added", snap => {
		const key = snap.key;
		const val = snap.val();
		return socketMessageHandler({
			type: 'addTodo',
			val: `
				hostname: ${os.hostname()}\n,
				ip: ${ip.address()}\n,
				version: ${version}\n,
				running since: ${timeStarted}\n,
				last commit: ${lastGitCommit}\n
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