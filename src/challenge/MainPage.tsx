import {
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { ImageList } from './ImageList.tsx';
import { getImages } from './api.ts';
import { Image } from './image.ts';
import { Searchbar } from './Searchbar.tsx';
import { defaultState, reducer } from './reducer.ts';

export const MainPage: FunctionComponent = () => {
  const [{ images, imageDetail, showLikes }, dispatch] = useReducer(
    reducer,
    defaultState,
  );

  const [searchInput, setSearchInput] = useState('');

  const filteredImages = useMemo(() => {
    if (searchInput.length) {
      return images.filter(image =>
        image.author
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()),
      );
    } else {
      return [];
    }
  }, [images, searchInput]);

  /**
   * Rather use useMemo here because you never modify the favourites itself.
   */
  const favourites = useMemo(() => {
    return (searchInput ? filteredImages : images).filter(image => image.liked);
  }, [images, filteredImages, searchInput]);

  const toggleShowLikes = useCallback(() => {
    dispatch({
      type: showLikes ? 'hideLikes' : 'showLikes',
    });
  }, [showLikes]);

  const onSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchInput(value);
    },
    [setSearchInput],
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

  const onFavouritesClick = useCallback(
    (image: Image) => {
      dispatch({
        type: image.liked ? 'unsetLike' : 'setLike',
        payload: image,
      });
    },
    [dispatch],
  );

  const onDetailsCloseClick = useCallback(() => {
    dispatch({
      type: 'setDetail',
      payload: null,
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      const [images, error] = await getImages();

      if (!error) {
        dispatch({
          type: 'setImages',
          payload: images,
        });
      }
    };

    fetchImages();
  }, []);

  return (
    <FlexContainerFullHeight>
      <Box
        sx={{
          width: '100%',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          backgroundColor: 'divider',
        }}
      >
        <Container>
          <Searchbar
            searchInput={searchInput}
            onSearchInputChange={onSearchInputChange}
            showLikes={showLikes}
            toggleShowLikes={toggleShowLikes}
          />
        </Container>
      </Box>

      <Container
        sx={{
          width: '100%',
          padding: '2rem',
        }}
      >
        <ImageList
          toggleLike={onFavouritesClick}
          onDetailsClick={onDetailsClick}
          images={
            showLikes
              ? favourites
              : searchInput.length
              ? filteredImages
              : images
          }
        />
      </Container>

      <Drawer onClose={onDetailsCloseClick} anchor="right" open={!!imageDetail}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            height: '100%',
          }}
        >
          <Stack spacing={2}>
            <img
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
              }}
              src={imageDetail?.download_url}
            />

            <Typography color="text.secondary">
              {imageDetail?.author}
            </Typography>
          </Stack>

          <Box
            sx={{
              alignSelf: 'bottom',
              marginTop: 'auto',
              bottom: 0,
              width: '100%',
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              p: 1,
            }}
          >
            <Button onClick={onDetailsCloseClick}>Schließen</Button>
          </Box>
        </Paper>
      </Drawer>
    </FlexContainerFullHeight>
  );
};

/**
 *
 * Here an example of wrapping a component for re-using UI-components
 */

const FlexContainerFullHeight: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <Box
    sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {children}
  </Box>
);
