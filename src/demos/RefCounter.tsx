import { useCallback, useReducer } from 'react';

type State = {
  count: number;
};

type Action = {
  type: 'add' | 'subtract';
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        count: state.count + 1,
      };
    case 'subtract':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export function RefCounter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  });

  const onCount = useCallback(() => {
    dispatch({ type: 'add' });
  }, []);

  const onSubtract = useCallback(() => {
    dispatch({ type: 'subtract' });
  }, []);

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={onCount}>add</button>
      <button onClick={onSubtract}>subtract</button>
    </div>
  );
}
