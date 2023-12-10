import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogInInterface } from '@/app/interfaces/login.interface';
import { authService } from '@/app/services/auth.service';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: ILogInInterface, thunkAPI) => {
    try {
      const response = await authService.loginHandler(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);
