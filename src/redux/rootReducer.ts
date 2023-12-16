// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';
import companyReducer from './company/companyClient.slice';

export type RootState = {
  auth: any;
  company: any;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'company'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  company: companyReducer,
});
export default persistReducer(persistConfig, rootReducer);
