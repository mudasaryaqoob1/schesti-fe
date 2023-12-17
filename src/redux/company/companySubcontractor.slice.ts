import { createSlice } from '@reduxjs/toolkit';
import initialCompanyClientState from './companyClient.initialState';
import { fetchCompanySubcontractors, deleteSubcontractor } from './company.thunk';

export const companySubcontractorSlice = createSlice({
    name: 'clients',
    initialState: initialCompanyClientState,
    reducers: {
        logout: () => {
            return initialCompanyClientState;
        },
    },
    extraReducers: (builder) => {

        // fetch all subcontracts

        builder.addCase(fetchCompanySubcontractors.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCompanySubcontractors.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data.clients;
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchCompanySubcontractors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // delete subcontractor

        builder.addCase(deleteSubcontractor.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteSubcontractor.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.data = state.data.filter(
                (item: any) => item?._id !== action.payload.data.client._id
            );
        });

        builder.addCase(deleteSubcontractor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    },
});

export const { logout } = companySubcontractorSlice.actions;
export default companySubcontractorSlice.reducer;
