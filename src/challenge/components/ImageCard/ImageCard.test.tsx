import '@testing-library/jest-dom';
import { ImageCard } from './ImageCard.tsx';
import { render, screen } from '../../tests/CustomRender.tsx';
import { fireEvent } from '@testing-library/react';
import { Image } from '../../models/image.ts';
import { ImageContextProvider } from '../../context/ImageProvider.tsx';
import { MainPage } from '../../pages/MainPage.tsx';

const mockImage: Image = {
  id: '1',
  liked: false,
  author: 'author',
  url: 'url',
  download_url: 'download_url',
  width: 200,
  height: 200,
};

describe('ImageCard test', () => {
  it('should render the component', async () => {
    const onMockClick = jest.fn();
    await render(
      <ImageCard
        onLikeClick={jest.fn()}
        onDetailsClick={onMockClick}
        image={mockImage}
      />,
    );

    expect(screen.getByText('author')).toBeInTheDocument();

    const button = screen.getByText('Details');

    fireEvent.click(button);

    expect(onMockClick).toHaveBeenCalled();
  });

  it('should open the details', async () => {
    await render(
      <ImageContextProvider images={[mockImage]}>
        <MainPage />
      </ImageContextProvider>,
    );

    const button = screen.getByText('Details');

    fireEvent.click(button);

    expect(screen.getByTestId('drawer-author')).toBeInTheDocument();
  });
});
