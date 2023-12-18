import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const estimateRequest = (state: RootState) => state.estimateRequests;

export const selectEstimateRequestsLoading = createSelector(
  [estimateRequest],
  (estimateRequest) => estimateRequest.loading
);

export const selectEstimateRequests = createSelector(
  [estimateRequest],
  (estimateRequest) => estimateRequest.data
);
