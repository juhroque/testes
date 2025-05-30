import { useFetchData } from '../hooks/useFetchData';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function TodoFetcher() {
  const { data, loading, error, reload } = useFetchData<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5');

  if (loading) {
    return <div data-testid="loading">Carregando tarefas...</div>;
  }

  if (error) {
    return (
      <div data-testid="error-container">
        <p data-testid="error-message">Erro: {error}</p>
        <button onClick={reload} data-testid="reload-button">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div data-testid="todos-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tarefas da API JSONPlaceholder</h2>
        <button onClick={reload} data-testid="reload-button">
          Recarregar
        </button>
      </div>
      
      {data && data.length > 0 ? (
        <ul data-testid="todos-list">
          {data.map(todo => (
            <li 
              key={todo.id} 
              data-testid={`todo-item-${todo.id}`}
              style={{ 
                marginBottom: '10px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.6 : 1
              }}
            >
              <strong>#{todo.id}</strong> - {todo.title}
              {todo.completed && <span style={{ color: 'green' }}> ✓</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p data-testid="no-todos">Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
} 