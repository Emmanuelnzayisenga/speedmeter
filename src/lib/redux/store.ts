import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import authFlowReducer from './authFlowSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authFlow: authFlowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;