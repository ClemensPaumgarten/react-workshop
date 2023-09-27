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
  useState,
} from 'react';
import { ImageList } from './ImageList.tsx';
import { getImages } from './api.ts';
import { Image } from './image.ts';
import { Searchbar } from './Searchbar.tsx';
import { useImageContext } from './ImageProvider.tsx';

export const MainPage: FunctionComponent = () => {
  const {
    state: { images, imageDetail },
    dispatch,
  } = useImageContext();

  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [showLikes, setShowLikes] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  /**
   * Rather use useMemo here because you never modify the favourites itself.
   */
  const favourites = useMemo(() => {
    return (searchInput ? filteredImages : images).filter(image => image.liked);
  }, [images, filteredImages, searchInput]);

  const toggleShowLikes = useCallback(() => {
    setShowLikes(prev => !prev);
  }, [setShowLikes]);

  const onSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchInput(value);
    },
    [setSearchInput],
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

  useEffect(() => {
    if (searchInput.length) {
      setFilteredImages(() => {
        return images.filter(image =>
          image.author
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase()),
        );
      });
    } else {
      setFilteredImages([]);
    }
  }, [searchInput, setFilteredImages, images]);

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
