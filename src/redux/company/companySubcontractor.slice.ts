import { createSlice } from '@reduxjs/toolkit';
import initialCompanySubcontractorState from './companySubcontractor.initialState';
import {
  fetchCompanySubcontractors,
  deleteSubcontractor,
} from './company.thunk';

export const companySlice = createSlice({
  name: 'subcontractor',
  initialState: initialCompanySubcontractorState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanySubcontractors.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCompanySubcontractors.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data.clients;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchCompanySubcontractors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteSubcontractor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteSubcontractor.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = state.data.filter(
        (item: any) => item?._id !== action.payload.data.client._id
      );
    });

    builder.addCase(deleteSubcontractor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default companySlice.reducer;
