import { createSlice } from '@reduxjs/toolkit';
import initialCompanyClientState from './clientSlice/companyClient.initialState';
import { deleteEstimateRequest, fetchEstimateRequests } from './company.thunk';

export const companySlice = createSlice({
  name: 'clients',
  initialState: initialCompanyClientState,
  reducers: {
    logout: () => {
      return initialCompanyClientState;
    },
  },
  extraReducers: (builder) => {
    // fetch all estimate requests

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

export const { logout } = companySlice.actions;
export default companySlice.reducer;
