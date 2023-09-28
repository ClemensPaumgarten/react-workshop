import { FunctionComponent, useCallback } from 'react';
import { Button, Paper, Stack, TextField, TextFieldProps } from '@mui/material';
import { useImageContext } from './ImageProvider.tsx';

type SearchbarProps = {
  searchInput: string;
  onSearchInputChange: TextFieldProps['onChange'];
};

export const Searchbar: FunctionComponent<SearchbarProps> = ({
  searchInput,
  onSearchInputChange,
}) => {
  const {
    state: { showLikes },
    dispatch,
  } = useImageContext();

  const toggleImageList = useCallback(() => {
    dispatch({
      type: 'setShowLikes',
      payload: !showLikes,
    });
  }, [showLikes, dispatch]);

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

        <Button variant="outlined" onClick={toggleImageList}>
          {showLikes ? 'Alle anzeigen' : 'Likes anzeigen'}
        </Button>
      </Stack>
    </Paper>
  );
};
