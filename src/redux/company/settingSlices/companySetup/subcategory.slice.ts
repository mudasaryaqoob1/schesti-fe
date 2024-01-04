import { createSlice } from '@reduxjs/toolkit';
import { initialCompanySetupSubcategoryState } from '../setting.initialState';
import { deleteSubCategory, fetchSubCategories } from '../companySetup.thunk';
import { ICategory } from '@/app/interfaces/companyInterfaces/setting.interface';

export const subcategorySlice = createSlice({
    name: 'setting/companySetup/subcategory',
    initialState: initialCompanySetupSubcategoryState,
    reducers: {
        addNewSubcategoryData: (state, { payload }) => {
            state.data.push(payload);
        },
        setSubcategoryData: (state, { payload }) => {
            state.subcategoryData = payload;
        },
        refetchSubCategories: (state) => {
            state.refetch = !state.refetch;
        },
        updateSubcategoryData: (state, { payload }) => {
            state.data = state.data.map((categoryData: ICategory) => {
                if (categoryData._id === payload._id) {
                    return payload;
                } else {
                    return categoryData;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSubCategories.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.data = action.payload.data;
            state.statusCode = action.payload.statusCode;
        });

        builder.addCase(fetchSubCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteSubCategory.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.data = state.data.filter(
                (item: any) => item?._id !== action.payload.data._id
            );
        });

        builder.addCase(deleteSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export const { addNewSubcategoryData, refetchSubCategories, setSubcategoryData } = subcategorySlice.actions;
export default subcategorySlice.reducer;
