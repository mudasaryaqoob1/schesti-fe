import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/app/services/user.service';
import { subcontractorService } from '@/app/services/subcontractor.service';
import { estimateRequestService } from '@/app/services/estimateRequest.service';

interface FetchClientParams {
  page: number;
  limit: number;
}

interface FetchSubcontractorParams {
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

export const fetchCompanySubcontractors = createAsyncThunk(
  'company/subcontractors',
  async ({ page, limit }: FetchSubcontractorParams, { rejectWithValue }) => {
    try {
      const response = await subcontractorService.httpGetAllSubcontractors(
        page,
        limit
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);

export const fetchEstimateRequests = createAsyncThunk(
  'company/getAllEstimateRequests',
  async ({ page, limit }: FetchClientParams, { rejectWithValue }) => {
    try {
      const response = await estimateRequestService.httpGetAllEstimateRequests(
        page,
        limit
      );
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
export const deleteSubcontractor = createAsyncThunk(
  'company/deleteSubcontractor',
  async (subcontractorId: string, { rejectWithValue }) => {
    try {
      const response =
        await subcontractorService.httpDeleteSubcontractor(subcontractorId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);

export const deleteEstimateRequest = createAsyncThunk(
  'company/deleteEstimateRequest',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const response =
        await estimateRequestService.httpDeleteEstimateRequest(clientId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);
