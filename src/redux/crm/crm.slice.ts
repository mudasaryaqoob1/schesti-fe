import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { crmInitialState } from "./crm.initialState";
import { getCrmItemsThunk } from "./crm.thunk";

export const crmVendorSlice = createSlice({
    initialState: crmInitialState,
    name: "crm",
    reducers: {
        removeCrmItemAction: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter((item) => item._id !== action.payload);
        }
    },
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
export const { removeCrmItemAction } = crmVendorSlice.actions;
export default crmVendorSlice.reducer;