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
