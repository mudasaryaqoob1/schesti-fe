import { createSlice } from "@reduxjs/toolkit";
import { bidManagementInitialState } from "./bid-manage.initialSlice";

export const bidManagemenetSlice = createSlice({
    initialState: bidManagementInitialState,
    name: "bids-management",
    reducers: {},
    extraReducers() {

    },
});

export default bidManagemenetSlice.reducer;