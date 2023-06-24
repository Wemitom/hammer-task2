import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 6, x: 60, y: 60, rotation: 0 },
  { id: 6, x: 150, y: 60, rotation: 0 },
  { id: 5, x: 60, y: 60, rotation: 90 },
  { id: 5, x: 60, y: 135, rotation: 90 },
  { id: 5, x: 60, y: 210, rotation: 90 },
  { id: 6, x: 150, y: 285, rotation: 180 },
  { id: 6, x: 270, y: 285, rotation: 180 },
  { id: 6, x: 270, y: 195, rotation: 90 },
  { id: 6, x: 270, y: 105, rotation: 90 },
  { id: 4, x: 240, y: 60, rotation: 0 },
  { id: 3, x: 270, y: 90, rotation: 90 },
  { id: 4, x: 270, y: 60, rotation: 90 },
  { id: 1, x: 180, y: 165, rotation: 0 },
  { id: 1, x: 75, y: 165, rotation: 0 },
];

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    addObject: (state, action) => {
      state.push({
        id: action.payload.id,
        x: action.payload.x || 0,
        y: action.payload.y || 0,
        rotation: action.payload.rotation || 0,
      });
    },
    removeObject: (state, action) =>
      state.filter((_, i) => i !== action.payload),
    updateObject: (state, action) => {
      state[action.payload.i].x = action.payload.x;
      state[action.payload.i].y = action.payload.y;
    },
    rotateClockwise: (state, action) => {
      state[action.payload].rotation =
        (state[action.payload].rotation + 90) % 360;
    },
    clearObjects: () => [],
  },
});

export const {
  addObject,
  removeObject,
  updateObject,
  clearObjects,
  rotateClockwise,
} = objectsSlice.actions;

export default objectsSlice.reducer;
