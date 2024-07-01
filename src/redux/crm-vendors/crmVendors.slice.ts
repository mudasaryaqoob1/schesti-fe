import { createSlice } from "@reduxjs/toolkit";
import { crmVendorInitialState } from "./crmVendors.initiialState";
import { getCrmVendorsThunk } from "./crmVendors.thunk";

export const crmVendorSlice = createSlice({
    initialState: crmVendorInitialState,
    name: "crm/vendors",
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCrmVendorsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        });

        builder.addCase(getCrmVendorsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(getCrmVendorsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.error = undefined;
        });

    },

});

export default crmVendorSlice.reducer;