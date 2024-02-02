import { createSlice } from "@reduxjs/toolkit";
import { initalMeetingState } from "./meeting.intialState";
import { RootState } from "../store";
import { fetchMeetings } from "./meeting.thunk";

export const meetingSlice = createSlice({
    name: "meeting",
    initialState: initalMeetingState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchMeetings.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data?.meetings || [];
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchMeetings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    },
});

export const selectMeetings = (state: RootState) => state.meetings.data;
export default meetingSlice.reducer;
