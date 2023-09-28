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

type ImageCardProps = {
  image: Image;
  onImageLikeClick: (image: Image) => void;
  onDetailsClick: (image: Image) => void;
};

export const ImageCard: FunctionComponent<ImageCardProps> = ({
  image,
  onImageLikeClick,
  onDetailsClick,
}) => {
  const onLikeClick = useCallback(() => {
    onImageLikeClick(image);
  }, [image]);

  const onDetailsButtonClick = useCallback(() => {
    onDetailsClick(image);
  }, [image]);

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

          <Button onClick={onDetailsButtonClick}>Details</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
