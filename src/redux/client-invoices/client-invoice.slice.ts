import { createSlice } from '@reduxjs/toolkit';
import initialClientInvoiceState from './client-invoice.initialState';
import {
  fetchClientInvoices,
} from './client-invoice.thunk';

export const clientInvoiceSlice = createSlice({
  name: 'client-invoices',
  initialState: initialClientInvoiceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClientInvoices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchClientInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchClientInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export default clientInvoiceSlice.reducer;
