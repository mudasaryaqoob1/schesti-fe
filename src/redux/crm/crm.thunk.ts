import crmService from "@/app/services/crm/vendor.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCrmItemsThunk = createAsyncThunk(
    'crm/items',
    async (a: {}, { rejectWithValue }: any) => {
        try {
            const response = await crmService.httpGetItems();
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data.message || 'An error occurred while fetching the invoices'
            );
        }
    }
);