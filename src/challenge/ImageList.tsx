import { FunctionComponent } from 'react';
import { Grid } from '@mui/material';
import { ImageCard } from './ImageCard.tsx';
import { Image } from './image.ts';

type ImageListProps = {
  images: Image[];
  toggleLike: (image: Image) => void;
  onDetailsClick: (image: Image) => void;
};

export const ImageList: FunctionComponent<ImageListProps> = ({
  images,
  toggleLike,
  onDetailsClick,
}) => {
  return (
    <Grid container spacing={3}>
      {images.map(image => (
        <Grid md={4} key={image.id} item>
          <ImageCard
            onDetailsClick={onDetailsClick}
            image={image}
            onToggleLike={toggleLike}
          />
        </Grid>
      ))}
    </Grid>
  );
};
