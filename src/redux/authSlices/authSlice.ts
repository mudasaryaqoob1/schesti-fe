import { createSlice } from '@reduxjs/toolkit';
import initialAuthState from './auth.initialState';
import {
  login,
  updateProfileHandler,
  loginWithGoogle,
  addCompanyDetail,
  getLoggedInUserDetails,
  addVerificationDetails,
  addSelectedTrades,
  verifyUserEmail,
} from './auth.thunk';
import { isEmpty } from 'lodash';

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: () => {
      return initialAuthState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload?.token;
      state.message = action.payload.message;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateProfileHandler.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProfileHandler.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(updateProfileHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload?.token;
      state.message = action.payload.message;
    });

    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addCompanyDetail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCompanyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload?.token;
      state.message = action.payload.message;
    });

    builder.addCase(addCompanyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // User Email Verification
    builder.addCase(verifyUserEmail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyUserEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      console.log('action.pay', action.payload);
      state.token = action.payload?.token;
      state.message = action.payload.message;
      if (!isEmpty(action.payload.data?.user)) {
        window.location.href = `/companydetails/${action.payload.data.user?._id}`;
      }
    });

    builder.addCase(verifyUserEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      window.location.href = '/login';
    });

    builder.addCase(getLoggedInUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLoggedInUserDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLoggedInUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload?.token;
      state.message = action.payload.message;
    });

    builder.addCase(addVerificationDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVerificationDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      // state.token = action.payload?.token;
      state.message = action.payload.message;
    });
    builder.addCase(addVerificationDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addSelectedTrades.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSelectedTrades.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(addSelectedTrades.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
