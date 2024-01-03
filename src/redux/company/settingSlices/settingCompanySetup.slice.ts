import { createSlice } from '@reduxjs/toolkit';
import { initialCompanySetupState } from './setting.initialState';
import { deleteCategory, fetchCategories } from './companySetup.slice';

export const compnaySetup = createSlice({
    name: 'setting/companySetup',
    initialState: initialCompanySetupState,
    reducers: {
        // addSettingTargetData: (state, { payload }) => {
        //     state.data.push(payload);
        // },
        // updateSettingTargetData: (state, { payload }) => {
        //     state.data = state.data.map((targetData: ISettingTarget) => {
        //         if (targetData._id === payload._id) {
        //             return payload;
        //         } else {
        //             return targetData;
        //         }
        //     });
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data;
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.data = state.data.filter(
                (item: any) => item?._id !== action.payload.data._id
            );
        });

        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default compnaySetup.reducer;
