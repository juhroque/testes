import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from '../components/TodoList';
import { describe, expect, it } from 'vitest';

describe('TodoList', () => {
  it("Teste se uma tarefa pode ser adicionada quando o usuário digita no input e pressiona Enter", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Adicionar nova tarefa');
    await userEvent.type(input, 'Nova tarefa');
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Nova tarefa')).toBeInTheDocument();
  });
  it("Teste se uma tarefa pode ser marcada como concluída", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Adicionar nova tarefa');
    await userEvent.type(input, 'Nova tarefa');
    await userEvent.keyboard('{Enter}');
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it("Teste se uma tarefa pode ser removida", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Adicionar nova tarefa');
    await userEvent.type(input, 'Nova tarefa');
    await userEvent.keyboard('{Enter}');
    const deleteButton = screen.getByText('Excluir');
    await userEvent.click(deleteButton);
    expect(screen.queryByText('Nova tarefa')).not.toBeInTheDocument();
  });
  it("Teste se o componente exibe uma mensagem quando não há tarefas", async () => {
    render(<TodoList />);
    expect(screen.getByText('Nenhuma tarefa adicionada ainda.')).toBeInTheDocument();
  });
});
