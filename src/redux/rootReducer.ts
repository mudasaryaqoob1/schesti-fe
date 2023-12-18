// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';
import companyClientReducer from './company/clientSlice/companyClient.slice';
import subContractorReducer from './company/subcontractorSlice/companySubcontractor.slice';

export type RootState = {
  auth: any;
  companyClient: any;
  companySubContractor: any;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'company'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  companyClient: companyClientReducer,
  companySubContractor: subContractorReducer,
});
export default persistReducer(persistConfig, rootReducer);
