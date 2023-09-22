import { useCallback, useState } from 'react';

export function Counter() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const onCount = useCallback(() => {
    setCounter(prev => prev + 1);
    setCounter2(counter2 + 1);
  }, []);

  return (
    <div>
      <p>{counter}</p>
      <p>{counter2}</p>

      <button onClick={onCount}>add</button>
    </div>
  );
}
