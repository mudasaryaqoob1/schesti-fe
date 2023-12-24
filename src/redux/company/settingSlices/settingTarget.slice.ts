import { createSlice } from '@reduxjs/toolkit';
import initialSettingTargetsState from './setting.initialState';
import { deleteSettingTarget, fetchSettingTargets } from '../setting.thunk';

export const settingSlice = createSlice({
  name: 'setting/targets',
  initialState: initialSettingTargetsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettingTargets.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSettingTargets.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchSettingTargets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteSettingTarget.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteSettingTarget.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = state.data.filter(
        (item: any) => item?._id !== action.payload.data._id
      );
    });

    builder.addCase(deleteSettingTarget.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default settingSlice.reducer;
