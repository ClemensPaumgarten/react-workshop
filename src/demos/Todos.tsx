import { useMemo, useState } from 'react';

export const todos = [
  {
    name: 'todo1',
    open: true,
  },
  {
    name: 'todo2',
    open: false,
  },
  {
    name: 'todo3',
    open: false,
  },
];

type Todo = {
  name: string;
  open: boolean;
};

export function Todos({ allTodos }: { allTodos: Todo[] }) {
  const [showOpen, setShowOpen] = useState(false);

  const openTodos = useMemo(() => {
    console.log('filter');
    return allTodos.filter(todo => todo.open);
  }, [allTodos]);

  return (
    <div>
      {(showOpen ? openTodos : allTodos).map((todo, index) => (
        <p key={index}>{todo.name}</p>
      ))}

      <button onClick={() => setShowOpen(!showOpen)}>toggle</button>
    </div>
  );
}
