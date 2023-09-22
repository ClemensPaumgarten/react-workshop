import { FunctionComponent } from 'react';

export function List() {
  const names = ['Peter', '', 'Tom'];

  return (
    <div>
      {names.map(name => (
        <ListItem key={name} name={name} />
      ))}
    </div>
  );
}

type ListItemProps = {
  name: string;
};

const ListItem: FunctionComponent<ListItemProps> = ({ name }) => {
  return !!name ? (
    <div>
      <p>{name}</p>
    </div>
  ) : null;
};
