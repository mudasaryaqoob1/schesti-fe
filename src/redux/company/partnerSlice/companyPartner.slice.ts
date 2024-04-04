import { createSlice } from '@reduxjs/toolkit';
import initialState from './companyPartner.initialState';
import { fetchCompanyPartner, deleteCompanyClient } from '../company.thunk';

export const companySlice = createSlice({
  name: 'partners',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all clients
    builder.addCase(fetchCompanyPartner.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCompanyPartner.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data.clients;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchCompanyPartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteCompanyClient.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCompanyClient.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = state.data.filter(
        (item: any) => item?._id !== action.payload.data.client._id
      );
    });

    builder.addCase(deleteCompanyClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default companySlice.reducer;
