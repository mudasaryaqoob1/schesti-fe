// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlices/authSlice';
import companyClientReducer from './company/clientSlice/companyClient.slice';
import subContractorReducer from './company/subcontractorSlice/companySubcontractor.slice';
import estimateRequestSlice from './estimate/estimateRequest.slice';
import supportTicketsSlice from './supportTickets/supportTickets.slice';
import takeoffSlice from './takeoff/takeoff.slice';
import settingTargetsSlice from './company/settingSlices/settingTarget.slice';
import userSlice from './userSlice/user.slice';
import pricingPlanReducer from './pricingPlanSlice/pricingPlanSlice';
import companySetupCategoryReducer from './company/settingSlices/categories/category.slice';
import companySetupSubcategoryReducer from './company/settingSlices/categories/subcategory.slice';
import materialsReducer from './company/settingSlices/materials.slice';
import takeoffSummariesReducer from './takeoffSummaries/takeoffSummaries.slice';
import invoiceReducer from './invoice/invoice.slice';
import clientInvoiceReducer from './client-invoices/client-invoice.slice';
// import scheduleReducer from './schedule/schedule.slice';
import meetingReducer from './meeting/meeting.slice';
import postProjectReducer from './post-project/post-project.slice';

export type RootState = {
  auth: typeof authReducer;
  companyClient: any;
  companySubContractor: typeof subContractorReducer;
  estimates: any;
  supportTickets: any;
  takeoff: any;
  settingTargets: any;
  user: any;
  pricingPlan: typeof pricingPlanReducer;
  companySetupCategory: typeof companySetupCategoryReducer;
  companySetupSubcategory: any;
  materials: any;
  takeoffSummaries: any;
  invoices: typeof invoiceReducer;
  clientInvoices: typeof clientInvoiceReducer;
  meetings: typeof meetingReducer;
  postProject: typeof postProjectReducer;
};
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'estimates', 'supportTickets', 'postProject'],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  companyClient: companyClientReducer,
  companySubContractor: subContractorReducer,
  estimates: estimateRequestSlice,
  supportTickets: supportTicketsSlice,
  takeoff: takeoffSlice,
  settingTargets: settingTargetsSlice,
  user: userSlice,
  pricingPlan: pricingPlanReducer,
  companySetupCategory: companySetupCategoryReducer,
  companySetupSubcategory: companySetupSubcategoryReducer,
  materials: materialsReducer,
  takeoffSummaries: takeoffSummariesReducer,
  invoices: invoiceReducer,
  clientInvoices: clientInvoiceReducer,
  // schedule: scheduleReducer,
  meetings: meetingReducer,
  postProject: postProjectReducer,
});
export default persistReducer(persistConfig, rootReducer);
