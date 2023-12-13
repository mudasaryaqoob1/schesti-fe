import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClientInterface } from '@/app/interfaces/clien.interface';
import { clientService } from '@/app/services/client.service';

interface FetchFeedParams {
  page: number;
  limit: number;
}

export const newClient = createAsyncThunk(
  'client/new',
  async (credentials: IClientInterface, thunkAPI) => {
    try {
      const response = await clientService.httpNewClientHandler(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error during login'
      );
    }
  }
);

export const fetchedClients = createAsyncThunk(
  'client/fetchedClient',
  async ({ page, limit }: FetchFeedParams, { rejectWithValue }) => {
    try {
      const response = await clientService.httpGetAllClients(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);
