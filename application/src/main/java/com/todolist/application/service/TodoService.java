package com.todolist.application.service;

import com.todolist.application.exception.InvalidTodoException;
import com.todolist.application.exception.TodoNotFoundException;
import com.todolist.application.model.Todo;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {

    private List<Todo> todos = new ArrayList<>();
    private AtomicLong idCounter = new AtomicLong(0);

    // Get all Todos
    public List<Todo> getAllTodos() {
        return todos;
    }

    // Get a Todo by ID
    public Optional<Todo> getTodoById(Long id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst();
    }

    // Create a new Todo
    public Todo createTodo(Todo todo) {
        if (todo.getTitle() == null || todo.getTitle().isEmpty()) {
            throw new InvalidTodoException("Title cannot be empty");
        }
        todo.setId(idCounter.incrementAndGet());
        todos.add(todo);
        return todo;
    }

    // Update an existing Todo
    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));

        if (todoDetails.getTitle() == null || todoDetails.getTitle().isEmpty()) {
            throw new InvalidTodoException("Title cannot be empty");
        }

        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.getCompleted());
        return todo;
    }

    // Delete a Todo by ID
    public void deleteTodoById(Long id) {
        boolean removed = todos.removeIf(todo -> todo.getId().equals(id));
        if (!removed) {
            throw new TodoNotFoundException(id);
        }
    }
}