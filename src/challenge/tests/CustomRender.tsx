import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ImageContextProvider } from '../ImageProvider';
import { Image } from '../image';

const mockImage: Image = {
  id: '1',
  liked: false,
  author: 'author',
  url: 'url',
  download_url: 'download_url',
  width: 200,
  height: 200,
};

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageContextProvider images={[mockImage]}>{children}</ImageContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: WithProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
