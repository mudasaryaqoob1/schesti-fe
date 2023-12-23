import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectComapnyClient = (state: RootState) => state.companyClient;
export const selectComapnySubcontractor = (state: RootState) =>
  state.companySubContractor;
export const selectSupportTicket = (state: RootState) =>
  state.supportTickets;

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

// support ticket redux data
export const selectSupportTicketsLoading = createSelector(
  [selectSupportTicket],
  (supportTickets) => supportTickets.loading
);

export const selectSupportTickets = createSelector(
  [selectSupportTicket],
  (supportTickets) => supportTickets.data
);