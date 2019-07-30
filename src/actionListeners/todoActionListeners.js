const addTodo = (request, database) => {
	const { todo } = request;
	const newPostRef = database.ref('/todos/').push();
	return newPostRef.set(todo);
}


const deleteTodo = (request, database) => {
	const { id } = request;
	return database.ref(`/todos/${id}`).remove();
}


module.exports = {
	addTodo,
	deleteTodo,
}