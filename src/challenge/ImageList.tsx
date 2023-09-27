import { FunctionComponent } from 'react';
import { Grid } from '@mui/material';
import { ImageCard } from './ImageCard.tsx';
import { Image } from './image.ts';

type ImageListProps = {
  images: Image[];
};

export const ImageList: FunctionComponent<ImageListProps> = ({ images }) => {
  return (
    <Grid container spacing={3}>
      {images.map(image => (
        <Grid md={4} key={image.id} item>
          <ImageCard image={image} />
        </Grid>
      ))}
    </Grid>
  );
};
