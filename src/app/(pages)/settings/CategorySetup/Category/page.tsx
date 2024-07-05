'use client';

import React, { useState } from 'react';
import { bg_style } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
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

  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false);
  };

  return (
    <>
      {showForm ? <div className={`${bg_style} p-5 w-full`}>
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

                <div className='flex justify-between mt-5 items-center'>
                  <WhiteButton
                    text='Cancel'
                    className='!w-fit'
                    onClick={() => {
                      setShowForm(false);
                    }}
                  />
                  <div className="flex items-center gap-3">
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
                        onClick={() => {
                          dispatch(setCategoryData(null));
                          setShowForm(false);
                        }}
                        className="!w-auto !bg-red-500 border-none"
                        iconwidth={20}
                        iconheight={20}
                      />
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div> : null}

      <div className={`${bg_style} border border-solid border-silverGray mt-4 p-5`}>
        <div className='flex justify-between items-center'>
          <TertiaryHeading title={showForm ? "Added Category" : "Category"} className="text-graphiteGray" />

          {!showForm ? <div className='flex gap-2 items-center'>
            <WhiteButton
              text='Upload File'
              icon='/uploadcloud.svg'
              iconwidth={20}
              iconheight={20}
              className='!w-fit'
            />
            <CustomButton
              text='Add Category'
              className='!w-fit'
              onClick={() => {
                setShowForm(true)
              }}
            />
          </div> : null}
        </div>
        <CategoryTable
          onEdit={() => {
            setShowForm(true);
          }}

          onDelete={() => {

          }}
        />
      </div>
    </>
  );
};

export default withAuth(AddCategory);
