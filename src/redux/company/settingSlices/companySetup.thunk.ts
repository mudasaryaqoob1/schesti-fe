import { companySetupService } from '@/app/services/categories.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchSettingTargetParams {
  page: number;
  limit: number;
}

// category thuns
export const fetchCategories = createAsyncThunk(
  'companySetup/categories',
  async ({ page, limit }: FetchSettingTargetParams, { rejectWithValue }) => {
    try {
      const response = await companySetupService.httpGetAllCategories(
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

export const deleteCategory = createAsyncThunk(
  'companySetup/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await companySetupService.httpDeleteCategory(categoryId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);

// sub category thunks
export const fetchSubCategories = createAsyncThunk(
  'companySetup/subcatgories',
  async ({ page, limit }: FetchSettingTargetParams, { rejectWithValue }) => {
    try {
      const response = await companySetupService.httpGetAllSubcategories(
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

export const deleteSubCategory = createAsyncThunk(
  'companySetup/deleteSubcategory',
  async (targetId: string, { rejectWithValue }) => {
    try {
      const response =
        await companySetupService.httpDeleteSubcategory(targetId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while fetching the feed records'
      );
    }
  }
);
