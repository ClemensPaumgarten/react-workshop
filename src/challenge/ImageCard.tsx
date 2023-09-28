import { FunctionComponent, useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Image } from './image.ts';
import { useImageContext } from './ImageProvider.tsx';

type ImageCardProps = {
  image: Image;
};

export const ImageCard: FunctionComponent<ImageCardProps> = ({ image }) => {
  const { dispatch } = useImageContext();

  const onLikeClick = useCallback(() => {
    dispatch({
      type: 'setLike',
      payload: {
        ...image,
        liked: !image.liked,
      },
    });
  }, [image, dispatch]);

  const onDetailsClick = useCallback(() => {
    dispatch({
      type: 'setDetail',
      payload: image,
    });
  }, [image, dispatch]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={image.download_url} />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {image.author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={onLikeClick} aria-label="add to favorites">
            <FavoriteIcon color={image.liked ? 'error' : 'inherit'} />
          </IconButton>

          <Button onClick={onDetailsClick}>Details</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
