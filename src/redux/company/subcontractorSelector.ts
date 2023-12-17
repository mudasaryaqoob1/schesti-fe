import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const companySubcontractor = (state: RootState) => state.subcontractor;

export const selectSubcontractorsLoading = createSelector(
  [companySubcontractor],
  (subcontractor) => subcontractor.loading
);

export const selectSubcontractors = createSelector(
  [companySubcontractor],
  (subcontractor) => subcontractor.data
);
