import { configureStore } from '@reduxjs/toolkit';

import objectsReducer from './objectsSlice';

export const store = configureStore({
  reducer: {
    objects: objectsReducer,
  },
});
