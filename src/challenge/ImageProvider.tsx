import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { Image } from './image.ts';

export type ImageState = {
  imageDetail: Image | null;
  images: Image[];
  showLikes: boolean;
};

export const defaultState: ImageState = {
  images: [],
  imageDetail: null,
  showLikes: false,
};

type Action =
  | {
      type: 'setDetail';
      payload: Image | null;
    }
  | {
      type: 'setImages';
      payload: Image[];
    }
  | {
      type: 'setLike';
      payload: Image;
    }
  | {
      type: 'setShowLike';
      payload: boolean;
    };

export const reducer = (state: ImageState, action: Action): ImageState => {
  switch (action.type) {
    case 'setImages':
      return {
        ...state,
        images: action.payload,
      };
    case 'setDetail':
      return {
        ...state,
        imageDetail: action.payload,
      };
    case 'setLike': {
      const copyState = { ...state };
      const image = { ...action.payload };
      const index = copyState.images.findIndex(i => i.id === image.id);

      if (index > -1) {
        const currentImages = [...copyState.images];

        currentImages[index] = image;

        return {
          ...copyState,
          images: currentImages,
        };
      }

      return copyState;
    }

    case 'setShowLike':
      return {
        ...state,
        showLikes: action.payload,
      };
    default:
      return state;
  }
};

type ImageContextType = {
  state: ImageState;
  dispatch: Dispatch<Action>;
};

const ImageContext = createContext<ImageContextType>({
  state: defaultState,
  dispatch: () => void 0,
});

export const ImageContextProvider: FunctionComponent<
  PropsWithChildren<{ images?: Image[] }>
> = ({ children, images }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    images: images,
  } as ImageState);

  useEffect(() => {
    dispatch({
      type: 'setImages',
      payload: images,
    });
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
