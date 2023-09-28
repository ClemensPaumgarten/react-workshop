import { Image, ImageDTO } from '../models/image.ts';

const baseUrl = 'https://picsum.photos/v2';

export const getImages = async (): Promise<
  [images: Image[], error: string | null]
> => {
  const response = await fetch(`${baseUrl}/list?limit=20`);

  if (response.ok) {
    const images: ImageDTO[] = await response.json();
    return [images.map(image => ({ ...image, liked: false })), null];
  } else {
    return [[], 'Error'];
  }
};
