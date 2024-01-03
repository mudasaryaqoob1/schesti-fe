import { companySetupService } from '@/app/services/setting/companySetup';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchSettingTargetParams {
    page: number;
    limit: number;
}

// categories
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
    async (targetId: string, { rejectWithValue }) => {
        try {
            const response =
                await companySetupService.httpDeleteCategory(targetId);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data ||
                'An error occurred while fetching the feed records'
            );
        }
    }
);

// company setup thunks
export const fetchSubCategories = createAsyncThunk(
    'companySetup/subcatgories',
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

export const deleteSubCategory = createAsyncThunk(
    'companySetup/deleteSubcategory',
    async (targetId: string, { rejectWithValue }) => {
        try {
            const response =
                await companySetupService.httpDeleteCategory(targetId);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data ||
                'An error occurred while fetching the feed records'
            );
        }
    }
);

