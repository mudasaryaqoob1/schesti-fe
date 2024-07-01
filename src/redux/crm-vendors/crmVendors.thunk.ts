import crmVendorService from "@/app/services/crm/vendor.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCrmVendorsThunk = createAsyncThunk(
    'crm/vendors',
    async (a: {}, { rejectWithValue }: any) => {
        try {
            const response = await crmVendorService.httpGetVendors();
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data.message || 'An error occurred while fetching the invoices'
            );
        }
    }
);