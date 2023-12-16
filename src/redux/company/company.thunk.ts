import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/app/services/user.service';

interface FetchClientParams {
  page: number;
  limit: number;
}

export const fetchCompanyClients = createAsyncThunk(
  'company/clients',
  async ({ page, limit }: FetchClientParams, { rejectWithValue }) => {
    try {
      const response = await userService.httpGetCompanyClients(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);

export const deleteCompanyClient = createAsyncThunk(
  'company/deleteClient',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const response = await userService.httpDeleteClient(clientId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);
