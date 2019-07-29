const addTodo = (request, database) => {
	const { todo, index } = request;
	const newPostRef = database.ref('/todos/').push();
	return newPostRef.set(todo);
}


const deleteTodo = (request) => {
	console.log('deleteTodo', request);
}


module.exports = {
	addTodo,
	deleteTodo,
}