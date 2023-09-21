import { useCallback, useRef, useState } from 'react';

export function RefCounter() {
  const [counter, setCounter] = useState(0);
  const refCounter = useRef(0);

  const onCount = useCallback(() => {
    setCounter(prev => prev + 1);
  }, [setCounter]);

  const onRefCount = useCallback(() => {
    setCounter(prev => prev + 1);
  }, [setCounter]);

  return (
    <div>
      <p>Counter value: {counter}</p>

      <button onClick={onCount}>add</button>

      <p>Ref value: {refCounter.current}</p>

      <button onClick={onRefCount}>add ref</button>
    </div>
  );
}
