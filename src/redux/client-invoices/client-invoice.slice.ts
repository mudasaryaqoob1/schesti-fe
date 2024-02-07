import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import initialClientInvoiceState from './client-invoice.initialState';
import { fetchClientInvoices } from './client-invoice.thunk';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';

export const clientInvoiceSlice = createSlice({
  name: 'client-invoices',
  initialState: initialClientInvoiceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClientInvoices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchClientInvoices.fulfilled, (state, action: PayloadAction<IResponseInterface<{ invoices: IClientInvoice[] }>>) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data!.invoices;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchClientInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default clientInvoiceSlice.reducer;
