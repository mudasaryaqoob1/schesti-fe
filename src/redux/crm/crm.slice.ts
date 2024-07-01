import { createSlice } from "@reduxjs/toolkit";
import { crmInitialState } from "./crm.initialState";
import { getCrmItemsThunk } from "./crm.thunk";

export const crmVendorSlice = createSlice({
    initialState: crmInitialState,
    name: "crm",
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCrmItemsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        });

        builder.addCase(getCrmItemsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(getCrmItemsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.error = undefined;
        });

    },

});

export default crmVendorSlice.reducer;