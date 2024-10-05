import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState(null);  // Track the todo being edited

    // Fetch all todos from the backend
    const fetchTodos = async () => {
        const response = await fetch('http://localhost:9090/api/todos');
        const data = await response.json();
        setTodos(data);
    };

    // Fetch todos when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    // Add new todo
    const addTodo = async (todo) => {
        const response = await fetch('http://localhost:9090/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (response.ok) {
            fetchTodos();  // Reload todos after adding
        }
    };

    // Update an existing todo
    const updateTodo = async (todo) => {
        const response = await fetch(`http://localhost:9090/api/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (response.ok) {
            fetchTodos();  // Reload todos after updating
            setCurrentTodo(null);  // Reset the currentTodo state
        }
    };

    // Delete a todo by ID
    const deleteTodo = async (id) => {
        const response = await fetch(`http://localhost:9090/api/todos/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchTodos();  // Reload todos after deleting
        }
    };

    // Set the current todo for editing
    const editTodo = (todo) => {
        setCurrentTodo(todo);  // Pass the todo to the form for editing
    };

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm addTodo={addTodo} updateTodo={updateTodo} currentTodo={currentTodo} />
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
