export function List() {
  const names = ['Peter', 'Jeff', 'Tom'];

  return (
    <div>
      {names.map(name => (
        <ListItem key={name} name={name} />
      ))}
    </div>
  );
}

function ListItem(props: { name: string }) {
  return (
    <div>
      <p></p>
      <p>{props.name}</p>
    </div>
  );
}
