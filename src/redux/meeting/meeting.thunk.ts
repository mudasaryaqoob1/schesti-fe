import { meetingService } from '@/app/services/meeting.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

type FetchMeetingParams = {};

export const fetchMeetings = createAsyncThunk(
  'meeting/all',
  async (a: FetchMeetingParams, { rejectWithValue }) => {
    try {
      const response = await meetingService.httpGetMeetings();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'An error occurred while fetching the invoices'
      );
    }
  }
);
