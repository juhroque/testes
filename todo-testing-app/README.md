# Exercício Engenharia de Software

# Rodar

```
cd todo-testing-app
npm run test
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── TodoList.tsx          # Componente de lista de tarefas (gerenciamento de estado local)
│   ├── TodoList.test.tsx     # Testes do componente TodoList
│   ├── TodoFetcher.tsx       # Componente que busca dados de API externa
│   └── TodoFetcher.test.tsx  # Testes do componente TodoFetcher
├── hooks/
│   └── useFetchData.ts       # Hook personalizado para requisições HTTP
└── test/
    └── setup.ts              # Configuração dos testes
```

### Ex 1: Testando um Componente de Lista de Tarefas

**Arquivo**: `TodoList.test.tsx`

#### Código do Componente (`TodoList.tsx`)

Componente React que implementa uma lista de tarefas com funcionalidades completas:

- **Estado local**: Gerenciamento de tarefas usando `useState`
- **Adicionar tarefa**: Formulário com validação e submissão
- **Marcar como concluída**: Toggle de status das tarefas
- **Remover tarefa**: Exclusão de itens da lista
- **Estado vazio**: Exibição de mensagem quando não há tarefas

#### Testes Implementados

1. **Teste de adição de tarefa**
   ```typescript
   it("Teste se uma tarefa pode ser adicionada quando o usuário digita no input e pressiona Enter")
   ```

2. **Teste de conclusão de tarefa**
   ```typescript
   it("Teste se uma tarefa pode ser marcada como concluída")
   ```

3. **Teste de remoção de tarefa**
   ```typescript
   it("Teste se uma tarefa pode ser removida")
   ```

4. **Teste de estado vazio**
   ```typescript
   it("Teste se o componente exibe uma mensagem quando não há tarefas")
   ```

#### Técnicas Utilizadas

- **User Event**: Simulação realista de interações do usuário
- **Query Methods**: Uso de `getByText`, `getByRole`, `queryByText`
- **Assertions**: Verificação de presença/ausência de elementos no DOM
- **Form Interaction**: Teste de submissão de formulários

---

### Ex 2: Testar Hook de Fetch

**Arquivo**: `TodoFetcher.test.tsx`

#### Código do Componente (`TodoFetcher.tsx`)

Componente que utiliza um hook personalizado para buscar dados de uma API externa:

- **Hook personalizado**: `useFetchData` para gerenciamento de requisições
- **Estados de loading**: Indicador visual durante carregamento
- **Tratamento de erro**: Exibição de mensagens de erro e retry
- **Renderização de dados**: Listagem de tarefas da API JSONPlaceholder

#### Hook Personalizado (`useFetchData.ts`)

Hook que encapsula a lógica de requisições HTTP:

```typescript
interface UseFetchDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}
```

#### Testes Implementados

1. **Teste de estado inicial**
   ```typescript
   it("Teste se o estado inicial é correto (loading: true, data: null, error: null)")
   ```

2. **Teste de sucesso na requisição**
   ```typescript
   it("Teste se os dados são carregados com sucesso")
   ```

3. **Teste de tratamento de erro**
   ```typescript
   it("Teste se o erro é tratado corretamente")
   ```

4. **Teste de funcionalidade de reload**
   ```typescript
   it("Teste se a função de recarregamento funciona")
   ```

#### Técnicas Utilizadas

- **Mocking Global**: Mock da função `fetch` global
- **Async Testing**: Uso de `waitFor` para aguardar mudanças assíncronas
- **Mock Functions**: `vi.fn()` para criar funções simuladas
- **Promise Mocking**: `mockResolvedValue` e `mockRejectedValue`
- **Test Data**: Criação de dados mock realistas
