import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/app/services/user.service';
import { ICompanyDetailInterface } from '@/app/interfaces/addCompanyDetail.interface';
import { INewUserInterface } from '@/app/interfaces/newUser';

export const updateCompanyDetail = createAsyncThunk(
  'user/companyDetail',
  async (credentials: ICompanyDetailInterface, thunkAPI) => {
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

export const addNewUser = createAsyncThunk(
  'user/newUser',
  async (credentials: INewUserInterface, thunkAPI) => {
    try {
      const response = await userService.httpAddNewUser(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);

export const fetchCompanyUsers = createAsyncThunk(
  'user/companyUser',
  async (companyId: string, { rejectWithValue }) => {
    try {
      //@ts-ignore
      const response = await userService.httpGetCompanyUsers(companyId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the Joined Request'
      );
    }
  }
);

export const fetchCompanyDetail = createAsyncThunk(
  'user/companyDetail',
  async (companyId: string, { rejectWithValue }) => {
    try {
      //@ts-ignore
      const response = await userService.httpGetCompanyDetail(companyId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the Joined Request'
      );
    }
  }
);
