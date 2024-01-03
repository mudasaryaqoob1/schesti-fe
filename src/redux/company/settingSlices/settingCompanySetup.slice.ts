import { createSlice } from '@reduxjs/toolkit';
import { initialCompanySetupState } from './setting.initialState';
import { deleteCompanySetup, fetchCompanySetups } from './setting.thunk';
import { ISettingTarget } from '@/app/interfaces/companyInterfaces/setting.interface';

export const compnaySetup = createSlice({
    name: 'setting/companySetup',
    initialState: initialCompanySetupState,
    reducers: {
        addSettingTargetData: (state, { payload }) => {
            state.data.push(payload);
        },
        updateSettingTargetData: (state, { payload }) => {
            state.data = state.data.map((targetData: ISettingTarget) => {
                if (targetData._id === payload._id) {
                    return payload;
                } else {
                    return targetData;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompanySetups.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCompanySetups.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data;
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchCompanySetups.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteCompanySetup.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteCompanySetup.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.data = state.data.filter(
                (item: any) => item?._id !== action.payload.data._id
            );
        });

        builder.addCase(deleteCompanySetup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { addSettingTargetData, updateSettingTargetData } =
    compnaySetup.actions;

export default compnaySetup.reducer;
