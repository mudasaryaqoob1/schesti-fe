import { createSlice } from '@reduxjs/toolkit';
import initialInvoiceState from './invoice.initialState';
import {
    fetchSubcontractorInvoices
} from './invoice.thunk';

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: initialInvoiceState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSubcontractorInvoices.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchSubcontractorInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data;
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchSubcontractorInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default invoiceSlice.reducer;
