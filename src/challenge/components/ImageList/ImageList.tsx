import { FunctionComponent, useCallback } from 'react';
import { Grid } from '@mui/material';
import { ImageCard } from '../ImageCard/ImageCard.tsx';
import { Image } from '../../models/image.ts';
import { useImageContext } from '../../context/ImageProvider.tsx';

type ImageListProps = {
  images: Image[];
};

export const ImageList: FunctionComponent<ImageListProps> = ({ images }) => {
  const { dispatch } = useImageContext();

  const onLikeClick = useCallback((image: Image) => {
    dispatch({
      type: 'setLike',
      payload: { ...image, liked: !image.liked },
    });
  }, []);

  const onDetailsClick = useCallback((image: Image) => {
    dispatch({
      type: 'setDetail',
      payload: image,
    });
  }, []);

  return (
    <Grid container spacing={3}>
      {images.map(image => (
        <Grid md={4} key={image.id} item>
          <ImageCard
            onLikeClick={onLikeClick}
            onDetailsClick={onDetailsClick}
            image={image}
          />
        </Grid>
      ))}
    </Grid>
  );
};
