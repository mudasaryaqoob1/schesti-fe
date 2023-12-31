// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';
import companyClientReducer from './company/clientSlice/companyClient.slice';
import subContractorReducer from './company/subcontractorSlice/companySubcontractor.slice';
import estimateRequestSlice from './estimate/estimateRequest.slice';
import supportTicketsSlice from './supportTickets/supportTickets.slice';
import settingTargetsSlice from './company/settingSlices/settingTarget.slice';
import userSlice from './userSlice/user.slice';
import pricingPlanReducer from './pricingPlanSlice/pricingPlanSlice';

export type RootState = {
  auth: any;
  companyClient: any;
  companySubContractor: any;
  estimates: any;
  supportTickets: any;
  settingTargets: any;
  user: any;
  pricingPlan: any;
};
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'estimates' , 'supportTickets'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  companyClient: companyClientReducer,
  companySubContractor: subContractorReducer,
  estimates: estimateRequestSlice,
  supportTickets: supportTicketsSlice,
  settingTargets: settingTargetsSlice,
  user: userSlice,
  pricingPlan: pricingPlanReducer,

});
export default persistReducer(persistConfig, rootReducer);
