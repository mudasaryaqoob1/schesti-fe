import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bidManagementInitialState } from "./bid-manage.initialSlice";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";

export const bidManagemenetSlice = createSlice({
    initialState: bidManagementInitialState,
    name: "bids-management",
    reducers: {
        addBidInDraftAction: (state, action: PayloadAction<IBidManagement>) => {
            state.drafts.push(action.payload);
        }
    },
    extraReducers() {

    },
});

export const { addBidInDraftAction } = bidManagemenetSlice.actions;

export default bidManagemenetSlice.reducer;