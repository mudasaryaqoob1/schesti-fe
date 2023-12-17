// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';
import companyReducer from './company/companyClient.slice';
import subcontractorReducer from './company/companySubcontractor.slice';
import estimateRequestSlice from './company/estimateRequest.slice';

export type RootState = {
  auth: any;
  company: any;
  subcontractor: any;
  estimateRequests: any;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'company'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  company: companyReducer,
  subcontractor: subcontractorReducer,
  estimateRequests: estimateRequestSlice,
});
export default persistReducer(persistConfig, rootReducer);
