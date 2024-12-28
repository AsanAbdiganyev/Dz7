import { useEffect, useState } from "react";
import TodoItemPage from "../TodoItemPage/TodoItemPage";

const URL = "http://localhost:8000/todos";

function TodosPage() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    async function createTodo(event) {
        event.preventDefault();
        const data = { status: false, title: input };

        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            setInput("");
            getTodos();
        }
    }

    async function getTodos() {
        const response = await fetch(URL);
        const data = await response.json();
        setTodos(data);
    }

    async function deleteTodo(id) {
        const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
        if (response.status === 200) getTodos();
    }

    async function updateTodo(updatedTodo) {
        const response = await fetch(`${URL}/${updatedTodo.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: updatedTodo.title, status: updatedTodo.status }),
        });

        if (response.status === 200) getTodos();
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <h2>Todos</h2>
            <form onSubmit={createTodo}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter task"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <TodoItemPage
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                        input={input}
                    />
                ))}
            </ul>
        </>
    );
}

export default TodosPage;
