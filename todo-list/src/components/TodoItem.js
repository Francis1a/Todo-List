import React from 'react';

const TodoItem = ({ todo, deleteTodo, editTodo }) => {
    return (
        <li>
            <div>
                <strong>Title:</strong> {todo.title}
            </div>
            <div>
                <strong>Description:</strong> {todo.description}
            </div>
            <div>
                <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
            </div>
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
