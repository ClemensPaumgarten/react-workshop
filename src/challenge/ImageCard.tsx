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
  onToggleLike: (image: Image) => void;
  onDetailsClick: (image: Image) => void;
};

export const ImageCard: FunctionComponent<ImageCardProps> = ({
  onToggleLike,
  image,
  onDetailsClick,
}) => {
  const onClickFavourite = useCallback(() => {
    onToggleLike(image);
  }, [image, onToggleLike]);

  const onButtonClick = useCallback(() => {
    onDetailsClick(image);
  }, [image, onDetailsClick]);

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
          <IconButton onClick={onClickFavourite} aria-label="add to favorites">
            <FavoriteIcon color={image.liked ? 'error' : 'inherit'} />
          </IconButton>

          <Button onClick={onButtonClick}>Details</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
