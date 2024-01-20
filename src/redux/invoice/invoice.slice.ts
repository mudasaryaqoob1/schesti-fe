import { createSlice } from '@reduxjs/toolkit';
import initialInvoiceState from './invoice.initialState';
import {
    deleteContractorInvoiceRequest,
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


        builder.addCase(deleteContractorInvoiceRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteContractorInvoiceRequest.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            const invoices = (state.data?.invoices || []).filter(
                (item: any) => item?._id !== action.payload.data?.invoice._id
            )
            state.data = { invoices };
        });

        builder.addCase(deleteContractorInvoiceRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default invoiceSlice.reducer;
