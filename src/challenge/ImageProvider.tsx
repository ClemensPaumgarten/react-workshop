import { Image } from './image.ts';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

type ImageState = {
  images: Image[];
  imageDetail: Image | null;
  onLikeImage: () => void;
};

const defaultState: ImageState = {
  images: [],
  imageDetail: null,
  onLikeImage: () => void 0,
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
      type: 'unsetLike';
      payload: Image;
    };

type ImageContextType = {
  state: ImageState;
  dispatch: Dispatch<Action>;
};

const ImageContext = createContext<ImageContextType>({
  state: defaultState,
  dispatch: () => void 0,
});

const reducer = (state: ImageState, action: Action): ImageState => {
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

        currentImages[index] = {
          ...image,
          liked: true,
        };

        return {
          ...state,
          images: currentImages,
        };
      }

      return copyState;
    }

    case 'unsetLike': {
      const copyState = { ...state };
      const image = { ...action.payload };
      const index = copyState.images.findIndex(i => i.id === image.id);

      if (index > -1) {
        const currentImages = [...copyState.images];

        currentImages[index] = {
          ...image,
          liked: false,
        };

        return {
          ...state,
          images: currentImages,
        };
      }

      return copyState;
    }
    default:
      return state;
  }
};

export const ImageContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

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
