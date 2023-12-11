import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogInInterface } from '@/app/interfaces/login.interface';
import { ISignUpInterface } from '@/app/interfaces/signup.interface';
import { authService } from '@/app/services/auth.service';
import { ICompanyDetailInterface } from '@/app/interfaces/addCompanyDetail.interface';
import { IForgotPasswordInterface } from '@/app/interfaces/forgotPassword.interface';
import { IResetPasswordInterface } from '@/app/interfaces/resetPassword.interface';

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

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: ISignUpInterface, thunkAPI) => {
    try {
      const response = await authService.signupHandler(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);

export const addCompanyDetail = createAsyncThunk(
  'auth/companyDetail',
  async (credentials: ICompanyDetailInterface, thunkAPI) => {
    try {
      const response = await authService.addCompanyDetailHandle(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);

export const forgotPasswordHandler = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials: IForgotPasswordInterface, thunkAPI) => {
    try {
      const response = await authService.httpForgotPassword(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);
export const resetPasswordHandler = createAsyncThunk(
  'auth/resetPassword',
  async (credentials: IResetPasswordInterface, thunkAPI) => {
    try {
      const response = await authService.httpResetPasswordHandler(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);
