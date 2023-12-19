import { createSlice } from '@reduxjs/toolkit';
import initialAuthState from './auth.initialState';
import { login, updateProfileHandler } from './auth.thunk';

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
      state.user = action.payload.user;
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
      state.user = action.payload.data.user;
      state.message = action.payload.message;
    });

    builder.addCase(updateProfileHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
