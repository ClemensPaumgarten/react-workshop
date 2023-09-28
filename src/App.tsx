import './App.css';
// import { MainPage } from './challenge/MainPage.tsx';
// import { Counter } from './demos/Counter.tsx';
// import { todos, Todos } from './demos/Todos.tsx';
// import { RefCounter } from './demos/RefCounter.tsx';
// import { List } from './demos/List.tsx';
import { MainPage } from './challenge/MainPage.tsx';
import { ImageContextProvider } from './challenge/ImageProvider.tsx';
import { useEffect, useState } from 'react';
import { getImages } from './challenge/api.ts';
import { Image } from './challenge/image.ts';

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
