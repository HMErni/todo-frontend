import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { todoApi } from './features/todos/TodoDataAPI';
import modalReducer from './features/modals/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch);
