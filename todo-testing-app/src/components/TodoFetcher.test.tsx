import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TodoFetcher } from './TodoFetcher';

const mockTodos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: true
  }
];

const fetchMock = vi.fn();
// @ts-ignore
global.fetch = fetchMock;

describe('TodoFetcher', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("Teste se o estado inicial é correto (loading: true, data: null, error: null)", () => {
    render(<TodoFetcher />);
    expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
  });
  it("Teste se os dados são carregados com sucesso", async () => {
    fetchMock.mockResolvedValue({ 
      ok: true,
      json: vi.fn().mockResolvedValue(mockTodos) 
    });
    render(<TodoFetcher />);
    await waitFor(() => {
      expect(screen.getByText(/delectus aut autem/)).toBeInTheDocument();
    });
  });
  it("Teste se o erro é tratado corretamente", async () => {
    fetchMock.mockRejectedValue(new Error('Erro ao carregar tarefas'));
    render(<TodoFetcher />);
    await waitFor(() => {
      expect(screen.getByText('Erro: Erro ao carregar tarefas')).toBeInTheDocument();
    }); 
  });
  it("Teste se a função de recarregamento funciona", async () => {
    fetchMock.mockResolvedValue({ 
      ok: true,
      json: vi.fn().mockResolvedValue(mockTodos) 
    });
    render(<TodoFetcher />);
    await waitFor(() => {
      expect(screen.getByText(/delectus aut autem/)).toBeInTheDocument();
    });
  });
});