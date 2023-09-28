import { MainPage } from './challenge/pages/MainPage.tsx';
import { ImageContextProvider } from './challenge/context/ImageProvider.tsx';
import { useEffect, useState } from 'react';
import { getImages } from './challenge/api/api.ts';
import { Image } from './challenge/models/image.ts';

import './App.css';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      const [images, error] = await getImages();

      if (!error) {
        setImages(images);
      }
    };

    fetchImages();
  }, []);

  return (
    <ImageContextProvider images={images}>
      <MainPage />
    </ImageContextProvider>
  );
}

export default App;
