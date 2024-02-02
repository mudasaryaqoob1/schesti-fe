import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialScheduleState } from "./schedule.intialState";
import { ISchedule } from "@/app/interfaces/schedule/schedule.type";
import { RootState } from "../store";

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: initialScheduleState,
    reducers: {
        // write crud reducers 
        addSchedule: (state, action: PayloadAction<ISchedule>) => {
            state.schedules.push(action.payload)
        },
        deleteSchedule: (state, action: PayloadAction<string>) => {
            state.schedules = state.schedules.filter(schedule => schedule._id !== action.payload);
        },
        updateSchedule: (state, action: PayloadAction<ISchedule>) => {
            state.schedules = state.schedules.map(schedule => schedule._id === action.payload._id ? action.payload : schedule);
        },
        setSchedules: (state, action: PayloadAction<ISchedule[]>) => {
            state.schedules = action.payload;
        }
    }
});

export const { addSchedule, deleteSchedule, setSchedules, updateSchedule } = scheduleSlice.actions;
export const selectSchedules = (state: RootState) => state.schedule.schedules;
export default scheduleSlice.reducer;
