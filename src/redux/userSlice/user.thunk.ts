import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/app/services/user.service';
// import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';

interface FetchClientParams {
  page: number;
  limit: number;
  queryRoles?: any
}

export const updateCompanyDetail = createAsyncThunk(
  'user/companyDetail',
  async (credentials: any, thunkAPI) => {
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
  async (credentials: IUser, thunkAPI) => {
    try {
      const response = await userService.httpAddNewEmployee(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'user/companyEmployee',
  async ({ page, limit , queryRoles }: FetchClientParams, { rejectWithValue }: any) => {
    try {
      const response = await userService.httpGetUsers(page, limit , queryRoles);
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
