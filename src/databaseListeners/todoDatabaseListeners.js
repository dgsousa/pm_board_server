const todoAdded = (socketMessageHandler, database) => {
	return database.ref("/todos").on("child_added", snap => {
		const key = snap.key;
		const val = snap.val();
		return socketMessageHandler({
			type: 'addTodo',
			val,
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