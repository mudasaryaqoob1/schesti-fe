// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
});
export default persistReducer(persistConfig, rootReducer);
