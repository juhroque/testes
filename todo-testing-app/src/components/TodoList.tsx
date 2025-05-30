import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTodo.trim(),
          completed: false
        }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list" data-testid="todo-list">
      <h1>Lista de Tarefas</h1>
      
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Adicionar nova tarefa"
          data-testid="todo-input"
        />
        <button type="submit" data-testid="add-button">Adicionar</button>
      </form>

      {todos.length === 0 ? (
        <p data-testid="empty-message">Nenhuma tarefa adicionada ainda.</p>
      ) : (
        <ul data-testid="todos-list">
          {todos.map(todo => (
            <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.title}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                data-testid={`delete-button-${todo.id}`}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

