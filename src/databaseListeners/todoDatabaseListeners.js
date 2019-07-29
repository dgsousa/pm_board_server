const todoAdded = (socketMessageHandler, database) => {
	database.ref("/todos").on("child_added", snap => {
		const key = snap.key;
		const val = snap.val();
		socketMessageHandler({
			type: 'addTodo',
			val,
			key,
		});
	})
}


const todoDeleted = (database) => {
	console.log('deleteTodo');
}


module.exports = {
	todoAdded,
	todoDeleted,
}