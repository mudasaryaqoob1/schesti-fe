import { settingTargetService } from '@/app/services/setting/targets.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchSettingTargetParams {
  page: number;
  limit: number;
}

export const fetchSettingTargets = createAsyncThunk(
  'setting/targets',
  async ({ page, limit }: FetchSettingTargetParams, { rejectWithValue }) => {
    try {
      const response = await settingTargetService.httpGetAllSettingTargets(
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

export const deleteSettingTarget = createAsyncThunk(
  'setting/deleteTarget',
  async (targetId: string, { rejectWithValue }) => {
    try {
      const response =
        await settingTargetService.httpDeleteSettingTarget(targetId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);
