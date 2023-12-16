import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectComapny = (state: RootState) => state.company;

export const selectClientsLoading = createSelector(
  [selectComapny],
  (company) => company.loading
);

export const selectClients = createSelector(
  [selectComapny],
  (company) => company.data
);
