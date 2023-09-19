import { FunctionComponent } from 'react';
import { Box, styled, Typography } from '@mui/material';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #103d70ff 10%, #0a4075ff 90%)',
  color: '#fff',
  width: '100%',
  height: '100vh',
}));

export const Welcome: FunctionComponent = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        React Workshop Part I
      </Typography>
      <Typography variant="h6">by Clemens Paumgarten</Typography>
    </Container>
  );
};
