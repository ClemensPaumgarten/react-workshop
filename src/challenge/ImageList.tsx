import { FunctionComponent, useCallback } from 'react';
import { Grid } from '@mui/material';
import { ImageCard } from './ImageCard.tsx';
import { useImageContext } from './ImageProvider.tsx';
import { Image } from './image.ts';

export const ImageList: FunctionComponent = () => {
  const {
    state: { images },
    dispatch,
  } = useImageContext();

  const onLikeClick = useCallback(
    (image: Image) => {
      dispatch({
        type: 'setLike',
        payload: {
          ...image,
          liked: !image.liked,
        },
      });
    },
    [dispatch],
  );

  const onDetailsClick = useCallback(
    (image: Image) => {
      dispatch({
        type: 'setDetail',
        payload: image,
      });
    },
    [dispatch],
  );

  return (
    <Grid container spacing={3}>
      {images.map(image => (
        <Grid md={4} key={image.id} item>
          <ImageCard
            onDetailsClick={onDetailsClick}
            onImageLikeClick={onLikeClick}
            image={image}
          />
        </Grid>
      ))}
    </Grid>
  );
};
