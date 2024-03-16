import { createSlice } from '@reduxjs/toolkit';
import initialAuthState from './auth.initialState';
import {
  login,
  updateProfileHandler,
  loginWithGoogle,
  addCompanyDetail,
  getLoggedInUserDetails,
} from './auth.thunk';

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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
