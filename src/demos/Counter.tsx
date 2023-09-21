import { useEffect, useState } from 'react';

export function Counter() {
  const [counter, setCounter] = useState<number>(0);

  const onClick = () => {
    setCounter(prev => prev + 1);
  };

  useEffect(() => {
    console.log('after mount');

    return () => {
      console.log('before unmount');
    };
  }, []);

  useEffect(() => {
    console.log('counter change');
  }, [counter]);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={onClick}>add</button>
    </div>
  );
}
