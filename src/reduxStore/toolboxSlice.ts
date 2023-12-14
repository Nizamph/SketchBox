import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iconOptions, colorOption, iconstype } from '@/constants/Constants';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { count } from 'console';
interface ChangePencilPropertyPayload {
  newColor?: string;
  newSize?: string;
}

export interface ToolboxState {
  pencilProperty: {
    color: string;
    size: string | undefined;
  };
  eraserProperty: {
    color: string;
    size: string;
  };
  totalImages: (ImageData | undefined)[];
}
const toolboxSlice = createSlice({
  name: 'toolbox',
  initialState: {
    pencilProperty: {
      color: colorOption.black,
      size: '3',
    },
    eraserProperty: {
      color: colorOption.white,
      size: '3',
    },
    totalImages: [],
  } as ToolboxState,
  reducers: {
    changePencilProperty: (
      state,
      action: PayloadAction<ChangePencilPropertyPayload>
    ) => {
      action.payload.newColor
        ? (state.pencilProperty.color = action.payload.newColor)
        : (state.pencilProperty.size = action.payload.newSize);
    },
    changeEraserProperty: (state, action: PayloadAction<string>) => {
      state.eraserProperty.size = action.payload;
    },
    setImagesWhenMouseUp: (
      state,
      action: PayloadAction<ImageData | undefined>
    ) => {
      state.totalImages = [...state.totalImages, action.payload];
    },
  },
});

export const {
  changePencilProperty,
  changeEraserProperty,
  setImagesWhenMouseUp,
} = toolboxSlice.actions;

export default toolboxSlice.reducer;
