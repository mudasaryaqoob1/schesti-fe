import { createSlice } from '@reduxjs/toolkit';
import initialPricingPlanState from './pricingPlan.initialState';
import { fetchPricingPlan } from './pricingPlan.thunk';

export const pricingPlanSlice = createSlice({
  name: 'pricingPlan',
  initialState: initialPricingPlanState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPricingPlan.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPricingPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(fetchPricingPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default pricingPlanSlice.reducer;
