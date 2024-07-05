'use client';

import React from 'react';
import { bg_style } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import * as Yup from 'yup';
import FormikController from '@/app/component/formControl';
import { Form, Formik } from 'formik';
import { categoriesService } from '@/app/services/categories.service';
import { voidFc } from '@/app/utils/types';
import CategoryTable from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  addNewCategoryData,
  setCategoryData,
  updateCategoryData,
} from '@/redux/company/settingSlices/categories/category.slice';
import { withAuth } from '@/app/hoc/withAuth';

export interface DataType {
  categoryId: string;
  companyName: string;
  _id: string;
  action: string;
}

export type CategoryInitTypes = {
  name: string;
  categoryId: string;
};
const validationSchema = Yup.object({
  name: Yup.string().required('Category Name is required!'),
  categoryId: Yup.string().required('DIV is required!'),
});

const AddCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryData } = useSelector(
    (state: RootState) => state.companySetupCategory
  );

  const initialValues: CategoryInitTypes = {
    name: categoryData?.name || '',
    categoryId: categoryData?.categoryId || ''
  };

  const submitHandler = async (
    values: CategoryInitTypes,
    { resetForm }: { resetForm: voidFc }
  ) => {
    if (categoryData) {
      const { statusCode, data } = await categoriesService.httpUpdateCategory(
        categoryData._id!,
        values
      );
      if (statusCode === 200) {
        console.log(data);
        dispatch(updateCategoryData(data));
        dispatch(setCategoryData(null));
        resetForm();
      }
    } else {
      const { statusCode, data } =
        await categoriesService.httpAddNewCategory(values);
      if (statusCode === 201) {
        dispatch(addNewCategoryData(data));
        resetForm();
      }
    }
  };

  return (
    <>
      <div className={`${bg_style} p-5 w-full`}>
        <TertiaryHeading title="Category" className="text-graphiteGray" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors }) => {
            console.log({ errors });
            return (
              <Form
                name="basic"
                onSubmit={handleSubmit}
                autoComplete="off"
                className="mt-2"
              >
                <div className=" grid grid-cols-2 gap-2">
                  <FormikController
                    control="input"
                    label="Div"
                    type="text"
                    name="categoryId"
                    placeholder="Enter DIV"
                  />
                  <FormikController
                    control="input"
                    label="Catgory Name"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="flex justify-end mt-5 gap-3">
                  <CustomButton
                    type="submit"
                    text={categoryData ? 'Update Category' : 'Add Category'}
                    className="!w-auto "
                    iconwidth={20}
                    iconheight={20}
                  />
                  {categoryData && (
                    <CustomButton
                      type="button"
                      text="Cancel"
                      onClick={() => dispatch(setCategoryData(null))}
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
      <CategoryTable />
    </>
  );
};

export default withAuth(AddCategory);
