import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, updateTodo, currentTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // If a todo is being edited, populate the form with its data
    useEffect(() => {
        if (currentTodo) {
            setTitle(currentTodo.title);
            setDescription(currentTodo.description);
            setCompleted(currentTodo.completed);
            setIsEditing(true);
        }
    }, [currentTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { title, description, completed };

        if (isEditing) {
            updateTodo({ ...todo, id: currentTodo.id });
        } else {
            addTodo(todo);
        }

        // Reset form after submission
        setTitle('');
        setDescription('');
        setCompleted(false);
        setIsEditing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                </label>
            </div>
            <button type="submit">{isEditing ? 'Update Todo' : 'Add Todo'}</button>
        </form>
    );
};

export default TodoForm;
