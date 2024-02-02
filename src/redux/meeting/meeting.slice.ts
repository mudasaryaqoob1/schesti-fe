import { createSlice } from "@reduxjs/toolkit";
import { initalMeetingState } from "./meeting.intialState";
import { RootState } from "../store";

export const meetingSlice = createSlice({
    name: "schedule",
    initialState: initalMeetingState,
    reducers: {

    }
});

export const selectMeetings = (state: RootState) => state.meetings.data;
export default meetingSlice.reducer;
