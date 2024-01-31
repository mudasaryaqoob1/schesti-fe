import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogInInterface } from '@/app/interfaces/authInterfaces/login.interface';
import { ILoginWithGoogle } from '@/app/interfaces/authInterfaces/loginWithGoogle.interface';
import { ISignUpInterface } from '@/app/interfaces/authInterfaces/signup.interface';
import { authService } from '@/app/services/auth.service';
import { IRegisterCompany } from '@/app/interfaces/companyInterfaces/companyRegister.interface';
import { IForgotPasswordInterface } from '@/app/interfaces/authInterfaces/forgotPassword.interface';
import { IResetPasswordInterface } from '@/app/interfaces/authInterfaces/resetPassword.interface';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import { userService } from '@/app/services/user.service';

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

export const loginWithGoogle = createAsyncThunk(
  'auth/loginwithGoogle',
  async (credentials: ILoginWithGoogle, thunkAPI) => {
    try {
      const response =
        await authService.httpLoginWithGoogleHandler(credentials);
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
  async (credentials: IRegisterCompany, thunkAPI) => {
    try {
      const response = await authService.addCompanyDetailHandler(credentials);
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

export const updateProfileHandler = createAsyncThunk(
  'auth/updateProfile',
  async (credentials: IUpdateCompanyDetail, thunkAPI) => {
    try {
      const response = await userService.httpUpdateCompanyDetail(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);
