'use client';

import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Form, Formik } from 'formik';

import { bg_style } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import * as Yup from 'yup';
import FormControl from '@/app/component/formControl';
import SubCategoryTable from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { AppDispatch } from '@/redux/store';
import { HttpService } from '@/app/services/base.service';
import {
  fetchCategories,
  fetchSubCategories,
} from '@/redux/company/settingSlices/companySetup.thunk';
import { ICategory } from '@/app/interfaces/companyInterfaces/setting.interface';
import {
  companySetupCategoriesData,
  companySetupSubcategoriesLoading,
} from '@/redux/company/companySelector';
import { categoriesService } from '@/app/services/categories.service';
import { voidFc } from '@/app/utils/types';
import {
  refetchSubCategories,
  setSubcategoryData,
} from '@/redux/company/settingSlices/categories/subcategory.slice';

export type SubcategoryInitValues = {
  name: string;
  price: string;
  category: string;
};
export interface DataType {
  categoryId: string;
  company: string;
  _id: string;
  action: string;
}
const validationSchema = Yup.object({
  category: Yup.string().required('Category Name is required!'),
  name: Yup.string().required('Sub Category is required!'),
  price: Yup.number().min(1, "Price must be greater than 0").required('Price is required!'),
});

const AddSubcategory = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const { subcategoryData } = useSelector(
    (state: any) => state.companySetupSubcategory
  );

  const initialValues: SubcategoryInitValues = {
    name: subcategoryData?.subCategory || '',
    price: subcategoryData?.price || '',
    category: subcategoryData?.categoryName || '',
  };
  const categoriesReduxData = useSelector(companySetupCategoriesData);
  const categoriesReduxDataLoading = useSelector(
    companySetupSubcategoriesLoading
  );

  const fetchSubcategoriesHandler = useCallback(async () => {
    await dispatch(fetchSubCategories({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchSubcategoriesHandler();
  }, []);

  const fetchCategoriesHandler = useCallback(async () => {
    await dispatch(fetchCategories({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const submitHandler = async (
    values: SubcategoryInitValues,
    { resetForm }: { resetForm: voidFc }
  ) => {
    if (subcategoryData) {
      const { statusCode, data } =
        await categoriesService.httpUpdateSubcategory(subcategoryData._id, {
          ...values,
          category: subcategoryData.categoryId,
        });
      console.log(statusCode, data);
      if (statusCode === 200) {
        dispatch(setSubcategoryData(null));
        resetForm();
        dispatch(refetchSubCategories());
      }
    } else {
      const { statusCode, data } =
        await categoriesService.httpAddNewSubcategory(values);
      console.log(statusCode, data);
      if (statusCode === 201) {
        dispatch(refetchSubCategories());
        resetForm();
      }
    }
  };

  const options = categoriesReduxData
    ? categoriesReduxData.map(({ name, _id }: ICategory) => ({
      label: name,
      value: _id,
    }))
    : [];

  return (
    <>
      <div className={`${bg_style} p-5`}>
        <TertiaryHeading title="Sub-Category" className="text-graphiteGray" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          enableReinitialize
        >
          {({ handleSubmit, values, errors }) => {
            console.log({ values, errors });
            return (
              <Form
                name="basic"
                onSubmit={handleSubmit}
                autoComplete="off"
                className="mt-2"
              >
                <div className="grid grid-cols-3 gap-2 items-center">
                  <FormControl
                    control="select"
                    label="Category Name"
                    type="text"
                    disabled={subcategoryData}
                    options={options}
                    searchable={true}
                    isLoading={categoriesReduxDataLoading}
                    name="category"
                    placeholder="Search Category Name"
                  />
                  <FormControl
                    control="input"
                    label="Sub-Category"
                    type="text"
                    name="name"
                    placeholder="Enter Sub-Category"
                  />
                  <FormControl
                    control="input"
                    label="Price"
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    prefix="$"
                  />
                </div>
                <div className="flex justify-end mt-5 gap-3">
                  <CustomButton
                    text={
                      subcategoryData ? 'Update Subcategory' : 'Add Subcategory'
                    }
                    type="submit"
                    className="!w-auto "
                    iconwidth={20}
                    iconheight={20}
                  />
                  {subcategoryData && (
                    <CustomButton
                      type="button"
                      text="Cancel"
                      onClick={() => dispatch(setSubcategoryData(null))}
                      className="!w-auto !bg-red-500 border-none"
                      iconwidth={20}
                      iconheight={20}
                    />
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <SubCategoryTable />
    </>
  );
};

export default AddSubcategory;
