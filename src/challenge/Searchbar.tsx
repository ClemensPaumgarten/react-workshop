import { FunctionComponent } from 'react';
import { Button, Paper, Stack, TextField, TextFieldProps } from '@mui/material';

type SearchbarProps = {
  searchInput: string;
  onSearchInputChange: TextFieldProps['onChange'];
  toggleShowLikes: () => void;
  showLikes: boolean;
};

export const Searchbar: FunctionComponent<SearchbarProps> = ({
  searchInput,
  onSearchInputChange,
  toggleShowLikes,
  showLikes,
}) => {
  return (
    <Paper
      sx={{
        p: '1.5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
        }}
        direction="row"
        spacing={2}
      >
        <TextField
          value={searchInput}
          onChange={onSearchInputChange}
          sx={{
            width: 400,
          }}
          label={'Nach Author suchen'}
          fullWidth
        />

        <Button variant="outlined" onClick={toggleShowLikes}>
          {showLikes ? 'Alle anzeigen' : 'Likes anzeigen'}
        </Button>
      </Stack>
    </Paper>
  );
};
