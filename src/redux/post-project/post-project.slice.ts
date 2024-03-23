import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { postProjectInitialState } from "./post-project.initialSlice";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";

export const postProjectSlice = createSlice({
    initialState: postProjectInitialState,
    name: "bids-management",
    reducers: {
        setPostProjectAction: (state, action: PayloadAction<IBidManagement | null>) => {
            state.project = action.payload;
        },
        setFormStepAction: (state, action: PayloadAction<number>) => {
            state.formStep = action.payload;
        }
    },
    extraReducers() {

    },
});

export const { setFormStepAction, setPostProjectAction } = postProjectSlice.actions;

export default postProjectSlice.reducer;