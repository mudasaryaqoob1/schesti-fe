import { createSlice } from '@reduxjs/toolkit';
import initialEstimateSlice from './estimateRequest.initialState';
import {
  deleteEstimateRequest,
  fetchEstimateRequests,
} from '../company/company.thunk';

export const estimateSlice = createSlice({
  name: 'estimates',
  initialState: initialEstimateSlice,
  reducers: {
    saveEstimateDetail: (state, { payload }) => {
      state.generateEstimateDetail = {
        takeOffDetail: payload.takeOffDetail,
        scopeDetail: payload.scopeDetail,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEstimateRequests.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchEstimateRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data.clients;
      state.statusCode = action.payload.statusCode;
    });

    builder.addCase(fetchEstimateRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // delete estimate request

    builder.addCase(deleteEstimateRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteEstimateRequest.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = state.data.filter(
        (item: any) => item?._id !== action.payload.data.client._id
      );
    });

    builder.addCase(deleteEstimateRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { saveEstimateDetail } = estimateSlice.actions;
export default estimateSlice.reducer;
