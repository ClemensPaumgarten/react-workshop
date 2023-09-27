export type ImageDTO = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type Image = {
  liked: boolean;
} & ImageDTO;

export const createDummyImage = (index: number): Image => ({
  id: index.toString(),
  author: index.toString(),
  width: 200,
  height: 200,
  url: 'test_image',
  download_url: 'test_image',
  liked: false,
});
