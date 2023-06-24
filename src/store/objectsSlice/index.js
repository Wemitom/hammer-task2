import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    addObject: (state, action) => {
      state.push({
        id: action.payload.id,
        x: action.payload.x || 0,
        y: action.payload.y || 0,
      });
    },
    removeObject: (state, action) => {
      state = state.filter((_, i) => i !== action.payload);
    },

    updateObject: (state, action) => {
      state[action.payload.i].x = action.payload.x;
      state[action.payload.i].y = action.payload.y;
    },
    clearObjects: () => initialState,
  },
});

export const { addObject, removeObject, updateObject, clearObjects } =
  objectsSlice.actions;

export default objectsSlice.reducer;
