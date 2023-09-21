import './App.css';
// import { MainPage } from './challenge/MainPage.tsx';
// import { Counter } from './demos/Counter.tsx';
import { todos, Todos } from './demos/Todos.tsx';
// import { RefCounter } from './demos/RefCounter.tsx';
// import { List } from './demos/List.tsx';

function App() {
  return (
    <>
      <Todos allTodos={todos} />
    </>
  );
}

export default App;
