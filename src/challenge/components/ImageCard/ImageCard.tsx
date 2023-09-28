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
import { Image } from '../../models/image.ts';
import { useImageContext } from '../../context/ImageProvider.tsx';

type ImageCardProps = {
  image: Image;
  onLikeClick: (image: Image) => void;
  onDetailsClick: (image: Image) => void;
};

export const ImageCard: FunctionComponent<ImageCardProps> = ({
  image,
  onDetailsClick,
  onLikeClick,
}) => {
  const { dispatch } = useImageContext();

  const onLikeButtonClick = useCallback(() => {
    onLikeClick(image);
  }, [image, dispatch]);

  const onDetailsButtonClick = useCallback(() => {
    onDetailsClick(image);
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
          <IconButton onClick={onLikeButtonClick} aria-label="add to favorites">
            <FavoriteIcon color={image.liked ? 'error' : 'inherit'} />
          </IconButton>

          <Button onClick={onDetailsButtonClick}>Details</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
