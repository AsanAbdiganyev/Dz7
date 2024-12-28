function TodoItem({ todo, updateTodo, deleteTodo, input }) {
    const handleUpdate = () => {
        if (input.trim()) {
            updateTodo({ ...todo, title: input });
        }
    };

    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.status}
                onChange={(e) => updateTodo({ ...todo, status: e.target.checked })}
            />
            <span className={todo.status ? "active" : ""}>{todo.title}</span>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
