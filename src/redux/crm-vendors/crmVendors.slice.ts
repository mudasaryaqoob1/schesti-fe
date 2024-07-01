import { createSlice } from "@reduxjs/toolkit";
import { crmVendorInitialState } from "./crmVendors.initiialState";

export const crmVendorSlice = createSlice({
    initialState: crmVendorInitialState,
    name: "crm/vendors",
    reducers: {},
    extraReducers(builder) {

    },

});

export default crmVendorSlice.reducer;