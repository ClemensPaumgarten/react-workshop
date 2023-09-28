import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ImageContextProvider } from '../context/ImageProvider.tsx';

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return <ImageContextProvider>{children}</ImageContextProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: WithProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
