import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const invoicesSelector = (state: RootState) => state.invoices;

// support invoices redux data
export const selectInvoicesLoading = createSelector(
  [invoicesSelector],
  (invoices) => invoices.loading
);

export const selectInvoices = createSelector(
  [invoicesSelector],
  (invoices) => invoices.data?.invoices
);
