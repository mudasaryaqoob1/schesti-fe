import { createSlice } from '@reduxjs/toolkit';
import initialAuthState from './auth.initialState';
import { login } from './auth.thunk';

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
      console.log('pending');

      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);

      state.loading = false;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      // state.message = action.payload.message;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
