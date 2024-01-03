import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectComapnyClient = (state: RootState) => state.companyClient;
export const selectComapnySubcontractor = (state: RootState) =>
  state.companySubContractor;
export const selectCompanySetup = (state: RootState) =>
  state.companySetups;

export const selectClientsLoading = createSelector(
  [selectComapnyClient],
  (companyClient) => companyClient.loading
);

export const selectClients = createSelector(
  [selectComapnyClient],
  (companyClient) => companyClient.data
);

export const selectSubcontractLoading = createSelector(
  [selectComapnySubcontractor],
  (companySubcontract) => companySubcontract.loading
);

export const selectSubcontracters = createSelector(
  [selectComapnySubcontractor],
  (companySubcontract) => companySubcontract.data
);

// company setup data
export const selectCompanySetupLoading = createSelector(
  [selectCompanySetup],
  (companySetup) => companySetup.loading
);

export const selectCompanySetups = createSelector(
  [selectCompanySetup],
  (companySetup) => companySetup.data
);
