import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iconOptions, colorOption, iconstype } from '@/constants/Constants';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  undoProperty: Record<string, never>; // Adjust the type if needed
  redoProperty: Record<string, never>; // Adjust the type if needed
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
    undoProperty: {},
    redoProperty: {},
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
  },
});

export const { changePencilProperty, changeEraserProperty } =
  toolboxSlice.actions;

export default toolboxSlice.reducer;
